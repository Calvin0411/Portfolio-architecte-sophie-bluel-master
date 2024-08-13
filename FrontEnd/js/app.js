// Fonction pour vérifier la connexion de l'utilisateur
function checkUserLogin() {
    // Récupère le token du localStorage
    const token = localStorage.getItem('token');
    // Sélectionne la div "Mode Édition"
    const editModeDiv = document.querySelector('.banner-connexion');

    // Si le token est présent, affiche la div, sinon la cache
    if (token) {
        editModeDiv.classList.remove('hidden');
    } else {
        editModeDiv.classList.add('hidden');
    }
}

// Appelle la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', checkUserLogin);

// Code pour la galerie, filtre et login (ajoute ou garde ce qui est nécessaire pour ton application)

console.log("Hello Worlds");

async function getWorks() {
    const url = "http://localhost:5678/api/works";
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        worksData = json; // Stocke les données récupérées dans la variable worksData
        displayWorks(json);
    } catch (error) {
        console.error(error.message);
    }
}

getWorks();

let worksData = [];  // Variable pour stocker les données des travaux

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
        categoriesContainer.appendChild(displayfilters);  // Ajoute la div pour la catégorie
    });
}

function filterWorksByCategory(categoryId) {
    if (categoryId === "all") {  // si l'ID de la catégorie est "all", alors
        displayWorks(worksData);  // Affiche tous les travaux
    } else {
        const filteredWorks = worksData.filter(work => work.categoryId == categoryId);  // Filtre les travaux en fonction de l'ID 
        displayWorks(filteredWorks);  // Affiche les travaux filtrés
    }
}

filterWorksByCategory();

document.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();
    
    const logoutButton = document.querySelector('#logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

function checkUserLogin() {
    const token = localStorage.getItem('token');
    const editModeDiv = document.querySelector('.banner-connexion');

    if (token) {
        editModeDiv.classList.remove('hidden');
    } else {
        editModeDiv.classList.add('hidden');
    }
}

function logout() {
    localStorage.removeItem('token'); // Supprime le token
    window.location.href = '/FrontEnd/login.html'; // Redirige vers la page de connexion
}
