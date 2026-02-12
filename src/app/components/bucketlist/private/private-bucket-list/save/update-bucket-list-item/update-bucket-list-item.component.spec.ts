import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBucketListItemComponent } from './update-bucket-list-item.component';

describe('UpdateBucketListItemComponent', () => {
  let component: UpdateBucketListItemComponent;
  let fixture: ComponentFixture<UpdateBucketListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBucketListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBucketListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
