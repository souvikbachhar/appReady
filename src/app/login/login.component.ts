import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';

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
      userName: ['a', Validators.required],
      userPassword: ['a', Validators.required]
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
        this._router.navigateByUrl('/app/dashboard');
      });
  
  }

  // logme(){

  //   var AesUtil = function(keySize, iterationCount) {
  //     this.keySize = keySize / 32;
  //     this.iterationCount = iterationCount;
  //   };
    
  //   AesUtil.prototype.generateKey = function(salt, passPhrase) {
  //     var key = CryptoJS.PBKDF2(
  //         passPhrase, 
  //         CryptoJS.enc.Hex.parse(salt),
  //         { keySize: this.keySize, iterations: this.iterationCount });
  //     return key;
  //   }
    
  //   AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText) {
  //     var key = this.generateKey(salt, passPhrase);
  //     var encrypted = CryptoJS.AES.encrypt(
  //         plainText,
  //         key,
  //         { iv: CryptoJS.enc.Hex.parse(iv) });
  //     return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  //   }
    
  //   AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
  //     var key = this.generateKey(salt, passPhrase);
  //     var cipherParams = CryptoJS.lib.CipherParams.create({
  //       ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  //     });
  //     var decrypted = CryptoJS.AES.decrypt(
  //         cipherParams,
  //         key,
  //         { iv: CryptoJS.enc.Hex.parse(iv) });
  //     return decrypted.toString(CryptoJS.enc.Utf8);
  //   }

  //   var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
  //       var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);

  //       var aesUtil = new AesUtil(128, 1000);
  //       var ciphertext = aesUtil.encrypt(salt, iv, 'souvik', this.loginFormGroup.controls.userPassword.value);

  //       var aesPassword = (iv + "::" + salt + "::" + ciphertext);
  //       var password = btoa(aesPassword);
  //       var data = {
  //           userName: this.loginFormGroup.controls.userName.value,
  //           password: password
  //       }
  //      this._profileService.getAuthenticationStatus2(data)
  //       .subscribe(response=>{
  //         console.log(response.body);
  //       })
  // }
}
