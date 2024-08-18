// Fonction de connexion
async function login() {
    
    let mailuser = document.querySelector('#email').value;
    let passworduser = document.querySelector('#password').value;
    let errorMessage = document.querySelector('.login');

    let data = {
        email: mailuser,
        password: passworduser,
    };

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
        });

        const dataUser = await response.json();

        if (response.status === 401) {
            // Erreur 401: Identifiants incorrects
            errorMessage.textContent = "Erreur: Email ou mot de passe incorrect.";
            errorMessage.style.color = "red";
        } else if (response.status === 404) {
            // Erreur 404: Ressource non trouvée
            errorMessage.textContent = "Erreur: Identifiants non reconnus.";
            errorMessage.style.color = "red";
        } else if (!response.ok) {
            // Autres erreurs
            errorMessage.textContent = dataUser.message || "Erreur de connexion.";
            errorMessage.style.color = "red";
        } else {
            // Connexion réussie
            localStorage.setItem('token', dataUser.token);  // Sauvegarde le token dans le localStorage
            window.location.href = "/FrontEnd/index.html";  // Redirige vers la page d'accueil après connexion
        }
    } catch (error) {
        // Gère les erreurs de réseau ou de traitement
        console.error('Erreur:', error);
        errorMessage.textContent = "Erreur de réseau. Veuillez réessayer.";
        errorMessage.style.color = "red";
    }
}

// Ajoute un écouteur d'événements pour le formulaire de connexion
document.querySelector('#login form').addEventListener('submit', function (e) {
    e.preventDefault();  // Empêche le comportement par défaut du formulaire (rechargement de la page)
    login();  // Appelle la fonction de connexion
});




