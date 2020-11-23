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
  opinion: number;
  gallery: Array<string>;

}

export class TourFilter {
  category: Array<string>;
  minPrice: number;
  maxPrice: number;
  minOpinion: number;
  maxOpinion: number;

}

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}


export class Cart {
  elements: CartElement[];
}


export class CartElement {
  tour: Tour;
  amount: number;
}
