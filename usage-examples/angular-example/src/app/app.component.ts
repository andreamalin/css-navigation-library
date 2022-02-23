import { Component } from '@angular/core';
// @ts-ignore
import { init } from "../assets/src/main.js";

declare const window: Window &
  typeof globalThis & {
    actualHorizontal: any;
  };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedItem = 0
  navigationOptions = ['Horizontal Example', 'Vertical Example', 'Grid Example', 'Children Between Example']

  colors = [
    ['#fbf8cc', '#fde4cf', '#ffcfd2', '#f1c0e8', '#cfbaf0', '#a3c4f3', '#90dbf4', '#8eecf5', '#98f5e1', '#b9fbc0'],
    ['#ede0d4', '#e6ccb2', '#ddb892', '#b08968', '#7f5539', '#9c6644'],
    ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#90e0ef', '#ade8f4', '#caf0f8'],
    ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff'],
    ['#7400b8', '#6930c3', '#5e60ce', '#5390d9', '#4ea8de', '#48bfe3', '#56cfe1', '#64dfdf', '#72efdd', '#80ffdb'],
  ]

  constructor() {
    init() // Initialize navigation library
  }

  selectNavigation(item: number) {
    console.log(item)
    this.selectedItem = item;
  }
  
  /**
   * Navigation
   */
  keyDown(e: any) {
    // Right arrow
    if (e.keyCode === 39) {
      window.actualHorizontal += 1;
    }
    // Left arrow
    else if (e.keyCode === 37) {
      window.actualHorizontal -= 1;
    }
  }
}
