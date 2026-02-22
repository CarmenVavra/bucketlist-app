import { Component, inject, input, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxItem } from './models/checkbox-list.model';
import { DeleteButtonComponent } from "../buttons/delete-button/delete-button.component";
import { SaveButtonComponent } from "../buttons/save-button/save-button.component";
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TakeAway } from '../../take-aways/models/take-aways.model';
import { MatFormField } from "@angular/material/select";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-checkbox-list',
  imports: [MatCheckboxModule, DeleteButtonComponent, SaveButtonComponent, FormsModule, ReactiveFormsModule, MatFormField, MatIcon, MatInput],
  templateUrl: './checkbox-list.component.html',
  styleUrl: './checkbox-list.component.css'
})
export class CheckboxListComponent {
  readonly items = input.required<CheckboxItem[]>();

  readonly saveAction = output<FormArray>();
  readonly toggleCheckedAction = output<CheckboxItem[]>();
  readonly deleteAction = output<CheckboxItem>();

  #fb = inject(FormBuilder);

  toggleCbxForm = this.#fb.group({
    itemControl: this.#fb.array([]),
  });

  newEntriesForm = this.#fb.group({
    newEntries: this.#fb.array([]),
  });

  get newEntries() {
    return this.newEntriesForm.get('newEntries')! as FormArray;
  }

  get itemControl() {
    return this.toggleCbxForm.get('itemControl')! as FormArray;
  }

  ngOnInit(): void {
    console.log('items in checkbox-list', this.items());
    console.log('this.itemControl', this.itemControl);
  }

  protected update(isChecked: boolean, index: number) {
    this.items()[index].isChecked = isChecked;
    console.log('this.items()', this.items());
  }

  protected delete(itemId: number) {
    this.deleteAction.emit(this.items().find(item => item.id === itemId)!);
    console.log('delete item ', this.items().find(item => item.id === itemId));
    // this.itemControl.removeAt(index);
  }

  protected save() {
    this.saveAction.emit(this.newEntries);
  }

  protected toggleChecked() {
    // TODO: only once, not for every item?
    this.toggleCheckedAction.emit(this.items());
  }

  protected add() {
    const newEntryForm = this.#fb.group({
      newEntry: new FormControl('', Validators.required),
    });

    this.newEntries.push(newEntryForm);
    console.log('add this.newEntries', this.newEntries);
  }
}
