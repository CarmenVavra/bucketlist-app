import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBucketListComponent } from './public-bucket-list.component';

describe('PublicBucketListComponent', () => {
  let component: PublicBucketListComponent;
  let fixture: ComponentFixture<PublicBucketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBucketListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBucketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
