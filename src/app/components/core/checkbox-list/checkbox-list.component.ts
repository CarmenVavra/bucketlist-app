import { Component, inject, input, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxItem } from './models/checkbox-list.model';
import { DeleteButtonComponent } from "../buttons/delete-button/delete-button.component";
import { SaveButtonComponent } from "../buttons/save-button/save-button.component";
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from "@angular/material/select";
import { MatInput } from '@angular/material/input';
import { PlusButtonComponent } from "../buttons/plus-button/plus-button.component";

@Component({
  selector: 'app-checkbox-list',
  imports: [MatCheckboxModule, DeleteButtonComponent, SaveButtonComponent, FormsModule, ReactiveFormsModule, MatFormField, MatInput, PlusButtonComponent],
  templateUrl: './checkbox-list.component.html',
  styleUrl: './checkbox-list.component.css'
})
export class CheckboxListComponent {
  readonly items = input.required<CheckboxItem[]>();

  readonly saveAction = output<FormArray>();
  readonly toggleCheckedAction = output<CheckboxItem[]>();
  readonly deleteItemAction = output<CheckboxItem>();
  readonly deleteNewEntryAction = output<CheckboxItem>();

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

  protected update(isChecked: boolean, index: number) {
    this.items()[index].isChecked = isChecked;
  }

  protected deleteItem(index: number) {
    this.deleteItemAction.emit(this.items()[index]);
  }

  protected deleteNewEntry(index: number) {
    this.newEntries.removeAt(index);
  }

  protected save() {
    this.saveAction.emit(this.newEntries);
    this.newEntries.clear();
  }

  protected toggleChecked() {
    this.toggleCheckedAction.emit(this.items());
  }

  protected add() {
    const newEntryForm = this.#fb.group({
      newEntry: new FormControl('', Validators.required),
    });

    this.newEntries.push(newEntryForm);
  }
}
