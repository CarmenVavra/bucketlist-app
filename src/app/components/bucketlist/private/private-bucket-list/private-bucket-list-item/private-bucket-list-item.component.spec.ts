import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateBucketListItemComponent } from './private-bucket-list-item.component';

describe('PublicBucketListItemComponent', () => {
  let component: PrivateBucketListItemComponent;
  let fixture: ComponentFixture<PrivateBucketListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateBucketListItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivateBucketListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
