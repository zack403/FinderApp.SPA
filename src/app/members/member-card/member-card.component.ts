import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/User';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user : User;
constructor(private spinner : NgxSpinnerService) { }

ngOnInit() {
  this.spinner.show(); 
  setTimeout(() => {
    this.spinner.hide(); 
  }, 1000);
}

}
