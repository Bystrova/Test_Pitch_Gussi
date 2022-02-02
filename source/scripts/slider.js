const nextButton = document.querySelector('.slider__button--next');
const prevButton = document.querySelector('.slider__button--prev');
const slides = document.querySelectorAll('.slider__item');
const firstSlide = slides[0];
const lastSlide = slides[slides.length - 1];

const slideChangeHandler = (evt) => {
	const currentSlide = document.querySelector('.slider__item--current');
	if (evt.target === nextButton) {
		if (currentSlide === lastSlide) {
			firstSlide.classList.add('slider__item--current');
		} else {
			currentSlide.nextElementSibling.classList.add('slider__item--current');
		}

	} else {
		if (currentSlide === firstSlide) {
			lastSlide.classList.add('slider__item--current');
		} else {
			currentSlide.previousElementSibling.classList.add('slider__item--current');
		}
	}
	currentSlide.classList.remove('slider__item--current');
};

nextButton.addEventListener('click', slideChangeHandler);
prevButton.addEventListener('click', slideChangeHandler);