import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { MyPostsComponent } from './my-posts/my-posts.component';


const routes : Routes = [
   {path: '', redirectTo:'/home',pathMatch : 'full'},
  {path: 'register', component: UserRegistrationComponent},
  {path: 'home', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'myPosts', component: MyPostsComponent}


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [UserRegistrationComponent,LoginComponent,LandingPageComponent,DashboardComponent,MyPostsComponent];

