import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { getFirestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  formRegister: FormGroup;
  formSub:Subscription;
  eduLevels=[
    "none","High School Degree","Associate's Degree","Bachelor's Degree","Master's Degree","Health Professional (i.e. Nursing) Degree", "Doctorate or equivalent", "Other Postgraduate Degree"
  ];
  mainArea=[
    "Clinical Medicine/Surgery", 
    "Nursing", 
    "Ancillary Patient Care",
    "Clinical Research",
    "Health Systems Management", 
    "Creative Arts/Design",
    "Basic Sciences",
    "Law",
    "Engineering",
    "Computer Science",
    "Software Development",
    "Artificial Intelligence",
    "Business and Management",
    "Investment and Finance",
    "Other"
  ]
  countries=["United States (USA)", "Afghanistan", " Albania", " Algeria", " American Samoa", " Andorra", " Angola", " Anguilla", " Antarctica", " Antigua and Barbuda", " Argentina", " Armenia", " Aruba", " Australia", " Austria", " Azerbaijan", " Bahamas", " Bahrain", " Bangladesh", " Barbados", " Belarus", " Belgium", " Belize", " Benin", " Bermuda", " Bhutan", " Bolivia", " Bosnia and Herzegovina", " Botswana", " Bouvet Island", " Brazil", " British Indian Ocean Territory", " Brunei Darussalam", " Bulgaria", " Burkina Faso", " Burundi", " Cambodia", " Cameroon", " Canada", " Cape Verde", " Cayman Islands", " Central African Republic", " Chad", " Chile", " China", " Christmas Island", " Cocos (Keeling Islands)", " Colombia", " Comoros", " Congo", " Cook Islands", " Costa Rica", " Cote D'Ivoire (Ivory Coast)", " Croatia (Hrvatska", " Cuba", " Cyprus", " Czech Republic", " Denmark", " Djibouti", " Dominica", " Dominican Republic", " East Timor", " Ecuador", " Egypt", " El Salvador", " Equatorial Guinea", " Eritrea", " Estonia", " Ethiopia", " Falkland Islands (Malvinas)", " Faroe Islands", " Fiji", " Finland", " France", " France", " Metropolitan", " French Guiana", " French Polynesia", " French Southern Territories", " Gabon", " Gambia", " Georgia", " Germany", " Ghana", " Gibraltar", " Greece", " Greenland", " Grenada", " Guadeloupe", " Guam", " Guatemala", " Guinea", " Guinea-Bissau", " Guyana", " Haiti", " Heard and McDonald Islands", " Honduras", " Hong Kong", " Hungary", " Iceland", " India", " Indonesia", " Iran", " Iraq", " Ireland", " Israel", " Italy", " Jamaica", " Japan", " Jordan", " Kazakhstan", " Kenya", " Kiribati", " Korea (North)", " Korea (South)", " Kuwait", " Kyrgyzstan", " Laos", " Latvia", " Lebanon", " Lesotho", " Liberia", " Libya", " Liechtenstein", " Lithuania", " Luxembourg", " Macau", " Macedonia", " Madagascar", " Malawi", " Malaysia", " Maldives", " Mali", " Malta", " Marshall Islands", " Martinique", " Mauritania", " Mauritius", " Mayotte", " Mexico", " Micronesia", " Moldova", " Monaco", " Mongolia", " Montserrat", " Morocco", " Mozambique", " Myanmar", " Namibia", " Nauru", " Nepal", " Netherlands", " Netherlands Antilles", " New Caledonia", " New Zealand", " Nicaragua", " Niger", " Nigeria", " Niue", " Norfolk Island", " Northern Mariana Islands", " Norway", " Oman", " Pakistan", " Palau", " Panama", " Papua New Guinea", " Paraguay", " Peru", " Philippines", " Pitcairn", " Poland", " Portugal", " Puerto Rico", " Qatar", " Reunion", " Romania", " Russian Federation", " Rwanda", " Saint Kitts and Nevis", " Saint Lucia", " Saint Vincent and The Grenadines", " Samoa", " San Marino", " Sao Tome and Principe", " Saudi Arabia", " Senegal", " Seychelles", " Sierra Leone", " Singapore", " Slovak Republic", " Slovenia", " Solomon Islands", " Somalia", " South Africa", " S. Georgia and S. Sandwich Isls.", " Spain", " Sri Lanka", " St. Helena", " St. Pierre and Miquelon", " Sudan", " Suriname", " Svalbard and Jan Mayen Islands", " Swaziland", " Sweden", " Switzerland", " Syria", " Taiwan", " Tajikistan", " Tanzania", " Thailand", " Togo", " Tokelau", " Tonga", " Trinidad and Tobago", " Tunisia", " Turkey", " Turkmenistan", " Turks and Caicos Islands", " Tuvalu", " Uganda", " Ukraine", " United Arab Emirates", " United Kingdom (Britain / UK)", " US Minor Outlying Islands", " Uruguay", " Uzbekistan", " Vanuatu", " Vatican City State (Holy See)", " Venezuela", " Viet Nam", " Virgin Islands (British)", " Virgin Islands (US)", " Wallis and Futuna Islands", " Western Sahara", " Yemen", " Yugoslavia", " Zaire", " Zambia", "Zimbabwe"]
  panelOpenState = false;
  submitted= false;
  
  constructor(public auth:Auth, private fb:FormBuilder, private router:Router) { 
  }

  async checkReg() {
    const docRef = doc(getFirestore(), "registration", this.auth.currentUser.uid)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      this.formRegister.disable()
      this.submitted=true
    } else {

    }
  }


  ngOnInit(): void {
    
    
    this.formRegister=this.fb.group({
      nameFirst:['', Validators.required],
      nameLast:['', Validators.required],
      nameMid:[''],
      degrees:[''],
      pronouns:[''],
      email:[''],
      diet:[''],
      levelTraining:['', Validators.required],
      myFocus:['', Validators.required],
      myStrengths:['', Validators.required],
      age:['', Validators.required],
      institution:['', Validators.required],
      rutgers:[''],
      myRole:['', Validators.required],
      location:['', Validators.required],
      citizenship:['', Validators.required],
      legalHere:['', Validators.requiredTrue],
      tele:['', Validators.required],
      teamSize:['', Validators.required],
      attendAgree:['', Validators.requiredTrue],
      acceptAgree:['', Validators.requiredTrue],
      conductAgree:['', Validators.requiredTrue],
      hackedBefore:['']
    })
    
    
  
    this.formRegister.patchValue({
      email:this.auth.currentUser.email,
      rutgers:false,
      attendAgree:false,
      conductAgree:false,
      hackedBefore:false    
    })

    this.formRegister.get("tele").valueChanges.subscribe(changes=> {
      var newString = changes.replace(/[^0-9]/g, '');
      if (newString.length > 3 && newString.length < 7){
        newString = "(" + newString.slice(0,3) + ")" + newString.slice(3)
      } else if (newString.length > 6) {
        newString = "(" + newString.slice(0,3) + ")" + newString.slice(3,6) + "-" + newString.slice(6)
      } 
      if(newString == changes){}else{
        this.formRegister.patchValue({
          tele:newString
        })
      }
    })
  }

  ngOnDestroy(): void {
    
  }

  submitForm(){
    if(!this.formRegister.value.conductAgree) 
    { 
      alert('Please Complete Agreements')
    } else {
      if (confirm('Submit Completed Registration?')) {
        this.addToDb()
      }
    }
  }

  async addToDb(){
    const delay = ms => new Promise(res => setTimeout(res,ms))

      await setDoc(doc(getFirestore(), "registration", this.auth.currentUser.uid),{
        nameFirst: this.formRegister.value.nameFirst,
        nameLast:this.formRegister.value.nameLast,
        nameMid:this.formRegister.value.nameMid,
        degrees:this.formRegister.value.degrees,
        pronouns:this.formRegister.value.pronouns,
        email:this.formRegister.value.email,
        levelTraining:this.formRegister.value.levelTraining,
        myFocus:this.formRegister.value.myFocus,
        myStrengths:this.formRegister.value.myStrengths,
        age:this.formRegister.value.age,
        institution:this.formRegister.value.institution,
        rutgers:this.formRegister.value.rutgers,
        myRole:this.formRegister.value.myRole,
        location:this.formRegister.value.location,
        citizenship:this.formRegister.value.citizenship,
        legalHere:this.formRegister.value.legalHere,
        tele:this.formRegister.value.tele,
        teamSize:this.formRegister.value.teamSize,
        hackedBefore:this.formRegister.value.hackedBefore,
        attendAgree:this.formRegister.value.attendAgree,
        acceptAgree:this.formRegister.value.acceptAgree,
        conductAgree:this.formRegister.value.conductAgree,
        diet:this.formRegister.value.diet
      })
      this.submitted=true;
      await delay(2000)
      this.router.navigate(['/portal'])
  }


}
