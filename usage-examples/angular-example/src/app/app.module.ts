import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { VerticalCarouselComponent } from './vertical-carousel/vertical-carousel.component';
import { GridCarouselComponent } from './grid-carousel/grid-carousel.component';
import { MultipleCarouselsComponent } from './multiple-carousels/multiple-carousels.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    VerticalCarouselComponent,
    GridCarouselComponent,
    MultipleCarouselsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
