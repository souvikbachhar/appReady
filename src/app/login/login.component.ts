import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  constructor(private _router:Router,
              private _formBuilder:FormBuilder,
              private _profileService:ProfileService) { }

  ngOnInit() {
    this.loginFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }
  login(){
    let request={
      "userName":this.loginFormGroup.controls.userName.value,
      "password":this.loginFormGroup.controls.userPassword.value
    };
    this._profileService.getAuthenticationStatus(request)
      .subscribe(response=>{
        console.log(response.body);
      })
    this._router.navigateByUrl('/app/dashboard');
  }
}
