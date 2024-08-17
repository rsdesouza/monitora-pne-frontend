import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginSimpleComponent } from './login/simple/simple.component';
import { LoginImageOneComponent } from './login/image-one/image-one.component';
import { LoginImageTwoComponent } from './login/image-two/image-two.component';
import { ValidationComponent } from './login/validation/validation.component';
import { ToolTipComponent } from './login/tool-tip/tool-tip.component';
import { SweetalertComponent } from './login/sweetalert/sweetalert.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: 'simple',
        component: LoginSimpleComponent
      },
      {
        path: 'image-one',
        component: LoginImageOneComponent
      },
      {
        path: 'image-two',
        component: LoginImageTwoComponent
      },
      {
        path: 'validation',
        component: ValidationComponent
      },
      {
        path: 'tooltip',
        component: ToolTipComponent
      },
      {
        path: 'sweetalert',
        component: SweetalertComponent
      }
    ]
  },
  {
    path: 'unlock-user',
    component: UnlockUserComponent,
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
