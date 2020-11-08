import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToursComponent } from './tours/tours.component';
import { HeaderComponent } from './header/header.component';
import { TourListComponent } from './tour-list/tour-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ToursComponent,
    HeaderComponent,
    TourListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
