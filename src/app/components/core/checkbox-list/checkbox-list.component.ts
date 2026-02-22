import { Component, inject, input, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxItem } from './models/checkbox-list.model';
import { DeleteButtonComponent } from "../buttons/delete-button/delete-button.component";
import { SaveButtonComponent } from "../buttons/save-button/save-button.component";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TakeAway } from '../../take-aways/models/take-aways.model';

@Component({
  selector: 'app-checkbox-list',
  imports: [MatCheckboxModule, DeleteButtonComponent, SaveButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox-list.component.html',
  styleUrl: './checkbox-list.component.css'
})
export class CheckboxListComponent {
  readonly items = input.required<CheckboxItem[]>();

  readonly saveAction = output<CheckboxItem[]>();

  #fb = inject(FormBuilder);

  form = this.#fb.group({
    itemControl: this.#fb.array([]),
  });

  itemForm = new FormGroup('');

  get itemControl() {
    return this.form.get('itemControl')! as FormArray;
  }

  ngOnInit(): void {
    console.log('items in checkbox-list', this.items());
    console.log('this.itemControl', this.itemControl);
  }

  protected update(isChecked: boolean, index: number) {
    this.items()[index].isChecked = isChecked;
    console.log('this.items()', this.items());
  }

  protected delete(item: TakeAway) {
    console.log('delete item ', item);
    // this.itemControl.removeAt(index);
  }

  protected save() {
    this.saveAction.emit(this.items());
  }

  protected add() {
    console.log('add');
  }
}
