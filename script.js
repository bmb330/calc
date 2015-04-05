window.onload = function () {
	var display = document.getElementById('displayTxt');
	var buttons = document.getElementsByTagName('button');
	var lastPress = '0';
	var numTotal = 0;
	var lastSign = '+';
	var lastTotal = 0;
	var mem = 0;
	var disVal = 0;

	for (var i = buttons.length - 1; i >= 0; i--) {
		buttons[i].addEventListener('click', perfAction, false);
	}


	function perfAction () {
		var symbol = this.getAttribute('value');

		switch (symbol) {
			case 'C':
				resetVars();
				break;
			case 'M+':
				addMem();
				break;
			case 'M-':
				subMem();
				break;
			case 'MRC':
				displayMem();
				break;
			case '/':
			case 'x':
			case '-':
			case '+':
			case '=':
				applySign(symbol);
				disVal = lastTotal;
				break;
			default:
				applyNumber(symbol);
		}
		displayValue(disVal);
	}

	function resetVars () {
		lastTotal = 0;
		lastPress = '0';
		lastSign = '+';
		numTotal = 0;
		disVal = 0;
	}

	function displayValue (n) {
		display.innerHTML=n;
	}

	function applyNumber (num) {
		if (!isNaN(lastPress)) {
			numTotal *= 10;
		}
		numTotal += +num;
		lastPress = num;
		disVal = numTotal;
	}

	function applySign (sign) {
		switch (lastSign) {
			case '+':
				addToTotal();
				break;
			case '-':
				subFromTotal();
				break;
			case 'x':
				mulWithTotal();
				break;
			case '/':
				divTotalBy();
				break;
			default:
				numTotal = 0;
		}

		lastPress = sign;
		lastSign = sign;
		disVal = lastTotal;
	}

	function addMem () {
		mem += disVal;
	}

	function subMem () {
		mem -= disVal;
	}

	function displayMem () {
		lastTotal = mem;
		disVal = mem;
	}

	function addToTotal () {
		lastTotal += numTotal;
		numTotal = 0;
	}

	function subFromTotal () {
		lastTotal -= numTotal;
		numTotal = 0;
	}

	function mulWithTotal () {
		lastTotal *= numTotal;
		numTotal = 0;
	}

	function divTotalBy () {
		lastTotal /= numTotal;
		numTotal = 0;
	}

};