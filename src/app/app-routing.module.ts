import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContentComponent } from './content/content.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "login",component: LoginComponent, title: "Login | StickyNote" },
  { path: "signUp", component: SignUpComponent, title: "SignUp | StickyNote" },
  { path: "request-password-reset", component: ResetpasswordComponent, title: "Reset Password | StickyNote" },
  { path: "change-password", component: ChangepasswordComponent, title: "Change Password | StickyNote" },
  { path: "home", canActivate: [AuthGuard], component: HomeComponent, title: "home | StickyNote" ,children:[
    {path:":id" , component:ContentComponent},
  ]},
  
  {path:"**" ,component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
