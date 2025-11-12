import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildInformation } from './child-information';

describe('ChildInformation', () => {
  let component: ChildInformation;
  let fixture: ComponentFixture<ChildInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildInformation],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
