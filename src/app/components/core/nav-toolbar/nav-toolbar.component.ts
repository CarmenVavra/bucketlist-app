import { Component, output, signal } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MenuItem } from '../../../models/general.model';

@Component({
  selector: 'app-nav-toolbar',
  imports: [MatToolbar, MatIcon, MatRadioModule],
  templateUrl: './nav-toolbar.component.html',
  styleUrl: './nav-toolbar.component.css'
})
export class NavToolbarComponent {
  readonly selectList = signal<MenuItem[]>([]);

  readonly toggleMenuItemsAction = output();

  toggleMenuItems() {
    this.toggleMenuItemsAction.emit();
  }

}
