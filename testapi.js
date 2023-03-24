//stockage de la valeur ajoutée par l'utilisateur
const recipesearch = () => {
let searchBtnTxt = document.getElementById("searchbar").value;
console.log(searchBtnTxt)
}

//ajout d'un event pour l'envoi de recherche à l'API quand le bouton "Let's see" est appuyé
document.getElementById("searchbtn").addEventListener("click",() => {
console.log("button pressed")
sendAPIrequest()
})

//envoi d'une requête à l'API
async function sendAPIrequest(){
    let APIid = "69b8e93b";
    let APIkey = "c9edfa40e90e0c811539bfcf66ebf85b"
    let reponseAPI = await fetch(`https://api.edamam.com/search?app_id=${APIid}&app_key=${APIkey}&q=pizza`);
    console.log(reponseAPI)
}

