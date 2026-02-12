import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFantasyItemComponent } from './create-fantasy-item.component';

describe('CreateFantasyItemComponent', () => {
  let component: CreateFantasyItemComponent;
  let fixture: ComponentFixture<CreateFantasyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFantasyItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFantasyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
