import { calculator } from "./calculator.js";
const outputField = document.querySelector(".output-field");
const resetButton = document.querySelector(".reset");
const deleteButton = document.querySelector(".delete");
const equal = document.querySelector(".equal");
const calc = document.querySelector("#calc-buttons");
function handleButtons(e) {
	if (
		e.target.tagName !== "BUTTON" ||
		e.target.className.split(" ").includes("equal") ||
		e.target.className.split(" ").includes("delete") ||
		e.target.className.split(" ").includes("reset")
	)
		return;
	let expression = outputField.value;
	expression += e.target.innerText;
	outputField.value = expression;
}
function handleDelete() {
	if (outputField.value.split("").length === 0) return;
	let expression = outputField.value.split("");
	expression.pop();
	// console.log(expression.join(""));
	outputField.value = expression.join("");
}
function handleReset() {
	if (outputField.value === "") return;
	outputField.value = "";
}
function handleEqual() {
	const expression = outputField.value;
	const ans = calculator(expression);
	if (ans === null) {
		outputField.value = "Error";
	} else {
		outputField.value = ans;
	}
}

calc.addEventListener("click", handleButtons);
deleteButton.addEventListener("click", handleDelete);
resetButton.addEventListener("click", handleReset);
equal.addEventListener("click", handleEqual);
