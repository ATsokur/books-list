import { AsyncPipe } from '@angular/common';
import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiAppearance, TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { BookAddForm } from '@bl/data-access';

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
      .pipe(takeUntilDestroyed())
      .subscribe();
  }

  protected onAdd() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    const title = this.form.controls.title.getRawValue();

    if (this.form.invalid || !title) return;

    this.bookTitle.emit(title);
    this.form.controls.title.patchValue(null, { emitEvent: false });
    this.form.controls.title.markAsUntouched({ emitEvent: false });
  }
}
