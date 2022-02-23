import { Component, Input, OnInit } from '@angular/core';

declare const window: Window &
  typeof globalThis & {
    isInGridCarousel: any;
    isInNormalCarousel: any;
  };

@Component({
  selector: 'app-vertical-carousel',
  templateUrl: './vertical-carousel.component.html',
  styleUrls: ['./../app.component.scss']
})
export class VerticalCarouselComponent implements OnInit {
  @Input() container!: string[];

  constructor() { }

  ngOnInit(): void { }

  /**
   * Navigation
   */
   setCarouselType(): void {
    window.isInGridCarousel = false;
    window.isInNormalCarousel = true;
  }
}
