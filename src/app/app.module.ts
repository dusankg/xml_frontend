
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login/login.service';
import { AddCarService } from './add-car/addCar.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {Interceptor} from './interceptor/Interceptor';
import { AddCarComponent } from './add-car/add-car.component';
import { BasketComponent } from './basket/basket.component';
import { BasketService } from './basket/basket.service';
import { HomeService } from './home/home.service';
import { AdMoreInfoComponent } from './ad-more-info/ad-more-info.component';
import { AdMoreInfoService } from './ad-more-info/ad-more-info.service';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyProfileService} from './my-profile/my-profile.service';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin/admin.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { PermissionComponent } from './permission/permission.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddCarComponent,
    BasketComponent,
    AdMoreInfoComponent,
    MyProfileComponent,
    AdminComponent,
    RegisterComponent,
    PermissionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ LoginService, AddCarService, BasketService, HomeService, AdMoreInfoService, MyProfileService, AdminService, RegisterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
