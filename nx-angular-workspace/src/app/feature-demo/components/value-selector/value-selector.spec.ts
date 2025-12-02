import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValueSelector } from './value-selector';

describe('ValueSelector', () => {
  let component: ValueSelector;
  let fixture: ComponentFixture<ValueSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(ValueSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
