console.log("Hello Worlds");

// Code pour afficher la galerie, filtre et login;
//Affichagge de mes Works :

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

//fonction pour afficher les works dans la modal

function displayWorksInModale(data) {
    const gallery = document.querySelector(".WorksModals");
    gallery.innerHTML = "";
    
    data.forEach(work => {
        const div = document.createElement("div");
        div.classList.add("modal-work-item"); 

        div.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <i class="fa-solid fa-trash-can" id="${work.id}"></i>`;

        gallery.appendChild(div);

        // Ajoute un écouteur sur l'icône de poubelle
        const trashIcon = div.querySelector('i');
        trashIcon.addEventListener('click', async () => {
            await deleteWork(work.id);  // Appelle la fonction de suppression
            div.remove();  // Supprime l'élément du DOM
        });
    });
}

async function deleteWork(workId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`  
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la suppression.");
        }

        console.log(`Work with ID ${workId} has been deleted.`);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

document.getElementById('edit-button').addEventListener('click', () => {
    document.getElementById('modal-container').style.display = 'flex';
    displayWorksInModale(worksData);  // Appelle la fonction pour afficher les travaux
});



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

// Fonction pour vérifier la connexion de l'utilisateur
function checkUserLogin() {
    const token = localStorage.getItem('token');
    const editModeDiv = document.querySelector('.banner-connexion');
    const editButton = document.getElementById('edit-button');
    const authButton = document.getElementById('auth-button');

    if (token) {
        authButton.textContent = "logout";
        editModeDiv.classList.remove('hidden'); // Affiche la bannière "Mode édition"
        editButton.classList.remove('hidden'); // Affiche le bouton "Modifier"
    } else {
        authButton.textContent = "login";
        editModeDiv.classList.add('hidden'); // Cache la bannière
        editButton.classList.add('hidden'); // Cache le bouton "Modifier"
    }
}

// Fonction pour gérer la déconnexion
function logout() {
    localStorage.removeItem('token');  // Supprime le token
    checkUserLogin();  // Met à jour l'interface après déconnexion
    window.location.href = '/FrontEnd/index.html';  // Redirige vers la page d'accueil
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();

    const authButton = document.querySelector('#auth-button');
    const editButton = document.getElementById('edit-button');
    const modalContainer = document.getElementById('modal-container');
    const closeModal = document.getElementById('close-modal');
    const modalContent = document.querySelector('.modalworks');

    // Gestion du bouton de connexion/déconnexion
    authButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (localStorage.getItem('token')) {
            logout();
        } else {
            window.location.href = '/FrontEnd/login.html';
        }
    });

    editButton.addEventListener('click', () => {
        modalContainer.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    // Ferme la modale quand on clique en dehors de celle-ci
    window.addEventListener('click', (event) => {
        if (event.target == modalContainer) {
            modalContainer.style.display = 'none';
        }
    });
});


// Ajout nouveau travail dans la modale 

async function addWork(data) {
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",  
            headers: {
                "Content-Type": "application/json",  
                "Authorization": `Bearer ${localStorage.getItem('token')}`  
            },
            body: JSON.stringify(data)  // Convertit les données en chaîne JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de l'ajout.");
        }
        const responseData = await response.json();
        console.log('Succès:', responseData);
    } catch (error) {
        console.error('Erreur:', error);
    }
}
// Fonction pour afficher les détails dans la modal
async function addWork(data) {
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",  
            headers: {
                "Content-Type": "application/json",  
                "Authorization": `Bearer ${localStorage.getItem('token')}`  
            },
            body: JSON.stringify(data)  
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de l'ajout.");
        }
        const responseData = await response.json();
        console.log('Succès:', responseData);

        // Afficher la modal 
        showModal(responseData);

    } catch (error) {
        console.error('Erreur:', error);
    }
}

