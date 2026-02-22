import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonGridComponent } from './skeleton-grid.component';

describe('AppSkeletonGridComponent', () => {
  let component: SkeletonGridComponent;
  let fixture: ComponentFixture<SkeletonGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
