import { createSelector } from '@ngrx/store';
import { booksFeature } from './reducer';
import { Book } from '../interfaces';

export const selectBooks = createSelector(
  booksFeature.selectBooks,
  (books: Map<number, Book>) => {
    return books;
  }
);
