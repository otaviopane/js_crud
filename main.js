'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Jorge",
    email: "jg@gmail.com",
    celular: "11223344556",
    cidade: "São Paulo",
}

// CRUD - create, read, update and delete

const createClient = (client) => {
    const db_client = JSON.parse(localStorage.getItem('db_client')) ?? [] // se a primeira parte não for valida, pega depois do ??
    db_client.push(client)
    localStorage.setItem("db_client", JSON.stringify(db_client))
}



// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)