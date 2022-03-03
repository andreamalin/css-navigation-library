/**
 * Focus the next focusable element based on the actualHorizontal and actualVertical indexes
 */
const carouselHorizontalMovement = () => {
  const carouselCard = document?.querySelectorAll('.carousel-container')[window.actualVertical]?.querySelectorAll('.focusable-element')[
    window.actualHorizontal
  ];

  carouselCard.focus();
};

/**
 * Check the next focusable element on a grid carousel
 * 
 * actualGridRow indicates the current row of the carousel
 * actualGridCell indicates the current cell of the row
 * 
 * @param movement = down, up, left or right
 */
const carouselGridMovement = (movement = 'down | up | left | right') => {
  const carouselGridRows = document
    ?.querySelectorAll('.carousel-container')
    [window.actualVertical]?.querySelectorAll('.carousel-container-row');
  const actualRow = carouselGridRows[window.actualGridRow].childElementCount;

  if (movement === 'down' || movement === 'up') {
    try {
      // Getting quanity of childs on previous or next row
      let rowToFocus;
      if (movement === 'down') {
        rowToFocus = carouselGridRows[window.actualGridRow + 1].childElementCount - 1;
        if (!Number.isNaN(rowToFocus)) {
          window.actualGridRow += 1;
        }
      } else if (movement === 'up') {
        rowToFocus = carouselGridRows[window.actualGridRow - 1].childElementCount - 1;
        if (!Number.isNaN(rowToFocus)) {
          window.actualGridRow -= 1;
        }
      }

      if (actualRow - 1 === rowToFocus || window.actualGridCell === 0) {
        // Focusing on same position on next row
        carouselGridRows[window.actualGridRow].querySelectorAll('.focusable-element')[window.actualGridCell].focus();
      } else {
        try {
          // Calculating neareast aligned child
          const actualChildrenPos = Math.round((rowToFocus * window.actualGridCell + 1) / actualRow);

          carouselGridRows[window.actualGridRow].querySelectorAll('.focusable-element')[actualChildrenPos].focus();
          window.actualGridCell = actualChildrenPos;
        } catch (e2) {
          // Focusing first child
          carouselGridRows[window.actualGridRow].querySelectorAll('.focusable-element')[0].focus();
          window.actualGridCell = 0;
        }
      }
      // Vertical center of the focused row
      carouselVerticalCenterGrid();
    } catch (e) {
      // There is not a next row, check if there is another carousel
      focusNextCarousel(movement);
      // Check if there are any open dialogs
      closeCarousel();
    }
  } else if (movement === 'left' || movement === 'right') {
    try {
      let cellToFocus;
      // Getting next or previous cell
      if (movement === 'right') {
        cellToFocus = carouselGridRows[window.actualGridRow].querySelectorAll('.focusable-element')[window.actualGridCell + 1];
        cellToFocus.focus();
        window.actualGridCell += 1;
      } else if (movement === 'left') {
        cellToFocus = carouselGridRows[window.actualGridRow].querySelectorAll('.focusable-element')[window.actualGridCell - 1];
        cellToFocus.focus();
        window.actualGridCell -= 1;
      }
    } catch (e) {
      try {
        let rowToFocus;

        // Try getting previous or next row
        // Getting quanity of childs on previous or next row
        if (movement === 'right') {
          if (focusNextCarousel(movement)) {
            // Check if there are any open dialogs
            closeDialogs();
          } else {
            rowToFocus = carouselGridRows[window.actualGridRow + 1];
            if (rowToFocus) {
              window.actualGridRow += 1;
              // Focus first child of new row
              window.actualGridCell = 0;
            }
          }
        } else if (movement === 'left') {
          rowToFocus = carouselGridRows[window.actualGridRow - 1];
          if (rowToFocus) {
            window.actualGridRow -= 1;
            // Focus last child of new row
            window.actualGridCell = rowToFocus.childElementCount - 1;
          }
        }
        rowToFocus?.querySelectorAll('.focusable-element')[window.actualGridCell].focus();
      } catch (e2) {
        // There is not a previous or next row
      }
    }
  }
};

/**
 * If the user goes down or right, sum +1 to actualVertical index
 * If the user goes up or left, substract -1 to actualVertical index
 * 
 * Check the type of the carousel to focus
 * 
 * @param movement = down, up, left or right
 * @returns true if there is a next carousel, false if there is not a next carousel based on the movement
 */
