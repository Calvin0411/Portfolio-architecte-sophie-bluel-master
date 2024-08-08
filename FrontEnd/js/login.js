// Fonction de connexion
function login() {
    
    let mailuser = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    
    let data = {
        email: mailuser,
        password: password,  
    };

    // Envoie la requête de connexion
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
    })
    .then((response) => {
       
        if (!response.ok) {
            // Affiche un message d'erreur si la réponse n'est pas correcte
            console.error('Erreur de connexion');
            
        } else {
            // Traite la réponse JSON
            return response.json();  // Nécessaire pour obtenir les données de l'utilisateur
        }
    })
    .then((dataUser) => {
        // Affiche les données de l'utilisateur et stocke le token
        console.log(dataUser);
        localStorage.setItem('token', dataUser.token);  // Sauvegarde le token dans le localStorage
        window.location.href = "../index.html";  // Redirige vers la page d'accueil après connexion
    })
    .catch((error) => {
        // Gère les erreurs de réseau ou de traitement
        console.error('Erreur:', error);
    });
}

// Ajoute un écouteur d'événements pour le formulaire de connexion
document.querySelector('#login form').addEventListener('submit', function (e) {
    e.preventDefault();  // Empêche le comportement par défaut du formulaire (rechargement de la page)
    login();  // Appelle la fonction de connexion
});
