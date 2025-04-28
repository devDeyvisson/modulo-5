const prompt = require('prompt-sync')()

function getMenu() {
    console.log("---> MENU GERENCIAMENTO DE CONSULTAS <---");
    console.log("Digite [ 1 ] para adicionar uma nova consulta");
    console.log("Digite [ 2 ] para cadastrar o(a) médico(a)");
    console.log("Digite [ 3 ] para cadastrar um(a) paciente");
    console.log("Digite [ 4 ] para listar todas as consultas");
    console.log("Digite [ 5 ] para atualizar uma consulta");
    console.log("Digite [ 6 ] para cancelar uma consulta");
    console.log("Digite [ 7 ] para SAIR");
}

let listPatients = [];
let listDoctors = [];
let listAppointments = [];

function searchOption() {
    getMenu();
    let option = prompt("O que deseja fazer? Digite a opção aqui: ")

    switch (option) {
        case '1':
            addAppointment();
            break;
        case '2':
            registerDoctor();
            break;
        case '3':
            registerPatient();
            break;
        case '4':
            listAllAppointment();
            searchOption();
            break;
        case '5':
            updateAppointment();
            break;
        case '6':
            cancelAppointment();
            break;
        case '7':
            console.log("SAINDO...")
            break;
        default:
            throw new Error("Opção inválida! Só são aceitos os valores: 1, 2, 3, 4, 5, 6 e 7.");
    }
}

function addAppointment() {
    listAllPatients();
    listAllDoctors();
    let continueRegistration = prompt("O médico e o paciente que deseja cadastrar estão presentes na lista? (SIM ou NãO): ").toUpperCase();
    if(continueRegistration === 'SIM') {
        let newAppointment = getAppointmentData();
        listAppointments.push(newAppointment);
    } else if(continueRegistration === "NÃO"){
        console.log("Realize o cadastro do médico e do paciente antes de agendar a consulta!")
    } else {
        console.log("Resposta inválida! As respostas devem ser SIM ou NÃO!")
    }
    searchOption();
}

function registerDoctor() {
    let doctorName = prompt("Informe o nome do(a) médico(a): ");
    let areaActivity = prompt("Informe a especialidade do(a) médico(a): ");

    let newDoctor = {
        name: doctorName,
        area: areaActivity
    }

    listDoctors.push(newDoctor);
    searchOption();
}

function listAllDoctors() {
    if(listDoctors.length > 0) {
        listDoctors.forEach((doctor, index) => {
            console.log(`${index+1}º médico(a): ${doctor.name} - Especialidade: ${doctor.area}.`)
        })
    } else {
        console.log("Não há nenhum médico cadastrado! É necesário cadastrá-lo antes!");
    }
}

function registerPatient() {
    let patientName = prompt("Informe o nome do(a) paciente: ");
    let patientAge = prompt("Informe a idade do(a) paciente: ");

    let newPatient = {
        name: patientName,
        age: patientAge
    }

    listPatients.push(newPatient);
    searchOption();
}

function listAllPatients() {
    if(listPatients.length > 0) {
        listPatients.forEach((patient, index) => {
            console.log(`${index+1}º paciente: ${patient.name} - Idade: ${patient.age}.`)
        })
    } else {
        console.log("Não há nenhum paciente cadastrado! É necessário cadastrá-lo antes!");
    }
}

function listAllAppointment() {
    if(listAppointments.length > 0) {
        console.log("LISTA DE AGENDAMENTO ATUAL: ")
        listAppointments.forEach((appointment, index) => {
            console.log(`${index + 1}ª Consulta - [ ${appointment.patient.name}, Dr(a). ${appointment.doctor.name}, Dia: ${appointment.date}, Horário: ${appointment.hour} ]`)
        });
    } else {
        console.log("Não é possível listar, pois nenhuma consulta foi agendada!")
    }
}

function updateAppointment() {
    if(listAppointments.length > 0) {
        listAllAppointment();
        let appointmentNumber = parseInt(prompt("Digite o número da consulta que deseja atualizar (1, 2, 3...): ")) - 1;

        if(appointmentNumber >= 0 && appointmentNumber < listAppointments.length) {
            console.log("Siga os passos posteriores para atualizar as informações da consulta:");
            let newAppointment = getAppointmentData();
            listAppointments[appointmentNumber] = newAppointment;
        } else {
            console.log("O número da consulta é inválido!");
        }
    } else {
        console.log("Não é possível atualizar, pois nenhuma consulta foi agendada!");
    }

    searchOption();
}

function cancelAppointment() {
    if(listAppointments.length > 0) {
        listAllAppointment();
        let appointmentNumber = parseInt(prompt("Digite o número da consulta que deseja cancelar (1, 2, 3...): ")) - 1;

        if(appointmentNumber >= 0 && appointmentNumber < listAppointments.length) {
            console.log("Cancelando consulta...");
            listAppointments.splice(appointmentNumber, 1);
        } else {
            console.log("O número da consulta é inválido!");
        }
    } else {
        console.log("Não é possível cancelar, pois nenhuma consulta foi agendada!");
    }

    searchOption();
}

function getAppointmentData() {
    listAllPatients();
    listAllDoctors();

    let patientNumber = parseInt(prompt("Informe o número do(a) paciente: ")) - 1;
    let doctorNumber = parseInt(prompt("Informe o número do(a) médico(a): ")) - 1;
    let date = prompt("Informe a data da consulta (DD/MM/AAAA): ");
    let hour = prompt("Informe a hora da consulta (HH:MM): ");

    return {
        patient: listPatients[patientNumber],
        doctor: listDoctors[doctorNumber],
        date: date,
        hour: hour
    };
}

searchOption();