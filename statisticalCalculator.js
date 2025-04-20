const prompt = require("prompt-sync")();

function getMenu() {
    console.log("--------> MENU CALCULADORA ESTATÍSTICA <---------");
    console.log("Digite [ 1 ] para adicionar uma lista de números");
    console.log("Digite [ 2 ] para calcular a média dos números");
    console.log("Digite [ 3 ] para calcular a mediana dos números");
    console.log("Digite [ 4 ] para calcular a moda");
    console.log("Digite [ 5 ] para SAIR");
}

let listNumbers = [];

function searchOption() {
    getMenu()

    let option = prompt("Digite a opção aqui: ");

    switch(option) {
        case '1':
            addNumbers()
            break;
        case '2':
            calculateAverage()
            break;
        case '3':
            calculateMedian()
            break;
        case '4':
            calculateMode()
            break;
        case '5':
            console.log("SAINDO...")
            displayListNumbers();
            break;
        default:
            throw new Error("Opção inválida! Só são aceitos 1, 2, 3, 4 ou 5.");
    }
}

function addNumbers() {
    let inputNumbers = prompt("Informe os números separado por vírgula: ");
    let list = inputNumbers.split(", ").map((num) => parseFloat(num.trim()));

    if(list.some((num) => isNaN(num))) {
        throw new Error("Os dígitos precisam ser números!")
    } else {
        listNumbers = listNumbers.concat(list);
    }
    searchOption();
}

function calculateAverage() { 
    let sum = 0;
    if(listNumbers.length > 0) {
        for (let i = 0; i < listNumbers.length; i++) {
            sum = sum + listNumbers[i];
        }
        console.log("MÉDIA: " + sum/listNumbers.length);
    } else {
        console.log("A lista ainda está vazia!");
    }
    searchOption();
}

function calculateMedian() {
    if(listNumbers.length > 0) {

        let orderList = listNumbers.sort((num1, num2) => num1 - num2);
        let even = orderList.length % 2 === 0;
        let middle = Math.floor(orderList.length / 2);
        let median = 0;

        if(even) {
            median = (orderList[middle - 1] + orderList[middle]) / 2; 
        } else {
            median = orderList[middle] / 2;
        }

        displayListNumbers();
        console.log("MEDIANA: ", median);

    } else {
        console.log("Impossível calcular a MEDIANA. A lista ainda está vazia!");
    }
    searchOption();
}

function calculateMode() {
    if(listNumbers.length > 0) {

        let count = {};

        listNumbers.forEach(num => {
            // Aqui não é um array
            count[num] = (count[num] || 0) + 1;
        });

        let maxCount = 0;
        let mode = [];

        for(let num in count) {
            if(count[num] > maxCount) {
                maxCount = count[num];
                mode = [num];
            } else if(count[num] === maxCount) {
                mode.push(num);
            }
        }

        mode = mode.map(Number);

        if(maxCount === 1) {
            console.log("Todos os elementos aparecem uma única vez!");
        } else {
            console.log("MODA: ", mode.join(" - "));
        }
    } else {
        console.log("Impossível calcular a MODA. A lista ainda está vazia!")
    }
    searchOption();
}

function displayListNumbers() {
    if(listNumbers.length > 0) {
        console.log("Lista completa: ", listNumbers.join(" - "));
    } else {
        console.log("A lista não possui elementos!");
    }
}

searchOption()
