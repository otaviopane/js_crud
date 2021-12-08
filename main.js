'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields() // Limpa os campos
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [] // se a primeira parte não for valida, pega depois do ??

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))


// CRUD - create, read, update and delete

// CRUD - CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

// CRUD - READ
const readClient = () => getLocalStorage()

// CRUD - UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

// CRUD - DELETE
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}


const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}



// Interação com o Usuário

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field') // nome da classe dos campos do modal no html
    fields.forEach(field => field.value = '') // vai pegar cada campo e receber vazio
}


const saveClient = () => {
    if (isValidFields()) {
        const client = { // Controi o novo cliente
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        createClient(client) // Cria o novo cliente
        updateTable()
        closeModal() // Fecha o modal (janela)
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
    // adiciona o filho id da tabela tableClient e dentro dele tem a tag tbody
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

updateTable()

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
}

const editClient = (index) => {
    const client = readClient()[index]
    fillFields(client)
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        
        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            console.log
        }

    }
}

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)