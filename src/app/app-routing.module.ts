import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddCarComponent } from './add-car/add-car.component';
import {BasketComponent} from './basket/basket.component';
import { AdMoreInfoComponent } from './ad-more-info/ad-more-info.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { PermissionComponent } from './permission/permission.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-car', component: AddCarComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'ad-more-info/:id', component: AdMoreInfoComponent},
  {path: 'my-profile', component: MyProfileComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'permission', component: PermissionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
