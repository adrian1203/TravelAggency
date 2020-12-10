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
  opinion = 5;
  gallery: Array<string>;
  comments: Array<Comment> = new Array<Comment>();
  votes: Array<Vote> = new Array<Vote>();

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
  reservation: Array<Reservation> = new Array<Reservation>();
}


export class Cart {
  elements: CartElement[];
}


export class CartElement {
  tour: Tour;
  amount: number;
}

export class Comment {
  user: AppUser;
  text: string;
}

export class Vote {
  user: AppUser;
  vote: number;
}

export class Reservation {
  tour: Tour;
  places: number;
}

