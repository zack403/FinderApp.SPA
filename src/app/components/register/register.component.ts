import { Router } from '@angular/router';
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertifyService } from "../../services/alertify.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { User } from "src/app/models/User";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user: User;;
  @Input() valuesFromHome: any;
  @Output() cancelRegisterMode = new EventEmitter();
  registerForm : FormGroup;

  constructor(private auth: AuthService, 
    private alertservice: AlertifyService,
    private fb : FormBuilder, private router : Router) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender : ['male'],
      username : ['', Validators.required],
      knownAs : ['', Validators.required],
      dateOfBirth : [null, Validators.required],
      city: ['', Validators.required],
      country : ['', Validators.required],
      password : ['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword : ['', Validators.required]
    }, {validator : this.passwordMatchvalidator})
  }


  passwordMatchvalidator(c: FormGroup){
    return c.get('password').value === c.get("confirmPassword").value ? null : {mismatch : true};
  }


  register() {
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.auth.register(this.user).subscribe(() => {
        this.alertservice.success("Registration Successful")
        this.registerForm.reset(true);
      }, error => {
        this.alertservice.error(error);
      }, () =>{
        this.auth.login(this.user).subscribe(()=>{
          // this.router.navigate(["/members"]);
        })
      })
    }
  }

  cancel() {
    this.cancelRegisterMode.emit(false);
  }
}
