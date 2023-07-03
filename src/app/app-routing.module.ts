import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { AddPassportComponent } from './add-passport/add-passport.component';
import { CreditComponent } from './credit/credit.component';

const routes: Routes = [
   {path:'',component:AuthComponent},
   {path:'auth',component:AuthComponent},
   {path:'dashboard',component:DashboardComponent},
   {path:'signup',component:SignupComponent},
   {path:'addPassport',component:AddPassportComponent},
   {path:'applyCreditCard',component:CreditComponent},
   {path:'approveRejectCreditCard/:vemail',component:CreditComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
