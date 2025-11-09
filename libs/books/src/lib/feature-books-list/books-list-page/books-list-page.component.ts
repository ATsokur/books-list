import { Component } from '@angular/core';
import { BookAddFormComponent } from '../book-add-form/book-add-form.component';

@Component({
  selector: 'lib-books-list-page',
  imports: [BookAddFormComponent],
  templateUrl: './books-list-page.component.html',
  styleUrl: './books-list-page.component.scss'
})
export class BooksListPageComponent {}
