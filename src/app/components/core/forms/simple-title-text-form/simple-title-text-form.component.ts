import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from "@angular/material/expansion";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SimpleTitleText } from '../../../../models/general.model';

@Component({
  selector: 'app-simple-title-text-form',
  imports: [MatFormFieldModule, MatExpansionModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './simple-title-text-form.component.html',
  styleUrl: './simple-title-text-form.component.css'
})
export class SimpleTitleTextFormComponent implements OnInit {

  readonly titleLabel = signal<string>('');
  readonly textLabel = signal<string>('');
  readonly formData = signal<SimpleTitleText>({});

  readonly title = input<string>();
  readonly text = input<string>();

  readonly submitAction = output<SimpleTitleText>();
  readonly cancelAction = output();

  #fb = inject(FormBuilder);

  readonly form = this.#fb.group({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.form.controls['title'].setValue(this.title()!);
    this.form.controls['text'].setValue(this.text()!);
  }

  protected onSubmit() {
    if (this.form.valid) {
      this.formData().title = this.form.value.title!;
      this.formData().text = this.form.value.text!;
      this.submitAction.emit(this.formData());
    }
  }

  protected onCancel() {
    this.form.reset();
    this.cancelAction.emit();
  }
}
