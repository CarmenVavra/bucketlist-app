import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFantasiesComponent } from './public-fantasies.component';

describe('PublicFantasiesComponent', () => {
  let component: PublicFantasiesComponent;
  let fixture: ComponentFixture<PublicFantasiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicFantasiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicFantasiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
