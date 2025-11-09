import { AsyncPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { tuiTakeUntilDestroyed } from '@taiga-ui/cdk';
import { TuiAppearance, TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { BookAddForm, BooksService } from '@bl/data-access';

@Component({
  selector: 'lib-book-add-form',
  imports: [
    AsyncPipe,
    TuiTextfield,
    TuiAppearance,
    TuiError,
    TuiFieldErrorPipe,
    ReactiveFormsModule,
    TuiTextfieldControllerModule
  ],
  templateUrl: './book-add-form.component.html',
  styleUrl: './book-add-form.component.scss',
  providers: [
    tuiValidationErrorsProvider({
      required: 'Поле не может быть пустым!'
    })
  ]
})
export class BookAddFormComponent {
  protected readonly form = new FormGroup<BookAddForm>({
    title: new FormControl<string | null>(null, {
      validators: [Validators.required]
    })
  });

  readonly bookTitle = output<string>();

  constructor() {
    this.#onInitForm();
  }

  #onInitForm() {
    this.form.controls.title.valueChanges
      .pipe(tuiTakeUntilDestroyed())
      .subscribe();
  }

  protected onAdd() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    const title = this.form.controls.title.getRawValue();

    if (this.form.invalid || !title) return;

    this.bookTitle.emit(title);
  }
}
