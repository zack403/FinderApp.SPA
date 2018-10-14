import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { MemberDetailComponent } from "./components/member-detail/member-detail.component";
import { AuthGuard } from "./guard/auth.guard";
import { MessagesComponent } from "./components/messages/messages.component";
import { ListsComponent } from "./components/lists/lists.component";
import { HomeComponent } from "./components/home/home.component";
import { Routes } from "@angular/router";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './guard/prevent-unsafe-changes';

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent, resolve: {users : MemberListResolver} },
      { path: "members/:id", component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
      { path: "member/edit", component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
      { path: "lists", component: ListsComponent, resolve: {users: ListResolver}  },
      { path: "messages", component: MessagesComponent }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
