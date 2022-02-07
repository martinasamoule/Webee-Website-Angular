import { IUser } from './../../Models/iuser';
import { Component, OnInit, Pipe } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UsersServService } from 'src/app/Services/users-serv.service';
import {  Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  RegisterForm: FormGroup;
  EmailsOfUsers : IUser[] =[];
  IsEmailUse :boolean = false ;

  constructor(private FormBuild: FormBuilder , private UsersServ :UsersServService
              , private Route : Router) 
  { 
    this.RegisterForm = FormBuild.group({
      fullName: ['', [Validators.required, Validators.pattern('[A-Za-z /s]{5,}')]],
      email: ['', [Validators.required , Validators.pattern('[a-zA-Z0-9]{4,}(@)[a-zA-Z0-9]{3,}(?!\s)(.com)')]], // ,this.existEmailValidator()
      phoneNumbers: FormBuild.array([this.FormBuild.control('',[Validators.required,Validators.pattern('^[01][0-9]{9}')])]),
      address: FormBuild.group({
        city: ['', [Validators.required]],
        postalCode: ['',[Validators.required]],
        street: ['',[Validators.required]]
      }),
      delieveryOption : ['',[Validators.required]],
      specificDay : [''] ,
      password: ['', [Validators.required ,this.PassContainEmailOrName(), Validators.pattern('[a-z0-9]{3,}[A-Z]{1}[a-z]{1}[@%*#$]{1}[a-z0-9]{0,}')]],
      // 
      confirmPassword: ['', [Validators.required , Validators.pattern('[a-z0-9]{3,}[A-Z]{1}[a-z]{1}[@%*#$]{1}[a-z0-9]{0,}')]]
    },{validators: this.passwordMatch});

  }

  ngOnInit(): void 
  {
    
  }
  get FullName() {
    return this.RegisterForm.get('fullName');
  }
  get Email() {
    return this.RegisterForm.get('email');
  }
  get City() {
    return this.RegisterForm.get('address')?.get('city');
  }
  get PostalCode() {
    return this.RegisterForm.get('address')?.get('postalCode');
  }
  get Street() {
    return this.RegisterForm.get('address')?.get('street');
  }
  get DelieveryOption() {
    return this.RegisterForm.get('delieveryOption');
  }
  get SpecificDay() {
    return this.RegisterForm.get('specificDay');
  }
  get PhoneNumbers() {
    return this.RegisterForm.get('phoneNumbers') as FormArray;
  }
  get Password() {
    return this.RegisterForm.get('password');
  }
  get ConfirmPassword() {
    return this.RegisterForm.get('confirmPassword') ;
  }


  CheckIsEmailUse ()
  {
    this.UsersServ.CheckIfEmailUsed(this.Email?.value).subscribe
    (
      User=>this.EmailsOfUsers=User    
    )
  }

  UpdateDelieveryOption()
  {
    if (this.DelieveryOption?.value=='SpecificDay')
    {
      this.SpecificDay?.addValidators([Validators.required]);
    }
    else
    {
      this.SpecificDay?.clearValidators();
    }
    this.SpecificDay?.updateValueAndValidity();
  }

  AddNewPhoneNumber()
  {
    this.PhoneNumbers.push(this.FormBuild.control(''));
  }

  DeleteNewPhoneNumber()
  {
    this.PhoneNumbers.controls.pop();
  }

  existEmailValidator(): AsyncValidatorFn 
   {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let emailVal: string = control.value;
      let validationError = {'existEmail': { 'value': emailVal }}
      let foundEmail:boolean ;
      console.log()
      return this.UsersServ.CheckIfEmailUsed(emailVal).pipe(map((User)=>{
        console.log('4444')
        for (let i= 0 ; i<User.length ; i++)
      {
        if( User[i].email==(emailVal))
        {
          foundEmail =true ;
        }
        else 
        {
          foundEmail= false ;
        }
      }  
      return foundEmail? validationError : null;
      }));
    }
  }

  SubmitForm()
  {
    const observer =
    {
      next: () => { 
        setTimeout(() => {
          this.Route.navigate(['/LogIn']) ;
          alert('add succ')
        }, 2000);
      },
      error: (err:Error)=>{ 
        alert('error')
      } ,
    }
    let UserInfo :IUser = this.RegisterForm.value as IUser ;
    console.log(UserInfo)
    // this.Route.navigate(['/LogIn']) ;
    // alert('add succ')
    this.UsersServ.AddUser(UserInfo).subscribe(observer) ;

  }

  PassContainEmailOrName(): ValidatorFn {
    return (frmGroup: AbstractControl): ValidationErrors | null => {
      let PassValue : string = frmGroup.get('password')?.value;
      let validationError = {'PassContainEmailOrName': { 'value': PassValue}}
      let Contain :boolean = false  ;
      let Email : string = frmGroup.get('email')?.value;
      let Name : string = frmGroup.get('fullName')?.value;
      console.log(PassValue)
      console.log(Email)
      console.log(Name)
      if ((PassValue?.includes(Email)&&PassValue?.includes(Name)) || (PassValue?.includes(Email) || PassValue?.includes(Name)))
      {
        Contain=true ;
      }
      return Contain ? validationError : null;
    };
  }

  passwordMatch: ValidatorFn =
  (frmGroup: AbstractControl): ValidationErrors | null => {
    let PassControl= frmGroup.get('password');
    let ConfirmPassControl= frmGroup.get('confirmPassword');
    if(!PassControl || !ConfirmPassControl || !PassControl.value || !ConfirmPassControl.value)
      return null;

    let valErr={'UnmatchedPassword': {'pass': PassControl?.value, 'confrim': ConfirmPassControl?.value}}
    return (PassControl?.value==ConfirmPassControl?.value)? null : valErr;
  }
}
