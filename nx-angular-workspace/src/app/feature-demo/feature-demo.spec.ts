import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureDemo } from './feature-demo';

describe('FeatureDemo', () => {
  let component: FeatureDemo;
  let fixture: ComponentFixture<FeatureDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
