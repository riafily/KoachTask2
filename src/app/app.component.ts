import { Component } from '@angular/core';
import { Scheduler } from './scheduler';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { errors } from './constants'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,
    CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Scheduler';
  scheduler = new Scheduler();
  error = '';
  startTime: number = 0;
  endTime: number = 0;
  events: { start_time: number, end_time: number }[] = [];

  constructor() {
    this.events = this.scheduler.getEvents();
  }

  sortEventsByStartTime(): void {
    this.events.sort((a, b) => a.start_time - b.start_time);
  }

  addEvent(): any {
    if (!this.validateTmes(this.startTime, this.endTime)) return;
    const isSuccess = this.scheduler.addEvent({ start_time: this.startTime, end_time: this.endTime });
    if (!isSuccess) this.error = errors.overlapError;
    else this.sortEventsByStartTime();
  }

  validateTmes(start: number, end: number): boolean {
    this.error = ''
    if (start >= end) {
      this.error = errors.durationError
      return false;
    } if (start < 0 || end > 24) {
      this.error = errors.limitsError;
      return false;
    }
    return true;
  }
}
