document.addEventListener("DOMContentLoaded", function() {// Attends le chargement de mon DOM
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const form = document.querySelector ("form");
    console.log(email, password,form );  
    const messageErreur = document.querySelector (".login p");
});

async function getUsers() {
    const url = "http://localhost:5678/api/users/login";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json); // Affiche les données dans la console pour confirmation
    } catch (error) {
        console.error('Erreur:', error.message);
    }
}

getUsers();

//fonction pour se connecter

async function login() {
    const users = await getUsers();
    console.log(users);
    form.addEventListener ("submit", (e) => {
        e.preventDefault();
        const userEmail = email.value;
        const userPwd = password.value;
        console.log(userEmail, userPwd);
        users.forEach ((user)=> {

            // vérification si bon user name mot de passe
            if (
                user.email == userEmail &&
                user.password == userPwd &&
                user.admin == true
            ) {
                window.sessionStorage.loged = true;
                window.location.href = "../index.html";
                console.log(connecté);
            } else {
                //non reconnu
                
            }
        })
    })
}

login();