import { Component, input, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuItem } from '../../models/general.model';

@Component({
  selector: 'app-select-list',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-list.component.html',
  styleUrl: './select-list.component.css'
})
export class SelectListComponent {
  readonly listItems = input<MenuItem[]>();

  readonly hide = input.required<boolean>();

  readonly listItemControl = new FormControl();

}
