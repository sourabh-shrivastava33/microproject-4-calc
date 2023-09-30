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
		console.error("check your expression");
		return null;
	}

	return resultStack.pop();
}

function convertToPostFix(expression) {
	console.log(expression);
	let outputArray = [];
	let operatorArray = [];
	let number = "";
	for (let i = 0; i < expression.length; i++) {
		const char = expression[i];

		if (!isNaN(parseFloat(char)) || char === ".") {
			number += char;
		} else if (number !== "") {
			outputArray.push(number.trim());
			console.log(number);
			number = "";
		}
		if (isOperator(char)) {
			while (
				operatorArray.length > 0 &&
				operatorArray[operatorArray - 1] !== "(" &&
				checkPrecedence(operatorArray[operatorArray.length - 1]) >=
					checkPrecedence(char)
			) {
				outputArray.push(operatorArray.pop());
			}
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
		outputArray.push(operatorArray.pop());
	}
	return outputArray;
}
export function calculator(expression) {
	const postFix = convertToPostFix(expression);
	const evaluatedValue = evaluatePostFix(postFix);
	return evaluatedValue % 1 === 0 ? evaluatedValue : evaluatedValue.toFixed(3);
}
