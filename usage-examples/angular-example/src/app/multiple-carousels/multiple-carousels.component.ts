import { Component, Input, OnInit } from '@angular/core';

declare const window: Window &
  typeof globalThis & {
    childrenBetweenLeft: any;
    actualVertical: any;
  };

@Component({
  selector: 'app-multiple-carousels',
  templateUrl: './multiple-carousels.component.html',
  styleUrls: ['./../app.component.scss']
})
export class MultipleCarouselsComponent implements OnInit {
  @Input() container!: string[];

  constructor() { }

  ngOnInit(): void {
  }

  keyDown(e: any) {
    // Left arrow
    if (e.keyCode === 37) {
      window.actualVertical = 3;
      window.childrenBetweenLeft = true;
    }
  }
}
