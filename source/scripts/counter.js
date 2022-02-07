const decreaseButton = document.querySelector('.control-button--decrease');
const increaseButton = document.querySelector('.control-button--increase');
const inputQuantity = document.querySelector('.form__input--quantity');
const inputHidden = document.querySelector('.form__input--hidden');
const costInt = document.querySelector('.form__cost-integer');
const costFloat = document.querySelector('.form__cost-float');
const price = (costInt.innerHTML + costFloat.innerHTML).substring(1);

const NUMBEROFUNITS = 1;

const changePrice = (quantity) => {
	const newPrice = (price * quantity).toFixed(2);
	const firstIndex = String(newPrice).indexOf('.');
	const lastIndex = firstIndex + 3;
	costInt.innerHTML = '$' + String(Math.trunc(newPrice));
	costFloat.innerHTML = String(newPrice).substring(firstIndex, lastIndex);
	inputHidden.value = newPrice;
}

decreaseButton.addEventListener('click', () => {
	if (inputQuantity.value > NUMBEROFUNITS) {
		inputQuantity.value--;
		changePrice(inputQuantity.value);
	}
});

increaseButton.addEventListener('click', () => {
	inputQuantity.value++;
	changePrice(inputQuantity.value);
});

inputQuantity.addEventListener('input', () => {
	changePrice(inputQuantity.value);
})