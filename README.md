# css-navigation-library
![npm version](https://badge.fury.io/js/survey-monkey-streams.svg) Navigation library for the lovers of css based on javascript😊
***
1. [ Example ](#example)
2. [ Usage ](#usage)
3. [ Angular Implementation ](#angular)
***
<a name="example"></a>
## Examples
### Horizontal Carousels
![ezgif com-gif-maker](https://user-images.githubusercontent.com/28350445/155257425-66306587-74ab-4012-8ded-33bc7ad8c0e7.gif)

### Vertical Carousels
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/28350445/155257444-aea99043-1a75-4f7f-a486-52ffa4be36fc.gif)

### Grid Carousels
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/28350445/155257453-b5d8020d-06b7-4df6-aec1-bcb8c1c113fa.gif)

### Multiple Carousels
![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/28350445/155257455-5c23c639-b91d-4279-994b-fe9df9b687e5.gif)

<a name="usage"></a>
## Usage
***
### Initialization
1. Add the src files in the project
2. Implement the `styles.scss` at the root of the app
3. Initialize the main somewhere at the root of the app
````javascript
import { init } from "../assets/src/main.js";
export class AppComponent {
  ...
  constructor() {
    init() // Initialize navigation library
  }
}
````
***
### Implementing carousels + focusable elements
‼️ All the focusable elements should have a `.focusable-element` class wrapped by a `.carousel-container` class

‼️ All the grid carousels should have a `.carousel-container-row` class by row and all the rows should be wrapped by a `.carousel-container` class

***
### Global variables usage
Global variable  | Usage | Type of | Initial value
------------- | ------------- | -------------| -------------
actualHorizontal  | Actual index on horizontal position  | Number | 0
actualVertical  | Actual index on vertical position | Number | 0
isInNormalCarousel  | Current carousel is horizontal or vertical | Boolean | true
isInGridCarousel  | Current carousel is a grid | Boolean | false
actualGridRow  | Actual index on grid row  | Number | 0
actualGridCell  | Actual index on row cell  | Number | 0
childrenBetweenUp  | Access a diferent carousel on way up | Boolean | false
childrenBetweenDown  | Access a diferent carousel on way down | Boolean | false
childrenBetweenLeft  | Access a diferent carousel on way left | Boolean | false
childrenBetweenRight  | Access a diferent carousel on way right | Boolean | false
goBack  | Go back key number | Number | 8


<a name="angular"></a>
## Angular Implementation
***
1. Use the `(focus)` event on html `.carousel-container` elements to set the needed values for the type of carousel
```html
   <div class="carousel-container" (focus)="setCarouselType()"></div>
```

```javascript
  /**
   * Navigation - .ts file
   */
  setCarouselType(): void {
    window.isInGridCarousel = true;
    window.isInNormalCarousel = false;
  }
```
2. Use the `(keydown)` event on html `.focusable-element` elements for horizontal movement for *normal carousels* and set the `[ngStyle]="move"`
- The key down listens to the current key and updates the css
- The keyDown function receives the cardWidth to do the exact movement of the carousel
- The move attribute gets the movement to the right of the carousel
```html
<div class="carousel-container">
    <div
      tabindex="0"
      class="focusable-element"
      (keydown)="keyDown($event, cardWidth)"
      [ngStyle]="move"
    >
      <div class="card" [style.backgroundColor]="color">
        <h1>{{color}}</h1>
      </div>
</div>
```
```javascript
  // Navigation
  move = {
    right: '',
  };
  
  keyDown(e: any, cardWidth: number) {
    const cardRealSize = cardWidth;

    // Right arrow
    if (e.keyCode === 39) {
      // If not is infinite carousel and user is not on the last card
      if (window.actualHorizontal < this.container.length - 1) {
        window.actualHorizontal += 1;
        // Move the css and focus next card
        this.move.right = `${cardWidth * window.actualHorizontal}vw`;
      }
    }
    // Left arrow
    else if (e.keyCode === 37) {
      // If not is infinite carousel and user is not on the first card
      if (!this.isInfiniteCarousel && window.actualHorizontal > 0) {
        window.actualHorizontal -= 1;
        // Move the css and focus next card
        this.move.right = `${cardWidth * window.actualHorizontal}vw`;
      }
    }
  }
```
3.  Use the `(keydown)` event on html `.focusable-element` elements for horizontal movement for *infinite carousels*
- The container is the list of elements that are rendered on the carousel
```html
<div class="carousel-container">
    <div
      tabindex="0"
      class="focusable-element"
      (keydown)="keyDown($event)"
    >
      <div class="card" [style.backgroundColor]="color">
        <h1>{{color}}</h1>
      </div>
</div>
```
```javascript
  keyDown(e: any) {
    // Right arrow
    if (e.keyCode === 39) {
      // Get first element and add it to last position (circular behaviour)
      const firstElement = this.container?.shift();
      this.container?.push(firstElement);
    }
    // Left arrow
    else if (e.keyCode === 37) {
      // Get last element and add it to first position (circular behaviour)
      const lastElement = this.container?.pop();
      this.container?.unshift(lastElement);
    }
  }
```

> © 2022, Andrea Amaya  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
