import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankoButtonComponent } from './blanko-button.component';

describe('BlankoButtonComponent', () => {
  let component: BlankoButtonComponent;
  let fixture: ComponentFixture<BlankoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankoButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlankoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
