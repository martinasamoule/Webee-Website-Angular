import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { UserCanAccessGuard } from 'src/app/Gaurds/user-can-access.guard';

const routes: Routes =[
  {path:'', redirectTo: '/User/UserProfile', pathMatch:'full'},
  {path:'UserProfile', component: UserProfileComponent, canActivate: [UserCanAccessGuard]},
  {path: 'EditProfile', component:EditProfileComponent, canActivate: [UserCanAccessGuard]}
]

@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModModule { }
