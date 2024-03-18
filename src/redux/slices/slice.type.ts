export interface PaginateData<T> {
  data: T[];
  meta: PaginateMeta;
}

export interface PaginateMeta {
  currentPage: number;
  lastPage: number;
  totalPage: number;
}
