import { Component, input, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../../../../models/general.model';

@Component({
  selector: 'app-navigation-list-item',
  imports: [MatListModule],
  templateUrl: './navigation-list-item.component.html',
  styleUrl: './navigation-list-item.component.css'
})
export class NavigationListItemComponent {
  readonly item = input.required<MenuItem>();

  readonly selectedItemAction = output<MenuItem>();

  selectedItem(item: MenuItem) {
    this.selectedItemAction.emit(item);
  }
}
