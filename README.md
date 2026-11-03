# Inventaire de la pépinière

> Projet individuel du SAS DFS, brief 2 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte
L'outil est destiné au responsable d'une pépinière pédagogique ainsi qu'à son assistant afin de structurer et suivre un inventaire de plantes dont les données sont dispersées. Le programme répond au besoin de retrouver rapidement une espèce, connaître son groupe botanique ou consulter les quantités disponibles en temps réel. Lors de l'utilisation, l'utilisateur saisit au clavier des choix de menu, des informations sur les nouveaux plants comme le nom, le code ou le groupe, ainsi que l'origine du relevé. En retour, le programme affiche une interface textuelle claire comprenant le menu principal, l'état de chargement des données depuis un fichier JSON, les listes triées de l'inventaire et des synthèses globales des stocks. L'outil permet également de filtrer les recherches par groupe botanique ou par code pour faciliter le travail quotidien. En revanche, l'application ne gère pas la transmission automatique des identifications incertaines, qui doivent être signalées manuellement au coach.
## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
cd brief-2-inventaire-pepiniere
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [X] Données lues et enregistrées dans `donnees/plants.json`
- [X] Lister l'inventaire, message si l'inventaire est vide
- [X] Rechercher par code ou par nom ; filtrer par groupe botanique
- [X] Trier par nombre de plants
- [X] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
- [ ] Bonus : supprimer et modifier un plant (choix 6 et 7)
- [ ] Bonus : tri décroissant, groupe le plus fourni

## Données

✏️ *Le fichier, le nombre de lignes, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), l'unité. Rappelez qu'elles sont fictives et que les groupes sont fournis par le coach.*

## Limites

✏️ *Au moins trois. Par exemple : le seuil de 10 plants est un repère de suivi, pas une recommandation de production.*

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
