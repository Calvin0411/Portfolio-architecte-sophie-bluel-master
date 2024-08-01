//facilitant la gestion des erreurs

async function getWorks (){
    const url = "http://localhost:5678/api/works";
    try {
        const response = await fetch(url);
        const json = await response.json();
        // Affiche les données dans la confirmation de la transf
        console.log(json);
       
        for (let i = 0; i < json.length; i++) {
            setFigure(json[i]);
        }
    } catch (error) {
        console.error(error.message);
    }
}

getWorks();

// Fonction pour créer soit ajouter l'élément figure dans la galerie ansi que ça description
function setFigure(data) {
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
                      <figcaption>${data.title}</figcaption>`;          
    document.querySelector(".gallery").append(figure);
  }