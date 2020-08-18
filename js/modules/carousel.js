const d = document;

export default class Carousel {
  constructor(carouselClass) {
    this.container = d.querySelector(carouselClass);
    this.track = d.querySelector(carouselClass + " .carousel__track");
    this.slides = Array.from(this.track.children);
    this.nextButton = this.container.querySelector(".carousel__button--right");
    this.prevButton = this.container.querySelector(".carousel__button--left");
    this.dotsNav = this.container.querySelector(".carousel__nav");
    this.dotsIndicators = Array.from(this.dotsNav.children);
    // All slides have the same width
    this.slideWidth = this.slides[0].getBoundingClientRect().width;
    this.setSlidePosition();
  }

  // ---------------------
  setSlidePosition() {
    this.slides.forEach(
      (slide, index) => (slide.style.left = this.slideWidth * index + "px")
    );
  }

  // ---------------------
  moveToSlide(currentSlide, targetSlide) {
    this.track.style.transform = `translateX(-${targetSlide.style.left} )`;
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
  }

  // ---------------------
  updateDots(currentDot, targetDot) {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
  }

  // ---------------------
  addHideArrows(targetIndex) {
    targetIndex === 0
      ? this.prevButton.classList.add("is-hidden")
      : this.prevButton.classList.remove("is-hidden");

    targetIndex === this.slides.length - 1
      ? this.nextButton.classList.add("is-hidden")
      : this.nextButton.classList.remove("is-hidden");
  }

  // ---------------------
  addButtonsEvents() {
    d.addEventListener("click", (e) => {
      // Depends of the target will do:

      // Move sliders to the right, when I click right
      if (e.target.closest(".carousel__button--right") === this.nextButton) {
        const currentSlide = this.track.querySelector(".current-slide");
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = this.dotsNav.querySelector(".current-slide");
        const nextDot = currentDot.nextElementSibling;
        const nexIndex = this.slides.findIndex((slide) => slide == nextSlide);

        //move the next slide
        this.moveToSlide(currentSlide, nextSlide);
        this.updateDots(currentDot, nextDot);
        this.addHideArrows(nexIndex);
      }

      // Move sliders to the left, when I click left,
      if (e.target.closest(".carousel__button--left") === this.prevButton) {
        const currentSlide = this.track.querySelector(".current-slide");
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = this.dotsNav.querySelector(".current-slide");
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = this.slides.findIndex((slide) => slide == prevSlide);

        //move the previus slide
        this.moveToSlide(currentSlide, prevSlide);
        this.updateDots(currentDot, prevDot);
        this.addHideArrows(prevIndex);
      }

      // Move to that slide,  when I click a dot  indicator
      if (e.target.matches(".carousel__indicator")) {
        const targetDot = e.target;
        const currentSlide = this.track.querySelector(".current-slide");
        const currentDot = this.dotsNav.querySelector(".current-slide");
        const targetIndex = this.dotsIndicators.findIndex(
          (dot) => dot === targetDot
        );
        const targetSlide = this.slides[targetIndex];

        //move to the indicate slide
        this.moveToSlide(currentSlide, targetSlide);
        this.updateDots(currentDot, targetDot);
        this.addHideArrows(targetIndex);
      }
    });
  }
}
