//code pour la galerie, filtre et login

async function getWorks (){
    const url = "http://localhost:5678/api/works";
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        worksData = json; // Stocke les données récupérées dans la variable globale worksData
        displayWorks(json);
        } catch (error) {
            console.error(error.message);
    }
}

getWorks();

let worksData = [];  // Variable globale pour stocker les données des travaux

// Fonction pour créer soit ajouter l'élément figure dans la galerie ansi que ça description
function displayWorks(data) {
    const gallery = document.querySelector(".gallery");  // Sélectionne l'élément de la galerie dans le DOM
    gallery.innerHTML = "";  // Efface le contenu précédent de la galerie
    data.forEach(work => {  // Pour chaque travail dans les données fournies
        const figure = document.createElement("figure");  // Crée un nouvel élément figure
        figure.innerHTML = `<img src=${work.imageUrl} alt=${work.title}>
                            <figcaption>${work.title}</figcaption>`;  // Ajoute l'image et la légende au figure
        gallery.appendChild(figure);  // Ajoute la figure à la galerie
    });
}

//récupération de mon tableau de catégories

async function getCategories() {
    const url = "http://localhost:5678/api/categories";  // URL de l'API pour obtenir les catégories
    try {
        const response = await fetch(url);  // Effectue une requête fetch à l'API
        const json = await response.json();  // Convertit la réponse en JSON
        console.log(json);  // Affiche les données dans la console pour confirmation
        displayCategories(json);  // Passe l'ensemble des catégories à displayCategories
    } catch (error) {
        console.error(error.message);  // Affiche un message d'erreur en cas de problème
    }
}


getCategories();

function displayCategories(data) {
    const categoriesContainer = document.querySelector(".categoriesContainer");  // Sélectionne l'élément du conteneur des catégories dans le DOM

    // Ajout du bouton "Tous"
    const allButton = document.createElement("div");  // Crée un nouvel élément div pour le bouton "Tous"
    allButton.textContent = "Tous";  // Définit le texte du bouton à "Tous"
    allButton.dataset.id = "all";  // Ajoute un attribut data-id avec la valeur "all" pour le bouton
    allButton.addEventListener("click", () => displayWorks(worksData));  // Ajoute un événement de clic pour afficher tous les travaux
    categoriesContainer.appendChild(allButton);  // Ajoute le bouton "Tous" au conteneur des catégories

    // Ajout des boutons pour chaque catégorie
    data.forEach(category => {  // Pour chaque catégorie dans les données fournies
        const div = document.createElement("div");  // Crée un nouvel élément div pour la catégorie
        div.textContent = category.name;  // Définit le texte du div à la catégorie
        div.dataset.id = category.id;  // Ajoute un attribut data-id avec l'ID de la catégorie
        div.addEventListener("click", () => filterWorksByCategory(category.id));  // Ajoute un événement de clic pour filtrer les travaux par cette catégorie
        categoriesContainer.appendChild(div);  // Ajoute le div de la catégorie au conteneur des catégories
    });
}



function filterWorksByCategory(categoryId) {
    if (categoryId === "all") {  // Vérifie si l'ID de la catégorie est "all"
        displayWorks(worksData);  // Affiche tous les travaux
    } else {
        const filteredWorks = worksData.filter(work => work.categoryId == categoryId);  // Filtre les travaux en fonction de l'ID de la catégorie
        displayWorks(filteredWorks);  // Affiche les travaux filtrés
    }
}
