import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFantasyItemComponent } from './update-fantasy-item.component';

describe('UpdateFantasyItemComponent', () => {
  let component: UpdateFantasyItemComponent;
  let fixture: ComponentFixture<UpdateFantasyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFantasyItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFantasyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
