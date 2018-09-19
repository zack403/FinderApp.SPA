import { MemberDetailComponent } from "./components/member-detail/member-detail.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { AuthGuard } from "./guard/auth.guard";
import { appRoutes } from "./route";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { AuthService } from "./services/auth.service";
import { NavbarComponent } from "./components/Navbar/Navbar.component";
// tslint:disable-next-line:quotemark
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxGalleryModule } from 'ngx-gallery';
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";


import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "../../node_modules/@angular/forms";

import {MatCardModule} from '@angular/material/card';

import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatDialog,
  MatTabsModule,
  MatGridListModule,
  MatCheckboxModule,
  MatIconModule,
  MatSlideToggleModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { ValueComponent } from "./components/value/value.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AlertifyService } from "./services/alertify.service";
import { ListsComponent } from "./components/lists/lists.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ListsComponent,
    MessagesComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NgxGalleryModule,
    NgxSpinnerModule, 
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AlertifyService, UserService, NgxSpinnerService, AuthGuard, MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}
