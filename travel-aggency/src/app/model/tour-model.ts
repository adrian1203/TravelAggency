export class Tour {
  id: number;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  price: number;
  places: number;
  description: string;
  pictureLink: string;
  reservePlaces = 0;
  category: string;

}

export class TourFilter {
  category: Array<string>;
  minPrice: number;
  maxPrice: number;

}
