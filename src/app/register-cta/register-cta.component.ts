import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-cta',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './register-cta.component.html',
  styleUrls: ['./register-cta.component.scss']
})
export class RegisterCtaComponent implements OnInit, OnDestroy {
  private timerId: any;
  timeLeftMs = 0;

  dd = '00'; hh = '00'; mm = '00'; ss = '00';

  // Target: midnight Monday, Oct 6, 2025 (Eastern Time)
  private target = new Date('2025-10-07T00:00:00-04:00');

  ngOnInit(): void {
    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  private tick(): void {
    const now = new Date();
    this.timeLeftMs = Math.max(0, this.target.getTime() - now.getTime());
    const totalSeconds = Math.floor(this.timeLeftMs / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    this.dd = String(days).padStart(2, '0');
    this.hh = String(hours).padStart(2, '0');
    this.mm = String(mins).padStart(2, '0');
    this.ss = String(secs).padStart(2, '0');
  }
}
