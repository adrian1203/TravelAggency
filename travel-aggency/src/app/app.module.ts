import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {TourListComponent} from './tour-list/tour-list.component';
import {TourComponent} from './tour/tour.component';
import {FormsModule} from '@angular/forms';
import {NewTourComponent} from './new-tour/new-tour.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {BookedTourComponent} from './booked-tour/booked-tour.component';
import {TourDetailComponent} from './tour-detail/tour-detail.component';
import {RegistrationComponent} from './registration/registration.component';
import {FilterComponent} from './filter/filter.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ReactiveFormsModule} from '@angular/forms';
import {Ng5SliderModule} from 'ng5-slider';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TourListComponent,
    TourComponent,
    NewTourComponent,
    ShoppingCartComponent,
    BookedTourComponent,
    TourDetailComponent,
    RegistrationComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    Ng5SliderModule,
    HttpClientModule

  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
