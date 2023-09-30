function isOperator(char) {
	const operator = ["+", "x", "-", "/"];
	return operator.includes(char);
}
function checkPrecedence(char) {
	switch (char) {
		case "+":
		case "-":
			return 1;
		case "x":
		case "/":
			return 2;
		default:
			return 0;
	}
}
function operation(operator, operand1, operand2) {
	switch (operator) {
		case "+":
			return parseFloat(operand2 + operand1);
		case "x":
			return parseFloat(operand2 * operand1);
		case "/":
			return parseFloat(operand2 / operand1);
		case "-":
			return parseFloat(operand2 - operand1);
	}
}
function evaluatePostFix(postFix) {
	const resultStack = [];
	for (let i = 0; i < postFix.length; i++) {
		const ele = postFix[i];

		if (!isNaN(parseFloat(ele))) {
			resultStack.push(ele);
		} else {
			const operand1 = parseFloat(resultStack.pop());
			const operand2 = parseFloat(resultStack.pop());

			const calculatedValue = operation(ele, operand1, operand2);
			resultStack.push(calculatedValue);
		}
	}
	if (resultStack.length > 1 || isNaN(resultStack[resultStack.length - 1])) {
		console.log(resultStack);
		console.error("check your expression");
		return null;
	}

	return resultStack.pop();
}

function convertToPostFix(expression) {
	let outputArray = [];
	let operatorArray = [];
	let number = "";
	for (let i = 0; i < expression.length; i++) {
		const char = expression[i];

		if (!isNaN(parseFloat(char)) || char === "." || (i === 0 && char === "-")) {
			number += char;
		} else if (number !== "") {
			console.log(number);
			outputArray.push(number.trim());
			number = "";
		}
		if (isOperator(char) && i !== 0) {
			while (
				operatorArray.length > 0 &&
				operatorArray[operatorArray - 1] !== "(" &&
				checkPrecedence(operatorArray[operatorArray.length - 1]) >=
					checkPrecedence(char)
			) {
				console.log(char);
				outputArray.push(operatorArray.pop());
			}
			console.log(char);
			operatorArray.push(char);
		} else if (char === "(") {
			operatorArray.push(char);
		}
		if (char === ")") {
			// even though we need not to check for the parenthesis as in project calc does not have a parenthesis option
			while (
				operatorArray.length > 0 &&
				operatorArray[operatorArray.length - 1] !== "("
			) {
				outputArray.push(operatorArray.pop());
			}
			operatorArray.pop();
		}
	}
	if (number !== "") {
		outputArray.push(number);
	}
	while (operatorArray.length > 0) {
		console.log(operatorArray);
		outputArray.push(operatorArray.pop());
	}
	console.log(outputArray);
	return outputArray;
}
export function calculator(expression) {
	const postFix = convertToPostFix(expression);
	const evaluatedValue = evaluatePostFix(postFix);
	return evaluatedValue % 1 === 0 ? evaluatedValue : evaluatedValue.toFixed(3);
}
