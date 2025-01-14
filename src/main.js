const wrapper =  document.querySelector('.scroll-3d');
const tapes = document.querySelectorAll('.collection-item');
const leftButton =  document.querySelector('.left-arrow');
const rightButton =  document.querySelector('.right-arrow');
console.log("tapes", tapes);

// get total tape amount
const tapeAmount = tapes.length;


currentTape = 0;
// shift function
function shift( index ) {
  const tapeSpaceLeft = 33.3333 / index+1;
  const tapeSpaceRight = 33.3333 / (tapeAmount - (index));
  tapes.forEach((tape, idx) => {
    
    // reposition the tapes, if index center, rotate, and zoom in
    if( idx === index ) {
      tape.style.left = `50%`;
      tape.style.zIndex = 100;
    } else if (idx < index) {
      const math = idx * tapeSpaceLeft;
      // left justify
      tape.style.left = `calc( ${ math }% - 300px )`;
      tape.style.zIndex = 1;
    } else if (idx > index) {
      const math = idx * tapeSpaceRight;
      console.log("right idx math: ", math, tapeSpaceRight);
      tape.style.left = `calc( ${ math + 66.6666 }%  )`;
      tape.style.zIndex = 1;
    }
    
  });
  
  
  // get the new item, rotate -90
  const rotateTape = tapes[ index ].querySelector('.cube');
  
  rotateTape.style.transform = `translateZ(200px) rotate3d(0,1,0,-90deg)`;
  
}

// init position
shift(currentTape);

// add the button events
leftButton.addEventListener("click", () => {
  if( currentTape > 0) {
    // rotate back to 0
    const rotateTape = tapes[ currentTape ].querySelector('.cube');
    rotateTape.style.transform = `translateZ(0px) rotate3d(0,1,0,0deg)`;
    
    currentTape--;
    shift( currentTape );
  }
});
rightButton.addEventListener("click", () => {
  
  if( currentTape < tapeAmount-1 ) {
    // rotate back to 0
    const rotateTape = tapes[ currentTape ].querySelector('.cube');
    rotateTape.style.transform = `translateZ(0px) rotate3d(0,1,0,0deg)`;
    
    currentTape++;
    shift( currentTape );
  }
});

// swiper detect for mobile
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  wrapper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0]; // Get the first touch
      startX = touch.clientX;     // Record the starting X position
      startY = touch.clientY;     // Record the starting Y position
  });

  wrapper.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Prevent scrolling during the swipe
  }, { passive: false });

  wrapper.addEventListener('touchend', (e) => {
      const touch = e.changedTouches[0]; // Get the ending touch
      distX = touch.clientX - startX;    // Calculate the X distance
      distY = touch.clientY - startY;    // Calculate the Y distance

      // Determine the swipe direction
      if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > 50) { // Horizontal swipe
          if (distX > 0) {
              if( currentTape > 0) {
                // rotate back to 0
                const rotateTape = tapes[ currentTape ].querySelector('.cube');
                rotateTape.style.transform = `translateZ(0px) rotate3d(0,1,0,0deg)`;

                currentTape--;
                shift( currentTape )
              }
              
          } else {
              if( currentTape < tapeAmount-1 ) {
                // rotate back to 0
                const rotateTape = tapes[ currentTape ].querySelector('.cube');
                rotateTape.style.transform = `translateZ(0px) rotate3d(0,1,0,0deg)`;

                currentTape++;
                shift( currentTape );
              }
              
              
          }
      }
  });
