const prompt = require('prompt-sync')();

function getMenu() {
    console.log("---> MENU CALCULADORA <---");
    console.log("Digite [ + ] para Adição");
    console.log("Digite [ - ] para Subtração");
    console.log("Digite [ * ] para Multiplicação");
    console.log("Digite [ / ] para Divisão");
    console.log("Digite [ % ] para Porcentagem");
}

function searchOption() {
    let firstNumber = parseFloat(prompt("Digite o primeiro número: "));
    getMenu();
    let operation = prompt("Qual operação deseja realizar: ");
    let secondNumber = parseFloat(prompt("Digite o segundo número: "));
    let result = 0;

    validateNumbers(firstNumber, secondNumber);

    switch(operation) {
        case "+":
            result = calculateAddition(firstNumber, secondNumber);
            break;
        case "-":
            result = calculateSubtraction(firstNumber, secondNumber)
            break;
        case "*":
            result = calculateMultiplication(firstNumber, secondNumber)
            break;
        case "/":
            result = calculateDivision(firstNumber, secondNumber);
            break;
        case "%":
            result = calculatePercentage(firstNumber, secondNumber);
            break;
        default:
            throw new Error("A operação é inválida! Deve-se digitar (+, -, *, / ou %)")
    }

    if (operation === "%") {
        console.log(`Resultado: ${secondNumber} é ${result.toFixed(2)}% de ${firstNumber}`);
    } else {
        console.log(`Resultado: ${firstNumber} ${operation} ${secondNumber} = ${result}`);
    }
}

function validateNumbers(num1, num2) {
    if(isNaN(num1) || isNaN(num2)) {
        throw new Error("Só é possível realizar operações com números!")
    }
}

function calculateAddition(num1, num2) {
    return num1 + num2;
}

function calculateSubtraction(num1, num2) {
    return num1 - num2; 
}

function calculateMultiplication(num1, num2) {
    return num1 * num2;
}

function calculateDivision(num1, num2) {
    if(num2 === 0) {
        throw new Error("Não é possível realizar divisão por 0!")
    } else {
        return num1 / num2;
    }
}

function calculatePercentage(num1, num2) {
    if(num2 === 0) {
        throw new Error("Não é possível realizar divisão por 0!")
    } else {
        return (num2 / num1) * 100;
    }
}

searchOption()