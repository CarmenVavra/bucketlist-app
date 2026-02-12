import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFantasyItemComponent } from './public-fantasy-item.component';

describe('PublicFantasyItemComponent', () => {
  let component: PublicFantasyItemComponent;
  let fixture: ComponentFixture<PublicFantasyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicFantasyItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicFantasyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
