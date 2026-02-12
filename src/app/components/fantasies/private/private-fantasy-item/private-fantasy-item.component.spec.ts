import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFantasyItemComponent } from './private-fantasy-item.component';

describe('PrivateFantasyItemComponent', () => {
  let component: PrivateFantasyItemComponent;
  let fixture: ComponentFixture<PrivateFantasyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateFantasyItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateFantasyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
