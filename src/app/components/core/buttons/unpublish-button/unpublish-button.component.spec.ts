import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpublishButtonComponent } from './unpublish-button.component';

describe('UnpublishButtonComponent', () => {
  let component: UnpublishButtonComponent;
  let fixture: ComponentFixture<UnpublishButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnpublishButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpublishButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
