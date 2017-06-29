import { User } from './../state-management/model/user';
import { LoginService } from './../service/login-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Login } from "./../state-management/model/login";
import { Sample } from './../state-management/model/sample';
import { ServiceResponce } from "./../state-management/model/service-responce";

import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]

})
export class LoginComponent implements OnInit {
  User: User;
  serviceResponce: ServiceResponce;
  form: FormGroup;
  getData: string;
  postData: string;

  obj: any;

  //this.serviceResponce = new ServiceResponce(obj,postData); 
  active = true;
  submitted = false;
  model = new Login("", "");
  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });
  constructor(fb: FormBuilder, private _loginservice: LoginService,private router: Router) {

    this.form = fb.group({  
    })
  }

  onSubmit() {   
    console.log(this.model.userName + this.model.password);
    this._loginservice.getLogin(this.model.userName, this.model.password)
      .subscribe(
      data => {
            this.getData = JSON.stringify(data || null)
            this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
            this.User = <User>JSON.parse(this.serviceResponce.Data.toString());
            //alert(this.User.AffiliateCode); 
            localStorage.setItem("user", JSON.stringify(this.User));            
            this.router.navigate(['/dashboard'],this.User);

          },
      error => alert(error),
      () => {
      
      }
      );
     
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  resetForm() {
    this.form.reset();
  }


  ngOnInit() {
    if(localStorage.getItem("user") === null)
     {
        this.router.navigate(['']);
     }
     else 
     {
        this.router.navigate(['/dashboard'],this.User);
     }
  }

}
