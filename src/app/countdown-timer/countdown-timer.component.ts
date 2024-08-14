import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public countdown: string;
  
  // Set the target date and time
  private targetDate = new Date('Sep 30, 2024 23:59:59').getTime();

  ngOnInit(): void {
    // Update the countdown every second
    this.subscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countdown = `${this.formatNumber(days)} : ${this.formatNumber(hours)} : ${this.formatNumber(minutes)} : ${this.formatNumber(seconds)}`;
    } else {
      this.countdown = 'EXPIRED';
    }
  }

  private formatNumber(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }
}
