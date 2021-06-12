import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { CookiesService } from '../cookie.service';
import { OnpassiveService } from '../onpassive.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_form: any = FormGroup;
  forgotpw_form: any = FormGroup;
  resetpw_form: any = FormGroup;
  form_heading: String = "Login to Dashboard";
  email_regexp = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  pw_regexp = '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  activeForm: Number = 1;
  emsg:string='';
  isSubmit:boolean=false;
  smsg:boolean=false;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cs: CookiesService,
    private ops: OnpassiveService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.cs.checkCookie("accessToken")&&this.cs.getCookie("isLoggedIn")=="true"){
      this.router.navigate(['users']);
    }
   let token = this.activatedRoute.snapshot.params.token;
    if (token) {
      this.initiateResetPwForm();
      this.activeForm = 4;
      this.form_heading = "Enter New Password";
      this.cs.setCookie('accessToken', token, 900);
    } else {
      this.initiateLoginForm();
      this.initiateForgetPwForm();
    }
  }

  onactiveFormChange(n: Number) {
    this.initiateLoginForm();
    this.initiateForgetPwForm();
    this.emsg = '';
    this.smsg=false;
    this.isSubmit=false;
    this.activeForm = n;
    this.form_heading = this.activeForm == 1 ? "Login to Dashboard" : this.activeForm == 2 ? "Register User" : this.activeForm == 3 ? "Forget Password?" : "Enter New Password"
  }

  initiateLoginForm() {
    this.login_form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(this.email_regexp)]],
      password: ['', [Validators.required,Validators.pattern(this.pw_regexp), Validators.minLength(12)]]
    })
  }
  get l(){
    return this.login_form.controls;
  }
  initiateForgetPwForm() {
    this.forgotpw_form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(this.email_regexp)]]
    })
  }

  initiateResetPwForm() {
    this.resetpw_form = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(this.pw_regexp), Validators.minLength(12)]],
      confirm_pw: ['', Validators.required]
    })
  }
  get r(){
    return this.resetpw_form.controls;
  }
  onLogSubmit() {    
    this.isSubmit=true;
    let fd = this.login_form.value;
    this.activeForm == 1 ? this.signin(fd) : this.signup(fd);
  }

  signin(fd: any) {
    this.ops.signin(fd).subscribe(res => {
    this.afterSign(res);
    }, (err) => {
      this.emsg = err;
      this.isSubmit=false;
    })
  }

  signup(fd: any) {
    this.ops.signup(fd).subscribe(res => {
      this.afterSign(res);
    }, (err) => {
      this.emsg = err;
      this.isSubmit=false;
    })
  }

  afterSign(res:any){
    let resp: any = res;
    this.cs.setCookie('accessToken', resp.accessToken, resp.exp);
    this.cs.setCookie("exp", resp.exp, resp.exp);
    this.cs.setCookie("isLoggedIn", "true", resp.exp);
    this.router.navigate(['users']);
  }

  onfpwSubmit() {
    this.isSubmit=true;
    this.ops.forgotPw(this.forgotpw_form.value.username).subscribe(res=>{
      console.log(res);
      this.smsg=true;
      this.emsg ='';
      this.initiateResetPwForm();
    },(err)=>{
      this.emsg = err;
      this.isSubmit=false;
    })
  }

  onresetpwSubmit() {
    this.isSubmit=true;
    let fd = this.resetpw_form.value;
    if(fd.password!==fd.confirm_pw){
      this.emsg = "Passwords should be matching";
      this.isSubmit=false;
      return;
    }
    this.ops.resetPw(fd).subscribe(res=>{
      console.log(res);
      this.smsg=true;
      this.emsg ='';
      this.cs.deleteCookie("accessToken");
    },(err)=>{
      this.emsg = err;
      this.isSubmit=false;
    })
  }

}
