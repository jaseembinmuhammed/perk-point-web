import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRewardComponent } from './my-reward.component';

describe('MyRewardComponent', () => {
  let component: MyRewardComponent;
  let fixture: ComponentFixture<MyRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRewardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
