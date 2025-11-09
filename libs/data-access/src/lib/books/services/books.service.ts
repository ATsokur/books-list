import { Injectable, signal } from '@angular/core';
import { Book, Statuses } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  #books = signal<Book[]>([
    {
      id: 1,
      title: "You Don't Know JS: Scope & Closures",
      status: Statuses.READ
    },
    {
      id: 2,
      title:
        'Effective TypeScript: 83 Specific Ways to Improve Your TypeScript',
      status: Statuses.UNREAD
    },
    {
      id: 3,
      title: 'Ng-Book: The Complete Book on Angular',
      status: Statuses.READ
    },
    {
      id: 4,
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      status: Statuses.UNREAD
    },
    {
      id: 5,
      title: 'Grokking Algorithms',
      status: Statuses.READ
    },
    {
      id: 6,
      title: 'Война и мир',
      status: Statuses.READ
    },
    {
      id: 7,
      title: 'Преступление и наказание',
      status: Statuses.UNREAD
    },
    {
      id: 8,
      title: 'Мастер и Маргарита',
      status: Statuses.READ
    },
    {
      id: 9,
      title: '1984',
      status: Statuses.UNREAD
    },
    {
      id: 10,
      title: 'Великий Гэтсби',
      status: Statuses.READ
    }
  ]);

  getBooks(): Book[] {
    return this.#books();
  }

  addBook(title: string): void {
    this.#books.update((books) => {
      books.push({
        id: books.length + 1,
        title,
        status: Statuses.UNREAD
      });
      return books;
    });
  }

  deleteBook(id: number): void {
    this.#books.update((books) => {
      books.splice(id, 1);
      return books;
    });
  }
}
