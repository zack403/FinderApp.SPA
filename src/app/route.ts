import { AuthGuard } from "./guard/auth.guard";
import { MessagesComponent } from "./components/messages/messages.component";
import { ListsComponent } from "./components/lists/lists.component";
import { HomeComponent } from "./components/home/home.component";
import { Routes } from "@angular/router";
import { MemberListComponent } from "./components/member-list/member-list.component";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "", 
    runGuardsAndResolvers : "always",
    canActivate : [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent },
      { path: "lists", component: ListsComponent },
      { path: "messages", component: MessagesComponent },
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
