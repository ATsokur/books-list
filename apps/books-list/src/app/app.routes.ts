import { Route } from '@angular/router';
import { LayoutComponent } from '@bl/layout';
import { BooksListPageComponent } from '@bl/books';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'books-list',
        pathMatch: 'full'
      },
      {
        path: 'books-list',
        component: BooksListPageComponent
      }
    ]
  }
];
