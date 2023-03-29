let searchBtnTxt = document.querySelector("#searchbar");        //input de la recherche 
let recipeCard = document.querySelector("#content");           //affichage des résultats sous forme de card
let recipeInput = "";

//RECUPERATION DE L'INPUT USER
const recipesearch = () => {
    recipeInput = searchBtnTxt.value;
    console.log(recipeInput)
//en cas de recherche vide
    if (searchBtnTxt.value == ""){
        alert("Hmmm ... Input field cannot be empty!")
    }else{
        sendAPIrequest(recipeInput)
        // searchBtnTxt.value = "";
    }
    }

//VALIDATION INPUT RECHERCHE VIA TOUCHE ENTREE
searchBtnTxt.addEventListener("keypress",(event) => { 
     if (event.key === "Enter"){
        recipesearch()
    }
     })

//SUPPRESSION DE LA RECHERCHE PRECEDENTE
// document.querySelector("#content").innerHTML = ""

 //DECLARATION DE L'ENVOI REQUETE API FOOD EDADAM
async function sendAPIrequest(recipeInput){
    let APIid = "69b8e93b";
    let APIkey = "c9edfa40e90e0c811539bfcf66ebf85b"
    let baseURL = `https://api.edamam.com/search?app_id=${APIid}&app_key=${APIkey}&q=${recipeInput}&to=20`
    let responseAPI = await fetch(baseURL);
//EXTRACTION DES DONNEES
    let data = await responseAPI.json()
    useAPIdata(data)
}

//MANIPULATION DES DONNEES
function useAPIdata (data) {
    for (let i=0; i<data.hits.length; i++){
        recipeCard.innerHTML +=`
<div class="card" style="width: 18rem;">
  <img src="${data.hits[i].recipe.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.hits[i].recipe.label}</h5>
    <p class="card-text">Meal Type: ${data.hits[i].recipe.mealType}</p>
    <a href="${data.hits[i].recipe.url}" class="btn btn-primary">Get Recipe</a>
  </div>
</div>
`
    }
}

//SUPPRESSION DE LA DIV/CONTENT APRES RECHERCHE
const clearContent = () => {
    searchBtnTxt.value = ""
    recipeCard.innerHTML =""
}