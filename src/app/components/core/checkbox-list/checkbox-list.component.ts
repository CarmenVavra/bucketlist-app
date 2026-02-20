import { Component, inject, input } from '@angular/core';
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
    console.log('isChecked', isChecked, 'index', index);
  }

  protected delete(item: TakeAway) {
    console.log('delete item ', item);
    // this.itemControl.removeAt(index);
  }

  protected save() {
    console.log('save items', this.items());
  }

  protected add() {
    console.log('add');
  }
}
