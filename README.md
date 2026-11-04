# Inventaire de la pépinière

L'outil est destiné au responsable d'une pépinière pédagogique ainsi qu'à son assistant afin de structurer et suivre un inventaire de plantes dont les données sont dispersées. Le programme répond au besoin de retrouver rapidement une espèce, connaître son groupe botanique ou consulter les quantités disponibles en temps réel. Lors de l'utilisation, l'utilisateur saisit au clavier des choix de menu, des informations sur les nouveaux plants comme le nom, le code ou le groupe, ainsi que l'origine du relevé. En retour, le programme affiche une interface textuelle claire comprenant le menu principal, l'état de chargement des données depuis un fichier JSON, les listes triées de l'inventaire et des synthèses globales des stocks. L'outil permet également de filtrer les recherches par groupe botanique ou par code pour faciliter le travail quotidien. En revanche, l'application ne gère pas la transmission automatique des identifications incertaines, qui doivent être signalées manuellement au coach.


## Prérequis et lancement

- Node.js 20 ou plus récent ; aucune dépendance externe à installer.

```bash
npm start
npm test
```

Sous PowerShell, utilisez `npm.cmd` si la politique d'exécution bloque `npm`.

## Fonctionnalités

<<<<<<< HEAD
- [x] Charger et enregistrer les données JSON dans `donnees/plants.json`
- [x] Ajouter, lister, rechercher par code, nom ou groupe
- [x] Trier par quantité croissante ou décroissante sans changer l'ordre enregistré
- [x] Afficher les totaux, la synthèse par groupe, les stocks faibles et l'espèce la plus abondante
- [x] Supprimer et modifier un plant, avec validation des saisies
- [x] Enregistrer chaque ajout, modification ou suppression réussie
- [x] Démarrer avec un inventaire vide et afficher l'erreur si le fichier de données ne peut pas être lu
=======
✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [X] Données lues et enregistrées dans `donnees/plants.json`
- [X] Lister l'inventaire, message si l'inventaire est vide
- [X] Rechercher par code ou par nom ; filtrer par groupe botanique
- [X] Trier par nombre de plants
- [X] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
>>>>>>> 412a942a5cb740871099e353927c68a5a3e3046f

## Données

`donnees/plants.json` contient dix lignes fictives : un identifiant unique, un nom commun, un groupe (`angiosperme` ou `gymnosperme`), une quantité entière positive ou nulle et la date du relevé. Une ligne représente une espèce et son nombre de plants ; elle ne décrit pas l'origine détaillée ni la méthode de comptage.

Les valeurs de départ totalisent 240 plants : 222 angiospermes (8 espèces) et 18 gymnospermes (2 espèces). Le seuil de 10 plants est un repère pédagogique de suivi, pas une recommandation de production.

## Limites

1- Le fichier JSON est local : il n'y a ni comptes utilisateurs, ni sauvegarde distante, ni gestion des modifications concurrentes.
2-  Les données de départ sont fictives et ne comportent pas les justificatifs d'identification, la personne ayant compté, ni les sources/photos des observations.
3- Les groupes ne sont pas recalculés par le programme : ils doivent être fournis et validés à partir de la fiche botanique du coach.
4-  Le seuil de stock faible signale une quantité à examiner ; il ne constitue pas une consigne de production.
5- La saisie au clavier est prévue pour un terminal interactif.

## Documents du projet

- [Brief et règles](SUJET.md)
- [Dictionnaire des données](docs/dictionnaire-donnees.md)
- [Tableau des tâches](docs/taches.md)
- [Relevé des tests](docs/releve-tests.md)
- [Journal de recherche](docs/journal-recherche.md)
- [Fiche agronomique](docs/fiche-agronomique.md)
- [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

KOUAKOU JANVIER KOUAKOU, Osmose24, 
