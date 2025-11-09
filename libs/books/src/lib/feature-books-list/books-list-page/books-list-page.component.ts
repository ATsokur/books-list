import { Component, inject } from '@angular/core';
import { BookAddFormComponent } from '../book-add-form/book-add-form.component';
import { BooksCollectionComponent } from '../books-collection/books-collection.component';
import { Store } from '@ngrx/store';
import { booksActions } from '@bl/data-access';

@Component({
  selector: 'lib-books-list-page',
  imports: [BookAddFormComponent, BooksCollectionComponent],
  templateUrl: './books-list-page.component.html',
  styleUrl: './books-list-page.component.scss'
})
export class BooksListPageComponent {
  #store = inject(Store);
  protected onAdd(bookTitle: string): void {
    this.#store.dispatch(booksActions.addBook({ bookTitle }));
  }
}
