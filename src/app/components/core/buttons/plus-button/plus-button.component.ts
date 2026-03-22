import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-plus-button',
  imports: [],
  templateUrl: './plus-button.component.html',
  styleUrl: './plus-button.component.css'
})
export class PlusButtonComponent {
  readonly showText = input<boolean>(true);
  readonly openCreateAction = output();

  ngOnInit(): void {
    console.log('showText()', this.showText());
  }

  protected openCreate() {
    this.openCreateAction.emit();
  }
}
