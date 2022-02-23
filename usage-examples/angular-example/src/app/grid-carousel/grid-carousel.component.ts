import { Component, Input, OnInit } from '@angular/core';

declare const window: Window &
  typeof globalThis & {
    isInGridCarousel: any;
    isInNormalCarousel: any;
  };

@Component({
  selector: 'app-grid-carousel',
  templateUrl: './grid-carousel.component.html',
  styleUrls: ['./../app.component.scss']
})
export class GridCarouselComponent implements OnInit {
  @Input() container!: string[];
  @Input() quantityOfCards =  5;
  tempContainers = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.container?.length; i += this.quantityOfCards) {
      // @ts-ignore
      this.tempContainers.push(this.container?.slice(i, i + this.quantityOfCards));
    }
  }

  /**
   * Navigation
   */
  setCarouselType(): void {
    window.isInGridCarousel = true;
    window.isInNormalCarousel = false;
  }
}
