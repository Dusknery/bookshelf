import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistItem } from './booklist-item';

describe('BooklistItem', () => {
  let component: BooklistItem;
  let fixture: ComponentFixture<BooklistItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooklistItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooklistItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
