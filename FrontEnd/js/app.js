//code pour la galerie, filtre et login

console.log("Hello Worlds")

async function getWorks (){
    const url = "http://localhost:5678/api/works";
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        worksData = json; // Stock les données récupérées dans la variable  worksData
        displayWorks(json);
        } catch (error) {
            console.error(error.message);
    }
}

getWorks();

let worksData = [];  // Variable  pour stocker les données des figures

// Fonction pour  ajouter les figure dans la galerie avec image et  description
function displayWorks(data) {
    const gallery = document.querySelector(".gallery");  
    gallery.innerHTML = "";  // Efface le contenu précédent de la galerie
    data.forEach(work => {  // Pour chaque travail dans les données fournies
        const figure = document.createElement("figure");  // Crée un nouvel élément figure
        figure.innerHTML = `<img src=${work.imageUrl} alt=${work.title}>
                            <figcaption>${work.title}</figcaption>`;  // Ajoute l'image et la légende au figure
        gallery.appendChild(figure);  // Ajoute la figure à la galerie
    });
}

//fonction pour récupérer  mon tableau de catégories et création de monn filtre

async function getCategories() {
    const url = "http://localhost:5678/api/categories"; 
    try {
        const response = await fetch(url);  
        const json = await response.json();  // Conversion en JSON
        console.log(json);  
        displayCategories(json);  // Passe l'ensemble des catégories à displayCategories
    } catch (error) {
        console.error(error.message);  
    }
}


getCategories();

//récupération et créations de mes boutons filtres

function displayCategories(data) {
    const categoriesContainer = document.querySelector(".categoriesContainer");  

    // Ajout du bouton tous
    const allButton = document.createElement("div");  // Crée une div pour le bouton 
    allButton.textContent = "Tous";  // nom du bouton
    allButton.dataset.id = "all";  // Ajoute attribut data-id avec la valeur "all" pour le bouton
    allButton.addEventListener("click", () => displayWorks(worksData));  // écouteur d'évènement
    categoriesContainer.appendChild(allButton);  // Ajoute le bouton tous

    // Ajout des boutons pour le filtre
    data.forEach(category => {  
        const displayfilters = document.createElement("div");  // Crée une div pour la catégorie filtre
        displayfilters.textContent = category.name;  // Définit le texte du div à la catégorie
        displayfilters.dataset.id = category.id;  // Ajoute un attribut data-id avec l'ID de la catégorie
        displayfilters.addEventListener("click", () => filterWorksByCategory(category.id));  // pour filtrer les travaux par cette catégorie au click 
        categoriesContainer.appendChild(displayfilters);  // Ajoute la div pour la catégories
    });
    
}

displayCategories();

function filterWorksByCategory(categoryId) {
    if (categoryId === "all") {  //  si l'ID de la catégorie est "all", alors
        displayWorks(worksData);  // Affiche tous les travaux
    } else {
        const filteredWorks = worksData.filter(work => work.categoryId == categoryId);  // Filtre les figure en fonction de l'ID 
        displayWorks(filteredWorks);  // Affiche les figures filtrés
    }
}

filterWorksByCategory();