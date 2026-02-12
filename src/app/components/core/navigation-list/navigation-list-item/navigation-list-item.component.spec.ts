import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationListItemComponent } from './navigation-list-item.component';

describe('NavigationListItemComponent', () => {
  let component: NavigationListItemComponent;
  let fixture: ComponentFixture<NavigationListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
