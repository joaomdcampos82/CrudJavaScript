
var listaCompra = [
    {"descricao":"cereja","quantidade":"1","valor":"5.40"},
    {"descricao":"chips","quantidade":"12","valor":"1.99"},
    {"descricao":"carne","quantidade":"1","valor":"15.00"}
];

function getTotal(listaCompra){
    var total = 0;
    for(var ini in listaCompra){
        total += listaCompra[ini].valor * listaCompra[ini].quantidade;
    }
    document.getElementById("totalValor").innerHTML = formatValor(total);
}

function setList( listaCompra ){
    var table = '<thead><tr><td>Descricao</td><td>Quantidade</td><td>Valor</td><td>Action</td></tr></thead><tbody>';
    for(var ini in listaCompra){
        table += '<tr><td>'+ formatDesc(listaCompra[ini].descricao) +'</td><td>'+ formatQuantidade(listaCompra[ini].quantidade) +'</td><td>'+ formatValor(listaCompra[ini].valor) +'</td><td><button class="btn btn-default" onclick="setUpdate('+ini+');" >Edit</button>  <button class="btn btn-default" onclick="deleteData('+ini+');" >Delete</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(listaCompra);
    saveListStorage(listaCompra);
}

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function  formatQuantidade(quantidade){
    return parseInt(quantidade);
}

function  formatValor(valor){
    var str = parseFloat(valor).toFixed(2) + "";
    str = str.replace(".",",");
    str = "$ " + str;
    return str;
}

function addAdicionar(){
    if(!validar()){
        return;
    }
    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;

    listaCompra.unshift({"descricao":descricao , "quantidade":quantidade ,"valor":valor });
    setList(listaCompra);
}

function setUpdate(id){
    var obj = listaCompra[id];
    document.getElementById("descricao").value = obj.descricao;
    document.getElementById("quantidade").value = obj.quantidade;
    document.getElementById("valor").value = obj.valor;
    document.getElementById("btnAtualizar").style.display = "inline-block";
    document.getElementById("btnAdicionar").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function resetForm(){
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("btnAtualizar").style.display = "none";
    document.getElementById("btnAdicionar").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData(){
    if(!validar()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;

    listaCompra[id] = {"descricao":descricao, "quantidade": quantidade, "valor":valor };
    resetForm();
    setList(listaCompra);
}

function deleteData(id){
    if(confirm("Deletar esse registro ?")){
        if(id === listaCompra.length - 1){
            listaCompra.pop();
        }else if(id === 0){
            listaCompra.shift();
        }else{
            var arrAuxIni = listaCompra.slice(0,id);
            var arrAuxEnd = listaCompra.slice(id + 1);
            listaCompra = arrAuxIni.concat(arrAuxEnd);
        }
        setList(listaCompra);
    }
}

function validar(){
    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";
    if(descricao === ""){
        errors += '<p>Informe a descricao</p>';
    }
    if(quantidade === ""){
        errors += '<p>Informe a quantidade</p>';
    }else if(quantidade != parseInt(quantidade)){
        errors += '<p>Quantidade tem que ser numerico</p>';
    }
    if(valor === ""){
        errors += '<p>Informe o valor</p>';
    }else if(valor != parseFloat(valor)){
        errors += '<p>Valor nao e valido</p>';
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById("errors").innerHTML = "<h3>Erro no Preenchimento dos Campos:</h3>" + errors;
        return 0;
    }else{
        return 1;
    }
}

function deletaList(){
    if(confirm("Apagar a lista de Compras?")){
        listaCompra = [];
        setList(listaCompra);
    }
}

function saveListStorage(listaCompra){
    var jsonStr = JSON.stringify(listaCompra);
    localStorage.setItem("listaCompra",jsonStr);
}

function initListStorage(){
    var testaList = localStorage.getItem("listaCompra");
    if(testaList){
        listaCompra = JSON.parse(testaList);
    }
    setList(listaCompra);
}


initListStorage();