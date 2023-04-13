export interface ReportResponseInterface<T> {
  all: number; // всего жалоб (активных)
  offset: number; // смещение (параметр из GET)
  count: number; // количество жалоб в 'items'
  items: T;
}
