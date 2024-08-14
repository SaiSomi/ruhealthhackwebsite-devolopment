import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { ConductComponent } from './conduct/conduct.component';
import { HomeComponent } from './home/home.component';
import { LeaderComponent } from './leader/leader.component';
import { PortalComponent } from './portal/portal.component';
import { RegisterComponent } from './register/register.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { SharedModule } from './shared/shared.module';
import { CardComponent } from './card/card.component';

import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrochureComponent } from './brochure/brochure.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';

//import { provideFirestore,getFirestore } from '@angular/fire/firestore';
//import { provideAuth, getAuth } from '@angular/fire/auth';
//import { provideDatabase,getDatabase } from '@angular/fire/database';
//import { environment } from '../environments/environment';
//import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ConductComponent,
    HomeComponent,
    LeaderComponent,
    PortalComponent,
    RegisterComponent,
    ScheduleComponent,
    SponsorsComponent,
    CardComponent,
    CountdownTimerComponent,
    BrochureComponent,
    CountdownTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    YouTubePlayerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
