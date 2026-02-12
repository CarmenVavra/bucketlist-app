import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTitleTextFormComponent } from './simple-title-text-form.component';

describe('SimpleTitleTextFormComponent', () => {
  let component: SimpleTitleTextFormComponent;
  let fixture: ComponentFixture<SimpleTitleTextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleTitleTextFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleTitleTextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
