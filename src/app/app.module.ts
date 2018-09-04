import { AuthService } from "./services/auth.service";
import { NavbarComponent } from "./components/Navbar/Navbar.component";
// tslint:disable-next-line:quotemark
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "../../node_modules/@angular/forms";
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatDialog,
  MatTabsModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { ValueComponent } from "./components/value/value.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent
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
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "register", component: RegisterComponent },
      { path: "login", component: NavbarComponent }
    ])
  ],
  providers: [AuthService, MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}
