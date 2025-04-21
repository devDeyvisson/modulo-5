const prompt = require('prompt-sync')()

function getMenu() {
    console.log("---> MENU GERENCIAMENTO DE CONSULTAS <---");
    console.log("Digite [ 1 ] para adicionar uma nova consulta");
    console.log("Digite [ 2 ] para listar todas as consultas");
    console.log("Digite [ 3 ] para atualizar uma consulta");
    console.log("Digite [ 4 ] para cancelar uma consulta");
    console.log("Digite [ 5 ] para SAIR");
}

let listPatients = [];

function searchOption() {
    getMenu();
    let option = prompt("O que deseja fazer? Digite a opção aqui: ")

    switch (option) {
        case '1':
            addAppointment();
            break;
        case '2':
            listAllAppointment();
            searchOption();
            break;
        case '3':
            updateAppointment();
            break;
        case '4':
            cancelAppointment();
            break;
        case '5':
            console.log("SAINDO...")
            break;
        default:
            throw new Error("Opção inválida! Só são aceitos os valores: 1, 2, 3, 4 e 5.");
    }
}

function addAppointment() {
    let newAppointment = getAppointmentData();
    listPatients.push(newAppointment);
    searchOption();
}

function listAllAppointment() {
    if(listPatients.length > 0) {
        console.log("LISTA DE AGENDAMENTO ATUAL: ")
        listPatients.forEach((patient, index) => {
            console.log(`${index + 1}ª Consulta - [ ${patient.name}, Dr(a). ${patient.doctor}, Dia: ${patient.date}, Horário: ${patient.hour} ]`)
        });
    } else {
        console.log("Não é possível listar, pois nenhuma consulta foi agendada!")
    }
}

function updateAppointment() {
    if(listPatients.length > 0) {
        listAllAppointment();
        let appointmentNumber = parseInt(prompt("Digite o número da consulta que deseja atualizar (1, 2, 3...): ")) - 1;

        if(appointmentNumber >= 0 && appointmentNumber < listPatients.length) {
            console.log("Siga os passos posteriores para atualizar as informações da consulta:");
            let newAppointment = getAppointmentData();
            listPatients[appointmentNumber] = newAppointment;
        } else {
            console.log("O número da consulta é inválido!");
        }
    } else {
        console.log("Não é possível atualizar, pois nenhuma consulta foi agendada!");
    }

    searchOption();
}

function cancelAppointment() {
    if(listPatients.length > 0) {
        listAllAppointment();
        let appointmentNumber = parseInt(prompt("Digite o número da consulta que deseja cancelar (1, 2, 3...): ")) - 1;

        if(appointmentNumber >= 0 && appointmentNumber < listPatients.length) {
            console.log("Siga os passos posteriores para atualizar as informações da consulta:");
            listPatients.splice(appointmentNumber, 1);
        } else {
            console.log("O número da consulta é inválido!");
        }
    } else {
        console.log("Não é possível cancelar, pois nenhuma consulta foi agendada!");
    }

    searchOption();
}

function getAppointmentData() {
    let patientName = prompt("Informe o nome do(a) paciente: ");
    let doctorName = prompt("Informe o nome do(a) médico(a): ");
    let date = prompt("Informe a data da consulta (DD/MM/AAAA): ");
    let hour = prompt("Informe a hora da consulta (HH:MM): ");

    return {
        name: patientName,
        doctor: doctorName,
        date: date,
        hour: hour
    };
}

searchOption();