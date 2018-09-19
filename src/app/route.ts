import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { MemberDetailComponent } from "./components/member-detail/member-detail.component";
import { AuthGuard } from "./guard/auth.guard";
import { MessagesComponent } from "./components/messages/messages.component";
import { ListsComponent } from "./components/lists/lists.component";
import { HomeComponent } from "./components/home/home.component";
import { Routes } from "@angular/router";
import { MemberListComponent } from "./members/member-list/member-list.component";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent },
      { path: "members/:id", component: MemberDetailComponent },
      { path: "lists", component: ListsComponent },
      { path: "messages", component: MessagesComponent }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
