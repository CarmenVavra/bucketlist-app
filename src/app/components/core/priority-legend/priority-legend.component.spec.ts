import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityLegendComponent } from './priority-legend.component';

describe('PriorityLegendComponent', () => {
  let component: PriorityLegendComponent;
  let fixture: ComponentFixture<PriorityLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityLegendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
