export class Scheduler {
  private events: { start_time: number, end_time: number }[] = [];

  addEvent(event: { start_time: number, end_time: number }): boolean {
    for (let existingEvent of this.events) {
      if (
        !(event.end_time <= existingEvent.start_time || event.start_time >= existingEvent.end_time)
      ) {
        return false;
      }
    }
    this.events.push(event);
    return true;
  }

  getEvents(): { start_time: number, end_time: number }[] {
    return this.events;
  }
}
