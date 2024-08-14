import { Component, Optional } from '@angular/core';
import { Auth, authState, signOut, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Subscription, EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { createUserWithEmailAndPassword,  updateProfile, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import {FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  form: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'login';
  loading = false;
  serverMessage: string;
  closed=true;

  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(@Optional() private auth: Auth, private fb: FormBuilder) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u=> !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn
      });
    }
   }

   ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ],
      passwordConfirm: ['', []]
    });
  }
  
  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe()
    }
  }

  changeType(val) {
    this.type = val;
    this.serverMessage=''
  }

  async resetPassword(email: string): Promise<any> {
    await sendPasswordResetEmail(this.auth, email);  
  }

  async login(email:string, password:string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return await signOut(this.auth);
  }

  async newUserToDB(crUser:User){
  }

  

  async emailSignUp(email:string, password:string)
  : Promise<void>{
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await updateProfile(
      credential.user, {displayName: email}
    );
    await sendEmailVerification(credential.user);
    await this.newUserToDB(credential.user)
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit(){
    this.loading = true;
    const email = this.email.value;
    const password = this.password.value;
    try {
      if (this.isLogin) {
        await this.login(email, password)
      }
      if (this.isSignup) {
        await this.emailSignUp(email,password)
      }
      if (this.isPasswordReset) {
        await this.resetPassword(email)
        this.serverMessage = 'Check your Email for Reset Instructions'
        this.type='login'
      }
    }catch(err) {
      var error = err + '';
      error = error.replace('FirebaseError: Firebase: ','')
      this.serverMessage = error;
      
      console.log(error.toString());
      
    }
    this.loading=false
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }


}
