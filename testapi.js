let searchBtnTxt = document.getElementById("searchbar");        //input de la recherche 
let recipeCard = document.querySelector("#content");           //affichage des résultats sous forme de card

//stockage de la valeur ajoutée par l'user
const recipesearch = () => {
recipeInput = searchBtnTxt.value;
console.log(recipeInput)
}

//ajout d'un event pour l'envoi de recherche à l'API quand le bouton "Let's see" est appuyé
document.getElementById("searchbtn").addEventListener("click",() => {
console.log("button pressed")
sendAPIrequest()
})

 //envoi d'une requête à l'API via une fonction asyncrone
async function sendAPIrequest(){
    let APIid = "69b8e93b";
    let APIkey = "c9edfa40e90e0c811539bfcf66ebf85b"
    let responseAPI = await fetch(`https://api.edamam.com/search?app_id=${APIid}&app_key=${APIkey}&q=${recipeInput}`);
//extraction des données
    let data = await responseAPI.json()
    useAPIdata(data)
    console.log(data)
}

//fonction qui permet de manipuler les données 
function useAPIdata (data) {
    for (let i=0; i<data.hits.length; i++){
        recipeCard.innerHTML +=`
<div class="card" style="width: 18rem;">
  <img src="${data.hits[i].recipe.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.hits[i].recipe.label}</h5>
    <p class="card-text">Meal Type: ${data.hits[i].recipe.mealType}</p>
    <a href="${data.hits[i].recipe.url}" class="btn btn-primary">Recipe</a>
  </div>
</div>
`
    }
}
