import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TourComponent} from "./tour/tour.component";
import {TourDetailComponent} from "./tour-detail/tour-detail.component";
import {TourListComponent} from "./tour-list/tour-list.component";
import {HeaderComponent} from "./header/header.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {BookedTourComponent} from "./booked-tour/booked-tour.component";

const routes: Routes = [
  {path: 'tour-list', component: TourListComponent},
  {path: 'tour-detail/:id', component: TourDetailComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'booked-tour', component: BookedTourComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
