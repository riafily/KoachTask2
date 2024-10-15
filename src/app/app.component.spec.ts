import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { errors } from './constants'

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'scheduler' title`, () => {
    expect(component.title).toEqual('Scheduler');
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Scheduler');
  });

  it('should bind start and end time input fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const startTimeInput = compiled.querySelector('input[placeholder="Enter start time"]') as HTMLInputElement;
    const endTimeInput = compiled.querySelector('input[placeholder="Enter end time"]') as HTMLInputElement;
    startTimeInput.value = '10';
    startTimeInput.dispatchEvent(new Event('input'));
    endTimeInput.value = '20';
    endTimeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.startTime).toBe(10);
    expect(component.endTime).toBe(20);
  });

  it('should add an event when the submit button is clicked', () => {
    component.startTime = 10;
    component.endTime = 20;
    fixture.detectChanges();
    spyOn(component, 'addEvent');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.addEvent).toHaveBeenCalled();
  });

  it('should display events after addEvent is called', () => {
    component.startTime = 10;
    component.endTime = 20;
    component.addEvent();
    fixture.detectChanges();
    const eventList = fixture.nativeElement.querySelector('.timeline') as HTMLElement;
    expect(eventList).toBeTruthy();
    expect(eventList.querySelectorAll('li').length).toBe(1);
  });

  it('should display an error message if error exists', () => {
    component.error = 'Start time must be less than end time';
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error') as HTMLElement;
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain(errors.durationError);
  });

  it('should set error if startTime is greater than or equal to endTime', () => {
    component.startTime = 10;
    component.endTime = 5;
    component.addEvent();
    expect(component.error).toBe(errors.durationError);
  });

  it('should set error if startTime or endTime is negative', () => {
    component.startTime = -5;
    component.endTime = 10;
    component.addEvent();
    expect(component.error).toBe(errors.limitsError);
  });

  it('should display error if there is a conflict with existing events', () => {
    component.startTime = 1;
    component.endTime = 20;
    component.addEvent();
    component.startTime = 12;
    component.endTime = 14;
    component.addEvent();
    fixture.detectChanges();
    expect(component.error).toBe(errors.overlapError);
  });
});
