let searchBtnTxt = document.querySelector("#searchbar");    
// let searchBtnTxt2 = document.querySelector("#searchbar2");
let recipeCard = document.querySelector("#content");          
// let cocktailCard = document.querySelector("#content2"); 
let recipeInput = ""
// let cocktailInput = "";


//EDADAM : RECUPERATION DE L'INPUT USER
const recipesearch = () => {
    recipeInput = searchBtnTxt.value;
    console.log(recipeInput)
//en cas de recherche vide
    if (searchBtnTxt.value == ""){
        alert("Hmmm ... Input field cannot be empty!")
    }else{
        sendAPIrequest(recipeInput)
    }
}

//COCKTAIL DB : RECUPERATION DE L'INPUT USER
// const cocktailsearch = () => {
//     cocktailInput = searchBtnTxt2.value;
//     console.log(cocktailInput)
// //en cas de recherche vide
//     if (searchBtnTxt2.value == ""){
//         alert("Hmmm ... Input field cannot be empty!")
//     }else{
//         sendAPIrequest(cocktailInput)
//     }
// }


//EDADAM : VALIDATION INPUT RECHERCHE VIA TOUCHE ENTREE
searchBtnTxt.addEventListener("keypress",(event) => { 
     if (event.key === "Enter"){
        recipesearch()
    }
     })

 //EDADAM + COCKTAIL DB : DECLARATION DE L'ENVOI REQUETE API
async function sendAPIrequest(){
    let APIid = "69b8e93b";
    let APIkey = "c9edfa40e90e0c811539bfcf66ebf85b"
    let edadamURL = `https://api.edamam.com/search?app_id=${APIid}&app_key=${APIkey}&q=${recipeInput}&to=20`
    // let cocktailURL= `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktailInput}`

//EDADAM : EXTRACTION DES DONNEES
    let responseAPIedadam = await fetch(edadamURL);
    let data = await responseAPIedadam.json()
    useAPIdata(data)

//COCKTAIL DB : EXTRACTION DES DONNEES
    // let responseAPIcocktail = await fetch(cocktailURL);
    // let data2 = await responseAPIcocktail.json()
    // useAPIdata(data2)
}

//EDADAM + COCKTAIL DB : MANIPULATION DES DONNEES
function useAPIdata (data) {
    for (let i=0; i<data.hits.length; i++){
        recipeCard.innerHTML +=`
<div class="card" style="width: 18rem;">
  <img src="${data.hits[i].recipe.image}" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${data.hits[i].recipe.label}</h5>
    <p class="card-text"> Meal Type: ${data.hits[i].recipe.mealType}</p>
    <a href="${data.hits[i].recipe.url}" class="btn btn-primary"  target="_blank">Get Recipe</a>
  </div>
</div>
`
    }

}

//EDADAM + COCKTAIL DB : SUPPRESSION DE LA DIV/CONTENT AVANT NOUVELLE RECHERCHE
const clearContent = () => {
    searchBtnTxt.value = ""
    recipeCard.innerHTML =""
}