import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateBucketListComponent } from './private-bucket-list.component';

describe('PrivateBucketListComponent', () => {
  let component: PrivateBucketListComponent;
  let fixture: ComponentFixture<PrivateBucketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateBucketListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateBucketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
