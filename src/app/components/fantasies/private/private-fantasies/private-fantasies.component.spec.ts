import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFantasiesComponent } from './private-fantasies.component';

describe('PrivateFantasiesComponent', () => {
  let component: PrivateFantasiesComponent;
  let fixture: ComponentFixture<PrivateFantasiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateFantasiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateFantasiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
