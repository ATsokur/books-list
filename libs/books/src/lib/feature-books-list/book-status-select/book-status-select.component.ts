import { Component, effect, input, output } from '@angular/core';
import { Book, BooksListStatuses } from '@bl/data-access';
import { type TuiStringHandler } from '@taiga-ui/cdk';
import { TuiChevron, TuiSelect } from '@taiga-ui/kit';
import { TuiDataList, TuiTextfield } from '@taiga-ui/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-book-status-select',
  imports: [
    TuiChevron,
    TuiDataList,
    TuiSelect,
    TuiTextfield,
    ReactiveFormsModule
  ],
  templateUrl: './book-status-select.component.html',
  styleUrl: './book-status-select.component.scss'
})
export class BookStatusSelectComponent {
  readonly selected = output<Omit<Book, 'title'>>();
  readonly id = input<number>();
  readonly status = input.required<BooksListStatuses>();

  protected readonly selectStatusControl = new FormControl<BooksListStatuses>(
    BooksListStatuses.UNREAD,
    {
      nonNullable: true
    }
  );

  protected readonly booksListStatuses: readonly BooksListStatuses[] = [
    BooksListStatuses.UNREAD,
    BooksListStatuses.READ,
    BooksListStatuses.IN_PROGRESS
  ];

  protected readonly stringify: TuiStringHandler<BooksListStatuses> = (
    status: BooksListStatuses
  ) => this.booksListStatuses.find((item) => item === status) ?? '';

  constructor() {
    this.#onInitSelectStatusControl();
    this.#patchStatus();
  }

  #onInitSelectStatusControl(): void {
    this.selectStatusControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((status) => {
        const id = this.id();

        if (!id) return;

        this.selected.emit({
          status,
          id
        });
      });
  }

  #patchStatus(): void {
    effect(() => {
      const status = this.status();
      this.selectStatusControl.patchValue(status, { emitEvent: false });
    });
  }
}
