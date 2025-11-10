import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiAppearance, TuiTextfield } from '@taiga-ui/core';
import { TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { BookAddForm } from '@bl/data-access';

@Component({
  selector: 'lib-book-add-form',
  imports: [
    TuiTextfield,
    TuiAppearance,
    ReactiveFormsModule,
    TuiTextfieldControllerModule
  ],
  templateUrl: './book-add-form.component.html',
  styleUrl: './book-add-form.component.scss',
  providers: []
})
export class BookAddFormComponent {
  protected readonly form = new FormGroup<BookAddForm>({
    title: new FormControl<string | null>(null)
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
    const title = this.form.controls.title.getRawValue();

    if (!title) return;

    this.bookTitle.emit(title);
    this.form.controls.title.patchValue(null, { emitEvent: false });
  }
}
