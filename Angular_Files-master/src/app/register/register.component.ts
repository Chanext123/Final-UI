import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
// import{ FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    userName: '',
    password: '',
  }
  redirectUrl: any = '';
  constructor(private auth: AuthService, private router:Router, private activedRoute: ActivatedRoute){

  }
  ngOnInit(): void{
    this.redirectUrl = this.activedRoute.snapshot.queryParamMap.get('redirectUrl')|| '/';
    this.router.navigateByUrl(this.redirectUrl);
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null){
      this.signupUsers = JSON.parse(localData);
    }

  }
  onSignUp(){
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    this.signupObj= {
      userName: '',
      email: '',
      password: ''
    };

  }
  onLogin():void{
    this.auth.register().then(() => {
      this.router.navigate(['/']);
    })

    const isUserExist = this.signupUsers.find(m=> m.userName == this.loginObj.userName && m.password == this.loginObj.password);
    if (isUserExist != undefined){
      alert('User Login Successfully');
    } else {
      alert('Wrong Credentials');
    }

  }

//  registerForm = new FormGroup({
//   firstname: new FormControl(""),
//   lastname: new FormControl(""),
//   email: new FormControl(""),
//   mobile: new FormControl(""),
//   gender: new FormControl(""),
//   pwd: new FormControl(""),
//   rpwd: new FormControl("")

//  });
// registerSubmitted(){
//   console.log(this.registerForm.value);
// }

}
