import { Component, output } from '@angular/core';

@Component({
  selector: 'app-plus-button',
  imports: [],
  templateUrl: './plus-button.component.html',
  styleUrl: './plus-button.component.css'
})
export class PlusButtonComponent {

  readonly openCreateAction = output();

  protected openCreate() {
    this.openCreateAction.emit();
  }
}
