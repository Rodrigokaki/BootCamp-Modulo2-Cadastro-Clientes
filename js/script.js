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