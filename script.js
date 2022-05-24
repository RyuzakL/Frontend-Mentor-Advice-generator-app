'use strict';

const quote = document.querySelector('.app__quote');
const id = document.querySelector('.app__id')
const btn = document.querySelector('.app__btn');

const setQuoteAdvice = async function(qut, number) {
	setTimeout(() => {
		quote.textContent =  qut;
		id.textContent = number
	}, 200);
}

const fadePop = function() {
	const animationQuote = anime({
		targets: quote,
		opacity: 0,
		duration: 0
	})

	animationQuote.finished.then(anime({
		targets: quote ,
		opacity: 1,
		delay: 500
	}))
	
	const animationId = anime({
		targets: id,
		opacity: 0,
		duration: 0
	})

	animationId.finished.then(anime({
		targets: id ,
		opacity: 1,
		delay: 500
	}))
}

const getQuote = async function() {
	try{
		
		fadePop();
		
		const res = await fetch('https://api.adviceslip.com/advice');

		if(!res.ok) throw new Error(`Can't get the code, try later !`)

		const { slip : data } = await res.json();

		console.log(data)
		
		setQuoteAdvice(data.advice, data.id); 

		return data;

	}	catch(err) {
		console.error(`Something went wrong. ${err.message}`)
	}	
};

getQuote();

btn.addEventListener('click', getQuote);

