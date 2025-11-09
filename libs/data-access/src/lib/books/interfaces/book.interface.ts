export interface Book {
  id: number;
  title: string;
  status: BooksListStatuses;
}

export const enum BooksListStatuses {
  READ = 'Прочитана',
  UNREAD = 'Не прочитана',
  IN_PROGRESS = 'В процессе'
}

export const enum BooksListHeaders {
  NAME = 'Название',
  STATUS = 'Статус',
  ACTIONS = 'Действия'
}
