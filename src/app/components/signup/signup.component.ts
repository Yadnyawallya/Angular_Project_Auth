import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"; 
  SignupForm!:FormGroup;
  constructor(private fb:FormBuilder , private auth:AuthService, private route:Router) { }

  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
    });
  }

  hideShowPass(){
    this.isText == !this.isText; 
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type ="text": this.type ="password";
  }

  onSignUp(){
    console.log(this.SignupForm.value);
    if(this.SignupForm.valid){
      // data from database
      this.auth.signUp(this.SignupForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.SignupForm.reset();
          this.route.navigate(['login']);
          //this.route.navigate()
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      // throw the error
      ValidateForm.validateAllFormFilelds(this.SignupForm);
      alert("signup form is invalid")
    }
  }


}
