const serviceList = document.querySelector('.service__list');

serviceList.addEventListener('click', (evt) => {
	let target = evt.target;
	if (target.tagName === 'BUTTON') {
		target.classList.toggle('service__button--increase');
		const description = target.closest('.service__item').querySelector('.service__description');
		description.classList.toggle('service__description--show');
	}
});