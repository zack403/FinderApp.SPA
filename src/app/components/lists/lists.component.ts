import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor(private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show(); 
    setTimeout(() => {
      this.spinner.hide(); 
    }, 1000);
  }

}