const focusNextCarousel = (movement = 'down | up | left | right') => {
  const listOfCarousels = document?.querySelectorAll('.carousel-container');

  if (movement === 'down' || movement === 'right') {
    try {
      listOfCarousels[window.actualVertical + 1].focus();
      window.actualVertical += 1;
      checkTypeOfCarousel(listOfCarousels);
      carouselVerticalCenter();
      return true;
    } catch (e) {
      return false;
    }
  } else if (movement === 'up' || movement === 'left') {
    try {
      listOfCarousels[window.actualVertical - 1].focus();
      window.actualVertical -= 1;
      checkTypeOfCarousel(listOfCarousels);
      carouselVerticalCenter();
      return true;
    } catch (e) {
      return false;
    }
  }
};

/**
 * Check if the currently focused carousel is a grid or a normal carousel (vertical or horizontal)
 * @param listOfCarousels = List of carousels with the .carousel-container class
 */
const checkTypeOfCarousel = (listOfCarousels) => {
  // It is a grid carousel if there are rows on the carousel 
  if (listOfCarousels[window.actualVertical].querySelectorAll('.carousel-container-row')?.length > 0) {
    // Reset variables for grid carousel
    window.isInGridCarousel = true;
    window.isInNormalCarousel = false;

    window.actualHorizontal = 0;
    window.actualGridRow = 0;
    window.actualGridCell = 0;

    // Focus the element based on row and cell
    listOfCarousels[window.actualVertical]
      .querySelectorAll('.carousel-container-row')
      [window.actualGridRow].querySelectorAll('.focusable-element')
      [window.actualGridCell].focus();
  } // It is a normal carousel
  else {
    // Reset variables for normal carousel
    window.isInNormalCarousel = true;
    window.isInGridCarousel = false;

    window.actualGridRow = 0;
    window.actualGridCell = 0;
    window.actualHorizontal = 0;
    // Focus the current carousel
    carouselHorizontalMovement();
  }
};

/**
 * Vertical center the next carousel
 * If the element height is less than the body or the current vertical position is 0, mantain the scroll on 0
 * Else; do the vertical center
 */
const carouselVerticalCenter = () => {
  const carousel = document?.querySelectorAll('.carousel-container');

  let y =
    carousel[window.actualVertical].offsetTop -
    window.innerHeight / 2 +
    carousel[window.actualVertical].getBoundingClientRect().height / 2;
  y = Math.round(y);

  carousel[window.actualVertical].focus();

  if (y < 100 || window.actualVertical === 0 || (window.isInGridCarousel && window.actualGridCell === 0)) {
    document.getElementsByTagName('body')[0].scrollTop = 0;
  } else {
    document.getElementsByTagName('body')[0].scrollTop = y;
  }
};

/**
 * Vertical center the next row on grid carousels
 * If the element height is less than the body, mantain the scroll on 0
 * Else; do the vertical center
 */
const carouselVerticalCenterGrid = () => {
  const carousel = document
    ?.querySelectorAll('.carousel-container')
    [window.actualVertical]?.querySelectorAll('.carousel-container-row');

  let y =
    carousel[window.actualGridRow].offsetTop - window.innerHeight / 2 + carousel[window.actualGridRow].getBoundingClientRect().height / 2;
  y = Math.round(y);

  if (
    document?.querySelectorAll('.carousel-container')[window.actualVertical].clientHeight <
    document.getElementsByTagName('body')[0].clientHeight
  ) {
    document.getElementsByTagName('body')[0].scrollTop = 0;
  } else {
    document.getElementsByTagName('body')[0].scrollTop = y;
  }
};

/**
 * Click the focused element and focus the next element based on the window.actualVertical and window.actualHorizontal
 */
const carouselOK = () => {
  document.getElementsByTagName('body')[0].scrollTop = 0;

  // Stop double propagation on button elements
  if (document.activeElement.tagName !== 'BUTTON') {
    document.activeElement.click();
  }

  focusElement();
};

/**
 * If there is not any focus, focus the element based on the window.actualVertical and window.actualHorizontal
 */
const focusElement = () => {
  let firstFocusableElementCounter = 0;
  const firstFocusableElement = setInterval(() => {
    if (document.getElementsByTagName('body')[0] === document.activeElement) {
      carouselHorizontalMovement();
      clearInterval(firstFocusableElement);
    } else if (firstFocusableElementCounter === 5) {
      clearInterval(firstFocusableElement);
    }
    firstFocusableElementCounter += 1;
  }, 200);
};

/**
 * Close any closable carousel
 * @returns true if there is any closable carousel, false if there is not
 */
const closeCarousel = () => {
  if (document.querySelectorAll('.closable-carousel')[0]) {
    document.querySelectorAll('.closable-carousel')[0].click();
    return true;
  }
  return false;
};

export { carouselHorizontalMovement, carouselOK, carouselGridMovement, focusNextCarousel, focusElement, closeCarousel };
