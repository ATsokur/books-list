export interface Book {
  id: number;
  title: string;
  status: Statuses;
}

export const enum Statuses {
  READ = 'READ',
  UNREAD = 'UNREAD'
}
