import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInProjectComponent } from './users-in-project.component';

describe('UsersInProjectComponent', () => {
  let component: UsersInProjectComponent;
  let fixture: ComponentFixture<UsersInProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersInProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersInProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
