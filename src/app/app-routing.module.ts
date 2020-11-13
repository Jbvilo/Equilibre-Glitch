import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, ChangePasswordFormComponent, ResetPasswordFormModule } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule,DxTextBoxModule,DxTextAreaModule,DxButtonModule, DxSchedulerModule, DxGalleryModule, DxPopupModule, DxListModule, DxLoadPanelModule, DxValidatorModule } from 'devextreme-angular';
import { EcurieComponent } from './pages/ecurie/ecurie.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecuperationComponent } from './pages/recuperation/recuperation.component';
import { BrowserModule } from '@angular/platform-browser';


const routes: Routes = [
  {
    path: 'pages/planning',
    component: PlanningComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/ecurie',
    component: EcurieComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: RecuperationComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: RegisterComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),DxValidatorModule, DxDataGridModule, DxFormModule,DxTextBoxModule,DxTextAreaModule,DxButtonModule,DxSchedulerModule,DxGalleryModule,DxPopupModule,DxListModule,BrowserModule,DxLoadPanelModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, TasksComponent, EcurieComponent, PlanningComponent]
})
export class AppRoutingModule { }
