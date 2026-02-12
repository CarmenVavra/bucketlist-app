import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyButtonComponent } from './deny-button.component';

describe('DenyButtonComponent', () => {
  let component: DenyButtonComponent;
  let fixture: ComponentFixture<DenyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenyButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
