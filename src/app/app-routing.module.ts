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

const routes: Routes = [
  {path: '', component:HomeComponent},
  //{path: 'schedule', component: ScheduleComponent},
  {path: 'leadership', component: LeaderComponent},
  //{path: 'sponsors', component: SponsorsComponent},
  //{path: 'register', component: RegisterComponent, canActivate: [userGuard]},
  //{path: 'portal', component: PortalComponent},
  //{path: 'conduct', component: ConductComponent},
  {path: 'brochure', component:BrochureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
