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
  adminAuth = true;
  pass = "";
  showProducerTag: boolean = false;
  showSidenavButton: boolean = false;
  
  // Reintroduce isHandset$ observable to monitor screen size
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public auth: Auth) {
    // Subscribe to the observable to manage the state of showSidenavButton
    this.isHandset$.subscribe(isHandsetOrTablet => {
      this.showSidenavButton = isHandsetOrTablet;
    });
  }

  onScroll(event: any): void {
    const element = event.target;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

    this.showProducerTag = atBottom;
  }

  pwMatch() {
    if (this.pass === "rwjim") {
      this.adminAuth = true;
    }
  }

  getUrl() {
    return "url(https://communications.rutgers.edu/profiles/contrib/rutgers/themes/rutgers_main/pattern_lab/source/images/icons/rutgers-basic-logo-red.svg)";
  }
}
