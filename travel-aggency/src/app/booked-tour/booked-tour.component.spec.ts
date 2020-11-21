import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTourComponent } from './booked-tour.component';

describe('BookedTourComponent', () => {
  let component: BookedTourComponent;
  let fixture: ComponentFixture<BookedTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
