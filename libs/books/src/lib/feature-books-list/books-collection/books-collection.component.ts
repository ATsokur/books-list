import { Component, computed, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  Book,
  booksActions,
  BooksListHeaders,
  selectBooks
} from '@bl/data-access';
import { Store } from '@ngrx/store';
import {
  TuiAppearance,
  TuiDataList,
  TuiIcon,
  TuiTextfield
} from '@taiga-ui/core';

import { BookStatusSelectComponent } from '../book-status-select/book-status-select.component';

@Component({
  selector: 'lib-books-collection',
  imports: [
    TuiIcon,
    TuiAppearance,
    FormsModule,
    ReactiveFormsModule,
    TuiDataList,
    TuiTextfield,
    BookStatusSelectComponent
  ],
  templateUrl: './books-collection.component.html',
  styleUrl: './books-collection.component.scss'
})
export class BooksCollectionComponent {
  #store = inject(Store);

  #booksMap = this.#store.selectSignal(selectBooks);
  protected readonly books = computed<Book[]>(() =>
    Object.values(Object.fromEntries(this.#booksMap()))
  );

  protected readonly booksCollectionHeaders: readonly BooksListHeaders[] = [
    BooksListHeaders.NAME,
    BooksListHeaders.STATUS,
    BooksListHeaders.ACTIONS
  ];

  constructor() {
    this.#store.dispatch(booksActions.getBooks());
  }

  protected onSelectStatus(selected: Omit<Book, 'title'>): void {
    this.#store.dispatch(
      booksActions.changeBookStatus({
        status: selected.status,
        id: selected.id
      })
    );
  }

  protected onDelete(bookId: number): void {
    this.#store.dispatch(booksActions.deleteBook({ bookId }));
  }
}
