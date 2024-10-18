disableInput("adressInput", true)
disableInput("districtInput", true)
disableInput("adressNumberInput", true)
disableInput("cityInput", true)
disableInput("stateInput", true)

clients = []

function addRow(client){
    let table = document.getElementById("clientsTable")
    let row = table.insertRow()
    row.insertCell().outerHTML = `<th>${client.id}</th>`
    row.insertCell().innerHTML = client.name + " " + client.surname
    row.insertCell().innerHTML = client.adress + ", " + client.adressNumber

    let cell = row.insertCell()
    cell.innerHTML = client.cep
    cell.className = 'd-none d-md-table-cell'

    cell = row.insertCell()
    cell.innerHTML = client.district
    cell.className = 'd-none d-md-table-cell'

    row.insertCell().innerHTML = client.city

    cell = row.insertCell()
    cell.innerHTML = client.state
    cell.className = 'd-none d-md-table-cell'

}

$("#cepInput").mask("99999-999");

function searchCep(){
    var cepInput = document.getElementById("cepInput")
    var cepValue = cepInput.value
    var cep = ""
    for(let i of cepValue){
        if(!isNaN(i)){
            cep += i
        }
    }
    
    if(cep.length < 8){
        messageError("CEP inválido")
        fillFormWithCep("")
        disableInput("adressNumberInput", true)
        cepInput.setCustomValidity("CEP inválido. Por favor, insira um CEP válido.")
        return
    }

    var url = `https://viacep.com.br/ws/${cep}/json/`

    $.getJSON(url, clientCep => {
        fillFormWithCep(clientCep)
        if(("erro" in clientCep)){
            disableInput("adressNumberInput", true)
            messageError("Não encontrado")
            cepInput.setCustomValidity("CEP inválido. Por favor, insira um CEP válido.")
        }
        else{
            disableInput("adressNumberInput", false)
            messageError("")
            cepInput.setCustomValidity("")
        }
    })
}

function fillFormWithCep(clientCep){
    document.getElementById("adressInput").value = clientCep.logradouro || ""
    document.getElementById("districtInput").value = clientCep.bairro || ""
    document.getElementById("cityInput").value = clientCep.localidade || ""
    document.getElementById("stateInput").value = clientCep.uf || ""
    document.getElementById("adressNumberInput").value = ""
}

function disableInput(input, state){
    document.getElementById(input).disabled = state
}

function messageError(message){
    if(error = true){
        document.getElementById("error").innerHTML = message
    }
}

function save(){
    let newClient = {
        id : clients.length + 1,
        name : document.getElementById("nameInput").value,
        surname : document.getElementById("surnameInput").value,
        adress : document.getElementById("adressInput").value,
        adressNumber : document.getElementById("adressNumberInput").value,
        cep : document.getElementById("cepInput").value,
        district : document.getElementById("districtInput").value,
        city : document.getElementById("cityInput").value,
        state : document.getElementById("stateInput").value
    }

    clients.push(newClient)
    addRow(newClient)
}