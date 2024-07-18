export interface TitleListModel {
  page: number,
  totalPages: number,
  count: number,
  titles: Array<TitleDetailModel>
}

export interface TitleDetailModel {
  _id: string;
  show_id: string;
  type: string;
  title: string;
  director: string;
  cast: string;
  country: string;
  date_added: string;
  release_year: string;
  rating: string;
  duration: string;
  listed_in: string;
  description: string;
}