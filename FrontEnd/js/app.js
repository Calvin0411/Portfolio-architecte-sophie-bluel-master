//facilitant la gestion des erreurs

async function getWorks (){
    const url = "http://localhost:5678/api/works";
    try {
        const response = await fetch(url);
        const json = await response.json();
        // Affiche les données dans la confirmation de la transf
        console.log(json);
       
        for (let i = 0; i < json.length; i++) {
            displayWorks(json[i]);
        }
    } catch (error) {
        console.error(error.message);
    }
}

getWorks();

// Fonction pour créer soit ajouter l'élément figure dans la galerie ansi que ça description
function displayWorks(data) {
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
                      <figcaption>${data.title}</figcaption>`;          
    document.querySelector(".gallery").append(figure);
  }

//récupération de mon tableau de catégories

  async function getCategories() {
    const url = "http://localhost:5678/api/categories";
    try {
        const response = await fetch (url);
        const json = await response.json ();
        console.log (json);
        
        for (let i = 0; i< json.length; i++){
            displayCategories(json[i]);
        }

    } catch (error) {
        console.error(error.message);
    }
  }

getCategories();

function displayCategories (data){
    const div = document.createElement("div");
    
    div.innerHTML = `${data.name}`;
    document.querySelector (".div-container").append(div)
    
}



function filterWorkByCategory(categoryId){

}

