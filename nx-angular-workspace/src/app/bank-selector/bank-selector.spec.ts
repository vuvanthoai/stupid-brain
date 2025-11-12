import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankSelector } from './bank-selector';

describe('BankSelector', () => {
  let component: BankSelector;
  let fixture: ComponentFixture<BankSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(BankSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
