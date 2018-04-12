import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatehotelroomsComponent } from './updatehotelrooms.component';

describe('UpdatehotelroomsComponent', () => {
  let component: UpdatehotelroomsComponent;
  let fixture: ComponentFixture<UpdatehotelroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatehotelroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatehotelroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
