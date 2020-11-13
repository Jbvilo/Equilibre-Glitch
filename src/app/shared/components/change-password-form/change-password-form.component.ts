import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DxButtonModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';


@Component({
  selector: 'app-change-passsword-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.scss']
})
export class ChangePasswordFormComponent implements OnInit {
  loading = false;
  formData: any = {};
  recoveryCode: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recoveryCode = params.get('recoveryCode');
    });
  }


send(){
  let mail=(<HTMLInputElement>document.getElementById("mail").firstChild.firstChild.firstChild).value
  let password=(<HTMLInputElement>document.getElementById("mdp").firstChild.firstChild.firstChild).value


  if (mail !="" && password !=""){

    if(mail.includes("@")){
    
    this.authService.changePassword(mail,password);

    }





  }
  else {
alert('Veuillez remplir tous les champs !')

  }

}



}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
   DxTextBoxModule,
   DxTextAreaModule,
   DxButtonModule
  ],
  declarations: [ ChangePasswordFormComponent ],
  exports: [ ChangePasswordFormComponent ]
})
export class ChangePasswordFormModule { }
