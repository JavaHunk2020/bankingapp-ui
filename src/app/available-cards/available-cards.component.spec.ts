import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCardsComponent } from './available-cards.component';

describe('AvailableCardsComponent', () => {
  let component: AvailableCardsComponent;
  let fixture: ComponentFixture<AvailableCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
