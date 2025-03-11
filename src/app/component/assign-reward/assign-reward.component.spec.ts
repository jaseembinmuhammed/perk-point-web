import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRewardComponent } from './assign-reward.component';

describe('AssignRewardComponent', () => {
  let component: AssignRewardComponent;
  let fixture: ComponentFixture<AssignRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignRewardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
