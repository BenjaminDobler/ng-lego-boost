import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamepadComponent } from './gamepad.component';

describe('GamepadComponent', () => {
  let component: GamepadComponent;
  let fixture: ComponentFixture<GamepadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamepadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
