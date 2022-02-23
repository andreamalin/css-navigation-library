import { Component, Input, OnInit } from '@angular/core';
// @ts-ignore
import { carouselHorizontalMovement } from '../../assets/src/navigation.js';

declare const window: Window &
  typeof globalThis & {
    actualHorizontal: any;
    isInGridCarousel: any;
    isInNormalCarousel: any;
  };

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./../app.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() container!: string[];
  @Input() isInfiniteCarousel!: boolean;

  // Navigation
  move = {
    right: '',
  };
  private horizontalIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Navigation
   */
  // Get focus on current card depending if carousel is infinite or not
  getActualFocus(): void {
    window.isInGridCarousel = false;
    window.isInNormalCarousel = true;

    if (this.isInfiniteCarousel) {
      window.actualHorizontal = 0;
    } else {
      window.actualHorizontal = this.horizontalIndex;
    }
    carouselHorizontalMovement();
  }

  keyDown(e: any, cardSize: number) {
    // 2vw from margin
    const cardRealSize = cardSize + 2;

    // Right arrow
    if (e.keyCode === 39) {
      // If not is infinite carousel and user is not on the last card
      if (!this.isInfiniteCarousel && this.horizontalIndex < this.container.length - 1) {
        this.horizontalIndex += 1;
        window.actualHorizontal = this.horizontalIndex;
        // Move the css and focus next card
        this.move.right = `${cardRealSize * this.horizontalIndex}vw`;
      }
      // If carousel is inifinite
      else if (this.isInfiniteCarousel) {
        // Get fisrt element and add it to last position (circular behaviour)
        const firstElement = this.container?.shift();
        // @ts-ignore: Object is possibly 'null'
        this.container?.push(firstElement);
      }
    }
    // Left arrow
    else if (e.keyCode === 37) {
      // If not is infinite carousel and user is not on the first card
      if (!this.isInfiniteCarousel && this.horizontalIndex > 0) {
        this.horizontalIndex -= 1;
        window.actualHorizontal = this.horizontalIndex;
        // Move the css and focus next card
        this.move.right = `${cardRealSize * this.horizontalIndex}vw`;
      }
      // If carousel is inifinite
      else if (this.isInfiniteCarousel) {
        // Get last element and add it to first position (circular behaviour)
        const lastElement = this.container?.pop();
        // @ts-ignore: Object is possibly 'null'
        this.container?.unshift(lastElement);
      }
    }
  }
}
