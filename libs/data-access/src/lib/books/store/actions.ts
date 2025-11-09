import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BooksListStatuses } from '../interfaces';

export const booksActions = createActionGroup({
  source: 'books',
  events: {
    'get books': emptyProps(),
    'add book': props<{ bookTitle: string }>(),
    'change book status': props<{
      id: number;
      status: `${BooksListStatuses}`;
    }>(),
    'delete book': props<{ bookId: number }>()
  }
});
