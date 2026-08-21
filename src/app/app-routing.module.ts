import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LeaderComponent } from './leader/leader.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { RegisterComponent } from './register/register.component';
import { ConductComponent } from './conduct/conduct.component';
import { PortalComponent } from './portal/portal.component';
import { userGuard } from './guard/user.guard';
import { BrochureComponent } from './brochure/brochure.component';
import { GlobalComponent } from './globalhealth/globalhealth.component';
import { PatientComponent } from './patientoutcomes/patientoutcomes.component';
import { HospitalComponent} from './hospitaloperational/hospitaloperational.component';
import { InnovationComponent } from './iime/iime.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FaqComponent } from './faq/faq.component';
import { MentorsComponent } from './mentors/mentors.component';
import { ResourcesComponent } from './resources/resources.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'leadership', component: LeaderComponent},
  {path: 'sponsors', component: SponsorsComponent},
  // {path: 'register', component: RegisterComponent, canActivate: [userGuard]},
  // {path: 'portal', component: PortalComponent},
  {path: 'conduct', component: ConductComponent},
  {path: 'brochure', component:BrochureComponent},
  {path: 'globalhealth', component:GlobalComponent},
  {path: 'patientoutcome', component:PatientComponent},
  {path: 'hospitaloperation', component:HospitalComponent},
  {path: 'contactus', component:ContactusComponent},
  {path: 'faq', component:FaqComponent},
  {path: 'mentors', component:MentorsComponent},
  {path: 'resources', component:ResourcesComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollOffset: [0, 64] })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
