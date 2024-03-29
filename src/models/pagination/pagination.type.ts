export type IUser = {
  data: any | null;
}

export type IBasePaginateData<T> = {
  data?: T[];
  meta: Meta;
};

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
