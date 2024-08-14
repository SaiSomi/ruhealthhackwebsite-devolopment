import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { authState, Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { getFirestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { sendEmailVerification } from 'firebase/auth';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  firestore : Firestore = inject(Firestore)
  user$: Observable<User | null>;
  registered=false;
  showLogin=false;
  panelOpenState = false;

  //EDIT 'CLOSED' here and at auth.component.ts
  closed = true;
  

  ngOnInit(): void {
    
    onAuthStateChanged(this.auth, (user)=>{
      if(user){
        this.checkRegister(user.uid)
        setDoc(doc(getFirestore(), "emails", this.auth.currentUser.uid),{
          email: this.auth.currentUser.email,
          verified: this.auth.currentUser.emailVerified
        })

      } else { this.showLogin=true }
    })
  }

  async verifyResend(){
    if (confirm('Resend verification email to ' + this.auth.currentUser.email + '? -- Check your spam folder if you do not see it.')){
      await sendEmailVerification(this.auth.currentUser)
    }
  }

  async checkRegister(uid:string){   
    const docRef = doc(getFirestore(), "registration", uid)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      this.registered=true;
    } else {

    }
  }

  async verifyCheck(){
    this.auth.currentUser.reload()
    console.log(this.auth.currentUser.emailVerified)
  }

  constructor(public auth:Auth) { 
    this.user$ = authState(auth);
  }
}
