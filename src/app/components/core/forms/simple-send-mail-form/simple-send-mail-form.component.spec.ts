import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSendMailFormComponent } from './simple-send-mail-form.component';

describe('SimpleSendMailFormComponent', () => {
  let component: SimpleSendMailFormComponent;
  let fixture: ComponentFixture<SimpleSendMailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleSendMailFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleSendMailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
