/* ----------------------------------------------------- */
/* file: page-push-slider.js
/*
/* handle the dynamic logic of page push slider
/* ----------------------------------------------------- */


/* ------------------------------------------------------ */
/* DOM Elements
/* ------------------------------------------------------ */

const slides = document.querySelectorAll('.page-slide');
const slide_links = document.querySelectorAll("input[name='name-radio-page']");

/* ------------------------------------------------------ */
/* Variables
/* ------------------------------------------------------ */

// default Page Index if no one was setted
let defaultPageIndex = 0;

let currentIndex = 0;

// max slide links
let max_slide_links = slide_links.length;

/* ------------------------------------------------------ */
/* Functions
/* ------------------------------------------------------ */

  /* ------------------------------------------------------ */
  /* Fct.: Handle correct Page Push Slide by Index
  /* ------------------------------------------------------ */

  function goToSlide(newIndex) {

    /* ------------------------------------------------------ */
    /* Step 1 | Handle only New Cklick
    /* ------------------------------------------------------ */

    if (newIndex === currentIndex || newIndex < 0 || newIndex >= slides.length) return;

    /* ------------------------------------------------------ */
    /* Step 2 | Get Current & Next Page
    /* ------------------------------------------------------ */

    const current = slides[currentIndex];
    const next = slides[newIndex];

    /* ------------------------------------------------------ */
    /* Step 3 | Get Slide Direction 1=right,-1=left
    /* ------------------------------------------------------ */

    const direction = newIndex > currentIndex ? 1 : -1;

    /* ------------------------------------------------------ */
    /* Step 4 | Get Dyn. Start Transition Position
                for next Slide ( 100% = right / -100% = left )
    /* ------------------------------------------------------ */

    next.style.transition = 'none';
    next.style.transform = `translateX(${100 * direction}%)`;
    next.style.zIndex = 3;

    /* ------------------------------------------------------ */
    /* Step 5 | Fore Reflow ( Web-Browser )
                force Web-Browser to calculate
                the next Slide Element again to
                register the start transition
                why ?
                without that we lost / overwrite our
                start transition & in the end we dont get
                any transition
    /* ------------------------------------------------------ */

    void next.offsetWidth;

    /* ------------------------------------------------------ */
    /* Step 6 | Add new transition to current & next page
    /* ------------------------------------------------------ */

    current.style.transition = 'transform .5s ease';
    next.style.transition = 'transform .5s ease';

    /* ------------------------------------------------------ */
    /* Step 7 | Handle correct slide for current & next
                - current can slide 100% or -100%
                - next will only slide to 0, the showing page
    /* ------------------------------------------------------ */

    current.style.transform = `translateX(${-100 * direction}%)`;
    next.style.transform = 'translateX(0)';


    /* ------------------------------------------------------ */
    /* Step 8 | After Animation ( 500ms )
                we update new page css statements
    /* ------------------------------------------------------ */

    setTimeout(() => {

      current.classList.remove('active');

      // set css default all page containers
      current.style.transition = 'none';
      current.style.transform = 'translateX(100%)';
      current.style.zIndex = 1;

      // set css active next page container
      next.classList.add('active');
      next.style.zIndex = 2;

      currentIndex = newIndex;

    }, 500); // duration ms of animation
  }

/* ------------------------------------------------------ */
/* Set Default Page
/* > default page 1 if any radio was setted
/* ------------------------------------------------------ */

for( let i=0; i < max_slide_links; i++ ) {

  // console.log("Max_")

  if( slide_links[i].checked == true ) {

    // console.log("Radio = " + i + " true ")

    // update new default page index
    defaultPageIndex = i;

    // stop for-loop
    i = max_slide_links;

  }

  if( i == max_slide_links ) {

    goToSlide( defaultPageIndex );

  }

}

/* ------------------------------------------------------ */
/* Radio Change | Event Listeners
/* ------------------------------------------------------ */

for( let i=0; i < max_slide_links; i++ ) {

  slide_links[i].addEventListener( 'change', () => {

    /* ----------------------------------------------------- */
    /* Step 1: Get Clicked Link Index
    /* ----------------------------------------------------- */

    // console.log( " Slide Link = " + i + " clicked" )

    goToSlide( i );


  } )
}
