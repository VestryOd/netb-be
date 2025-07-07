export interface IEntityResponse<T> {
  items: T[];
  total: number;
  has_next: boolean;
  limit: number;
  page: number;
}
