import { Component, inject, input, output, signal } from '@angular/core';
import { MenuItem, MENUITEMS, ROUTE_PATHS } from '../../../models/general.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavigationListItemComponent } from "./navigation-list-item/navigation-list-item.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-list',
  imports: [MatButtonModule, MatSelectModule, MatFormFieldModule, MatSidenavModule, MatListModule, NavigationListItemComponent],
  templateUrl: './navigation-list.component.html',
  styleUrl: './navigation-list.component.css'
})
export class NavigationListComponent {
  // readonly hide = input.required<boolean>();
  readonly navigationList = signal<MenuItem[]>([]);
  readonly logoutItem = signal<MenuItem>(
    {
      id: this.navigationList().length + 1,
      text: 'Logout',
      path: ROUTE_PATHS.LOGOUT,
      icon: 'fa-solid fa-right-from-bracket'
    });

  readonly navItemClickedAction = output();
  readonly hideNavigationAction = output<boolean>();

  #router = inject(Router);

  ngOnInit(): void {
    this.navigationList.set(MENUITEMS);
  }

  selectedItem(item: MenuItem) {
    this.navItemClickedAction.emit();
    if (item.path === ROUTE_PATHS.LOGOUT) {
      localStorage.clear();
      this.hideNavigationAction.emit(true);
    } else {
      this.hideNavigationAction.emit(false);
    }
    this.#router.navigateByUrl(item.path);
  }
}
