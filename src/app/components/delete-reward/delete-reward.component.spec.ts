import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRewardComponent } from './delete-reward.component';

describe('DeleteRewardComponent', () => {
  let component: DeleteRewardComponent;
  let fixture: ComponentFixture<DeleteRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRewardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
