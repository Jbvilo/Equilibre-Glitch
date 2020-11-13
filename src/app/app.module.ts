import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { NotAuthorizedContainerModule } from './not-authorized-container';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { RegisterComponent } from './pages/register/register.component';
import { RecuperationComponent } from './pages/recuperation/recuperation.component';
import { HttpClientModule } from '@angular/common/http';
import { account } from './shared/services/account.service';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { HorseService } from './shared/services/horse.service';
import { DxLoadPanelModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecuperationComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    LoginFormModule,
    NotAuthorizedContainerModule,
    AppRoutingModule,
    DxFormModule,
    DxTextBoxModule,
    DxButtonModule,
    HttpClientModule,
    DxValidatorModule,
    DxLoadPanelModule
  ],
  providers: [AuthService, ScreenService, AppInfoService,account,HorseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
