import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorningMeetingComponent } from './morning-meeting.component';

describe('MorningMeetingComponent', () => {
  let component: MorningMeetingComponent;
  let fixture: ComponentFixture<MorningMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorningMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorningMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
