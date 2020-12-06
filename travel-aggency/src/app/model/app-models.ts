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
  longInDay: number;
  tourInstances: Array<TourInstance>;

}

export class TourFilter {
  category: Array<string>;
  minPrice: number;
  maxPrice: number;
  minOpinion: number;
  maxOpinion: number;

}

export class AppUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string;
}


export class Cart {
  elements: CartElement[];
}


export class CartElement {
  tour: Tour;
  amount: number;
}


export class TourInstance {
  startDate: Date;
  endDate: Date;
  reservedPlace: number;
}

