const modal = document.querySelector(".modal-container")
const tbody = document.querySelector("tbody")
const sDescricao = document.querySelector("#m-descricao")
const sTamanho = document.querySelector("#m-tamanho")
const sEstadoPeca = document.querySelector("#m-estado")
const btnSalvar = document.querySelector("#btn-salvar")

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem("dbpecas")) ?? []
const setItensBD = (itens) => localStorage.setItem("dbpecas", JSON.stringify(itens))

function loadItens(){
    itens = getItensBD()
    tbody.innerHTML = ""
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

loadItens()

function insertItem(item, index) {
    let tr = document.createElement("tr")

    tr.innerHTML = `
        <td>${item.descricao}</td>
        <td>${item.tamanho}</td>
        <td>${item.estado}</td>
        <td class="acao">
        <button onclick="editItem(${index})"><i class="fas fa-edit"></i></button>
        </td>
        <td class="acao">
        <button onclick="deleteItem(${index})"><i class="fas fa-trash"></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

function editItem(index){
    openModal(true, index)
}

function deleteItem(index){
    itens.splice(index, 1)
    setItensBD(itens)
    loadItens()
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
        }
    }

    if (edit) {
        sDescricao.value = itens[index].descricao
        sTamanho.value = itens[index].tamanho
        sEstadoPeca.value = itens[index].estado
        id = index
    } else {
        sDescricao.value = ''
        sTamanho.value = ''
        sEstadoPeca.value = ''
    }

}

btnSalvar.onclick = e => {

    if (sDescricao.value == '' || sTamanho.value == '' || sEstadoPeca.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].descricao = sDescricao.value
        itens[id].tamanho = sTamanho.value
        itens[id].estado = sEstadoPeca.value
    } else {
        itens.push({'descricao': sDescricao.value, 'tamanho': sTamanho.value, 'estado': sEstadoPeca.value})
    }

    setItensBD(itens)

    modal.classList.remove('active')
    loadItens()
    id = undefined
}