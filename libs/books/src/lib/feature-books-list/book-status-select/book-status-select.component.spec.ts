import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookStatusSelectComponent } from './book-status-select.component';

describe('BookStatusSelectComponent', () => {
  let component: BookStatusSelectComponent;
  let fixture: ComponentFixture<BookStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookStatusSelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
