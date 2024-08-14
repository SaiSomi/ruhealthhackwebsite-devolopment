import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  adminAuth=true;
  pass="";

  pwMatch(){
    if (this.pass == "rwjim") {
      this.adminAuth=true;
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
  .pipe(
    map(result => result.matches),
    shareReplay()
  ); 

  constructor(private breakpointObserver: BreakpointObserver, public auth:Auth) {    
   }

  getUrl(){
    return "url(https://communications.rutgers.edu/profiles/contrib/rutgers/themes/rutgers_main/pattern_lab/source/images/icons/rutgers-basic-logo-red.svg)"
  }

}
