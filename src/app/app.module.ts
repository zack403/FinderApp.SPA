import { NavbarComponent } from "./components/navbar/navbar.component";
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { PreventUnsavedChanges } from './guard/prevent-unsafe-changes';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { MemberDetailComponent } from "./components/member-detail/member-detail.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { AuthGuard } from "./guard/auth.guard";
import { appRoutes } from "./route";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { AuthService } from "./services/auth.service";
// tslint:disable-next-line:quotemark
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/Buttons';
import { NgxGalleryModule } from 'ngx-gallery';
import {NgxSpinnerModule} from "ngx-spinner";


import { NgModule } from "@angular/core";
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "../../node_modules/@angular/forms";

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
  MatSlideToggleModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import {TimeAgoPipe} from 'time-ago-pipe';
import { ValueComponent } from "./components/value/value.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AlertifyService } from "./services/alertify.service";
import { ListsComponent } from "./components/lists/lists.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { UserService } from "./services/user.service";
import { FileUploadModule } from 'ng2-file-upload';
import { ListResolver } from './resolvers/list.resolver';
import { MessagesResolver } from './resolvers/message.resolver';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export function getAccessToken(): string {
  return localStorage.getItem("token");
}

export const jwtConfig = {
  tokenGetter : getAccessToken,
  whitelistedDomains : ['localhost:5000']
}


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
    MemberDetailComponent,
    MemberEditComponent,
    TimeAgoPipe,
    PhotoEditorComponent,
    MemberMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: jwtConfig
    }),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NgxGalleryModule,
    NgxSpinnerModule, 
    NgbModule.forRoot(),
    FileUploadModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AlertifyService, UserService, 
    AuthGuard, 
    MemberDetailResolver, 
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
    MatDatepickerModule,
    ListResolver,
    MessagesResolver,
    ErrorInterceptorProvider
     
],
  bootstrap: [AppComponent]
})
export class AppModule {}
