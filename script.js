// Récupération des éléments de la page
const formulaire = document.getElementById("formulaire");
const champ = document.getElementById("champ");
const liste = document.getElementById("liste");
const compteur = document.getElementById("compteur");
const vide = document.getElementById("vide");

// Tableau de tâches : chaque tâche = { texte, faite }
let taches = JSON.parse(localStorage.getItem("taches")) || [];

// Sauvegarde dans le navigateur
function sauvegarder() {
  localStorage.setItem("taches", JSON.stringify(taches));
}

// Affiche toutes les tâches à l'écran
function afficher() {
  liste.innerHTML = "";

  taches.forEach((tache, index) => {
    const li = document.createElement("li");
    if (tache.faite) li.classList.add("faite");

    const texte = document.createElement("span");
    texte.textContent = tache.texte;
    texte.addEventListener("click", () => {
      taches[index].faite = !taches[index].faite;
      sauvegarder();
      afficher();
    });

    const bouton = document.createElement("button");
    bouton.textContent = "Supprimer";
    bouton.className = "supprimer";
    bouton.addEventListener("click", () => {
      taches.splice(index, 1);
      sauvegarder();
      afficher();
    });

    li.append(texte, bouton);
    liste.appendChild(li);
  });

  const restantes = taches.filter(t => !t.faite).length;
  compteur.textContent = restantes + " tâche(s) restante(s) sur " + taches.length;
  vide.classList.toggle("cache", taches.length > 0);
}

// Ajout d'une tâche quand on valide le formulaire
formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  const texte = champ.value.trim();
  if (texte === "") return;

  taches.push({ texte: texte, faite: false });
  champ.value = "";
  sauvegarder();
  afficher();
});

afficher();
