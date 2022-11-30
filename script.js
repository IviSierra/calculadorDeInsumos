const INGREDIENTES_BASE= {
    asado: 0.5,
    morcilla: 1,
    chorizo: 1,
    queso: 0.5,
    salame: 0.5,
    papa: 1,
    cebolla: 1,
    lechuga: 0.5,
    bebida: 0.5
}


function getUnidad(ingrediente){
    if (ingrediente ==="asado"){
        return "Kg"
    }
    if (ingrediente ==="salame" || ingrediente === "queso"){
        return "g"
    }
    return "UN"
}

function getIngredientesTotales(adultos, ninos, veg, ingredientes) {
    const ingredientesFinales = {
        asado: ingredientes.asado * adultos + (ingredientes.asado / 2) * ninos,
        morcilla: ingredientes.morcilla * adultos,
        chorizo: ingredientes.chorizo * (adultos + ninos),
        queso: ingredientes.queso * (adultos + veg),
        salame: ingredientes.salame * adultos,
        papa: ingredientes.papa * (adultos + ninos + veg),
        cebolla: ingredientes.cebolla * (adultos + veg),
        lechuga: ingredientes.lechuga * (adultos + veg),
        bebida: ingredientes.bebida * (adultos + ninos + veg),
        ...(ninos > 0 ? { pan: ninos } : {}),
        ...(veg > 0 ? { seitan: veg } : {})
    };

    return ingredientesFinales;

}


function reset(){
    const resultados = document.getElementById("resultados");
    while (resultados.firstChild){
        resultados.removeChild(resultados.firstChild)
    }

}


function mostrarResultados(ingredientes,vegetarianos){
    reset()
    const listadoDeIngredientes = Object.entries(ingredientes);
    

    listadoDeIngredientes.forEach((ingrediente)=>{
        const [nombreIngrediente,cantidad] = ingrediente
        const resultados = document.getElementById("resultados");
        const p = document.createElement("p")
        p.innerHTML= `${nombreIngrediente}: ${cantidad} ${getUnidad(nombreIngrediente)}`
        resultados.appendChild(p)        
        
    })
    
    const listadoDeIngredientesVeg = Object.entries(vegetarianos);
    console.log(listadoDeIngredientesVeg)
    listadoDeIngredientesVeg.forEach((ingredienteVeg)=>{
        const [nombreIngrediente,cantidad] = ingredienteVeg
        const resultados = document.getElementById("resultados");
        const p = document.createElement("p")
        p.innerHTML= `${nombreIngrediente}: ${cantidad} ${getUnidad(nombreIngrediente)}`
        resultados.appendChild(p)    
    })   

}

function getIngredientesVegetarianos(vegetarianos){
    const listadoCheck = document.querySelectorAll(".check")
    let ingredientesVeg = {}

    listadoCheck.forEach((check)=>{
        if (check.checked){
            const ingrediente={
                [check.name]:vegetarianos,
            }
            ingredientesVeg = {
              ...ingredientesVeg,
              ...ingrediente
            }
        }

    });
    return ingredientesVeg;

}

$(function () {
    $("#boton").click(function (event) {
        event.preventDefault()
        const cantGente = Number(document.getElementById("comensales").value)
        const cantNinos = Number(document.getElementById("comensalesNinos").value)
        const cantVeg = Number(document.getElementById("vegi").value)
        const ingredientesFinales=getIngredientesTotales(cantGente,cantNinos,cantVeg,INGREDIENTES_BASE);
        const {asado,morcilla,chorizo,queso,salame,papa,cebolla,lechuga,bebida,pan,seitan}=ingredientesFinales;        
        const ingredientesVeg = getIngredientesVegetarianos(cantVeg);

        mostrarResultados(ingredientesFinales,ingredientesVeg);       

    });
});

