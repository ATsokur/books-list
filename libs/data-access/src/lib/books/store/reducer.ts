import { createFeature, createReducer, on } from '@ngrx/store';
import { Book, BooksListStatuses } from '../interfaces';
import { booksActions } from './actions';

interface BooksState {
  books: Map<number, Book>;
}

const initialState: BooksState = {
  books: new Map([
    [
      1,
      {
        id: 1,
        title: "You Don't Know JS: Scope & Closures",
        status: BooksListStatuses.READ
      }
    ],
    [
      2,
      {
        id: 2,
        title: 'Мастер и Маргарита',
        status: BooksListStatuses.UNREAD
      }
    ],
    [
      3,
      {
        id: 3,
        title: 'Ng-Book: The Complete Book on Angular',
        status: BooksListStatuses.IN_PROGRESS
      }
    ]
  ])
};

const statusMap: Record<string, BooksListStatuses> = {
  Прочитана: BooksListStatuses.READ,
  'Не прочитана': BooksListStatuses.UNREAD,
  'В процессе': BooksListStatuses.IN_PROGRESS
};

export const booksFeature = createFeature({
  name: 'booksFeature',
  reducer: createReducer(
    initialState,
    on(booksActions.getBooks, (state) => {
      return {
        ...state
      };
    }),
    on(booksActions.addBook, (state, { bookTitle: title }) => {
      const books = structuredClone(state.books);
      books.set(books.size + 1, {
        id: books.size + 1,
        title,
        status: BooksListStatuses.UNREAD
      });
      return {
        ...state,
        books
      };
    }),
    on(booksActions.changeBookStatus, (state, { id, status }) => {
      const books = structuredClone(state.books);
      const book = books.get(id);

      if (!book || !statusMap[status])
        return {
          ...state
        };

      book.status = statusMap[status];
      books.set(id, book);

      return {
        ...state,
        books
      };
    }),
    on(booksActions.deleteBook, (state, { bookId: id }) => {
      const books = structuredClone(state.books);
      books.delete(id);

      return {
        ...state,
        books
      };
    })
  )
});
