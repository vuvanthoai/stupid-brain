import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInitiate } from './user-initiate';

describe('UserInitiate', () => {
  let component: UserInitiate;
  let fixture: ComponentFixture<UserInitiate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInitiate],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInitiate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
