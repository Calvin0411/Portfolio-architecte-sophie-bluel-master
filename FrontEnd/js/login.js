// Fonction de connexion
async function login() {
    
    let mailuser = document.querySelector('#email').value;
    let passworduser = document.querySelector('#password').value;
    let errorMessage = document.querySelector('.login');

    let data = {
        email: mailuser,
        password: passworduser,
    };

    // Envoie la requête de connexion
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
    })

    const dataUser = await response.json();

        if (!response.ok) {
            // Affiche un message d'erreur si la réponse n'est pas correcte
            errorMessage.textContent = dataUser.message || "Erreur: Email ou mot de passe incorrect.";
            errorMessage.style.color = "red"; // Change la couleur du texte pour le rendre visible
            throw new Error(dataUser.message || 'Erreur de connexion');
        } else {
            // Affiche les données de l'utilisateur et stocke le token
            localStorage.setItem('token', dataUser.token);  // Sauvegarde le token dans le localStorage
            window.location.href = "/FrontEnd/index.html";  // Redirige vers la page d'accueil après connexion
        }
    } catch (error) {
        // Gère les erreurs de réseau ou de traitement
        console.error('Erreur:', error);
    }
}

// Ajoute un écouteur d'événements pour le formulaire de connexion
document.querySelector('#login form').addEventListener('submit', function (e) {
    e.preventDefault();  // Empêche le comportement par défaut du formulaire (rechargement de la page)
    login();  // Appelle la fonction de connexion
});