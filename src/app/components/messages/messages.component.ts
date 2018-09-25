import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show(); 
    setTimeout(() => {
      this.spinner.hide(); 
    }, 1000);
  }

}
