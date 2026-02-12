import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBucketListItemComponent } from './create-bucket-list-item.component';

describe('CreateBucketListItemComponent', () => {
  let component: CreateBucketListItemComponent;
  let fixture: ComponentFixture<CreateBucketListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBucketListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBucketListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
