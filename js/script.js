disableInput("adressInput", true)
disableInput("districtInput", true)
disableInput("adressNumberInput", true)
disableInput("cityInput", true)
disableInput("stateInput", true)

clients = [ 
    {
        id : 1,
        name : 'Rodrigo',
        surname : "Kakiuchi",
        adress : "Rua Leite Penteado",
        adressNumber : 999,
        cep : "18010-050",
        district : "Centro",
        city : "Sorocaba",
        state : "SP"
    }
];

addRow(clients)

function addRow(clients){
    let table = document.getElementById("clientsTable")
    for(let client of clients){
        let row = table.insertRow()
        row.insertCell().outerHTML = `<th>${client.id}</th>`
        row.insertCell().innerHTML = client.name + " " + client.surname
        row.insertCell().innerHTML = client.adress + ", " + client.adressNumber
        row.insertCell().innerHTML = client.cep
        row.insertCell().innerHTML = client.district
        row.insertCell().innerHTML = client.city
        row.insertCell().innerHTML = client.state
    }
}

$("#cepInput").mask("99999-999");

function searchCep(){
    var cepInput = document.getElementById("cepInput").value
    var cep = ""
    for(let i of cepInput){
        if(!isNaN(i)){
            cep += i
        }
    }
    
    if(cep.length < 8){
        messageError("CEP inválido")
        return
    }

    var url = `https://viacep.com.br/ws/${cep}/json/`

    $.getJSON(url, clientCep => {
        if(("erro" in clientCep)){
            fillFormWithCep(clientCep)
            disableInput("adressNumberInput", true)
            messageError("Não encontrado")
        }
        else{
            fillFormWithCep(clientCep)
            disableInput("adressNumberInput", false)
            messageError("")
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