import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBucketListItemComponent } from './public-bucket-list-item.component';

describe('PublicBucketListItemComponent', () => {
  let component: PublicBucketListItemComponent;
  let fixture: ComponentFixture<PublicBucketListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBucketListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBucketListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
