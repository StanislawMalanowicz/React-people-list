const maleOrFemale = (pesel) => {
	let nrToStr = pesel + "";
	if(nrToStr[nrToStr.length -2] % 2 === 0){
		return "She's a Woman";
	}else{
		return "He's a Man";
	}

}