// Inventaire de la pépinière — point d'entrée de l'application.
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import {
  SEUIL_STOCK_FAIBLE,
  especeLaPlusAbondante,
  stocksFaibles,
  syntheseParGroupe,
  totalPlants,
} from './src/synthese.js';
import {
  groupeLePlusFourni,
  modifierPlant,
  supprimerPlant,
  trierParNombrePlantsDecroissant,
} from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/plants.json';

function afficherMenu() {
  console.log(`
--------------------- MENU ---------------------
1. Ajouter un plant
2. Lister l'inventaire
3. Rechercher (code, nom, groupe)
4. Trier (nombre de plants)
5. Synthèse des quantités
6. Supprimer un plant
7. Modifier un plant
0. Quitter`);
}

function afficherErreurs(erreurs) {
  for (const erreur of erreurs) {
    console.log(`  - ${erreur}`);
  }
}

async function ajouter(plants) {
  console.log('\n--- Ajouter un plant ---');
  const champs = [
    ['Code du plant (ex. N11) : ', 'id'],
    ['Nom commun (ex. papayer) : ', 'nomCommun'],
    [`Groupe botanique (${GROUPES.join(' ou ')}) : `, 'groupe'],
    ['Nombre de plants (entier) : ', 'nombrePlants'],
    ['Date du relevé (AAAA-MM-JJ) : ', 'dateReleve'],
  ];
  const saisie = {};

  for (const [question, champ] of champs) {
    const valeur = await demander(question);
    if (valeur === null) {
      return;
    }
    saisie[champ] = valeur;
  }

  saisie.id = saisie.id.toUpperCase();
  saisie.nomCommun = saisie.nomCommun.toLowerCase();
  saisie.groupe = saisie.groupe.toLowerCase();

  const erreurs = ajouterPlant(plants, saisie);
  if (erreurs.length > 0) {
    console.log('Ajout refusé :');
    afficherErreurs(erreurs);
    console.log(`L'inventaire compte toujours ${plants.length} espèce(s).`);
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, plants);
  console.log(`Plant ${saisie.id} ajouté. L'inventaire compte ${plants.length} espèce(s).`);
}

async function rechercher(plants) {
  console.log('\n--- Rechercher ---');
  console.log("1. Par code\n2. Par nom commun\n3. Les espèces d'un groupe botanique");
  const choix = await demander('Votre choix : ');
  if (choix === null) {
    return;
  }

  if (choix === '1') {
    const id = await demander('Code : ');
    if (id === null) {
      return;
    }
    const plant = trouverParId(plants, id.toUpperCase());
    console.log(plant ? formaterPlant(plant) : `Plant ${id.toUpperCase()} introuvable.`);
  } else if (choix === '2') {
    const texte = await demander('Nom ou partie du nom : ');
    if (texte === null) {
      return;
    }
    const resultat = rechercherParNom(plants, texte.toLowerCase());
    console.log(`${resultat.length} espèce(s) dont le nom contient « ${texte.toLowerCase()} » :`);
    console.log(listerPlants(resultat));
  } else if (choix === '3') {
    const groupe = await demander(`Groupe (${GROUPES.join(' ou ')}) : `);
    if (groupe === null) {
      return;
    }
    const groupeNormalise = groupe.toLowerCase();
    const resultat = filtrerParGroupe(plants, groupeNormalise);
    console.log(`${resultat.length} espèce(s) du groupe ${groupeNormalise} :`);
    console.log(listerPlants(resultat));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

async function trier(plants) {
  console.log('\n--- Trier ---');
  console.log('1. Par nombre de plants croissant\n2. Par nombre de plants décroissant');
  const choix = await demander('Votre choix : ');
  if (choix === null) {
    return;
  }

  if (choix === '1') {
    console.log(listerPlants(trierParNombrePlants(plants)));
  } else if (choix === '2') {
    console.log(listerPlants(trierParNombrePlantsDecroissant(plants)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

function afficherSynthese(plants) {
  const parGroupe = syntheseParGroupe(plants);
  const plusAbondante = especeLaPlusAbondante(plants);
  const faibles = stocksFaibles(plants, SEUIL_STOCK_FAIBLE);
  const groupeMax = groupeLePlusFourni(plants);

  console.log("\n--- Synthèse de l'inventaire ---");
  console.log(`Nombre d'espèces : ${plants.length}`);
  console.log(`Stock total : ${totalPlants(plants)} plants`);
  console.log('Par groupe botanique :');
  for (const [groupe, chiffres] of Object.entries(parGroupe)) {
    console.log(`  ${groupe} : ${chiffres.especes} espèce(s), ${chiffres.plants} plants`);
  }
  console.log(`Groupe le plus fourni : ${groupeMax ? `${groupeMax.groupe} (${groupeMax.plants} plants)` : 'aucune donnée'}`);
  console.log(
    plusAbondante
      ? `Espèce la plus abondante : ${formaterPlant(plusAbondante)}`
      : 'Espèce la plus abondante : aucune donnée',
  );
  console.log(`Stocks faibles (≤ ${SEUIL_STOCK_FAIBLE} plants) : ${faibles.length}`);
  if (faibles.length > 0) {
    console.log(listerPlants(faibles));
  }
  console.log(
    `Rappel : le seuil de ${SEUIL_STOCK_FAIBLE} plants est un repère pédagogique de suivi, pas une recommandation de production.`,
  );
}

async function supprimer(plants) {
  const saisieId = await demander('Identifiant : ');
  if (saisieId === null) {
    return;
  }
  const id = saisieId.toUpperCase();
  const retire = supprimerPlant(plants, id);
  if (!retire) {
    console.log(`Plant ${id} introuvable.`);
    return;
  }
  await enregistrerJson(FICHIER_DONNEES, plants);
  console.log(`Plant ${id} supprimé. L'inventaire compte ${plants.length} espèce(s).`);
}

async function modifier(plants) {
  const saisieId = await demander('Identifiant : ');
  if (saisieId === null) {
    return;
  }
  const id = saisieId.toUpperCase();
  const champ = await demander('Champ à modifier (nomCommun, groupe, nombrePlants, dateReleve) : ');
  if (champ === null) {
    return;
  }
  const valeur = await demander('Nouvelle valeur : ');
  if (valeur === null) {
    return;
  }

  const valeurNormalisee = champ === 'nomCommun' || champ === 'groupe'
    ? valeur.toLowerCase()
    : valeur;
  const erreurs = modifierPlant(plants, id, champ, valeurNormalisee);
  if (erreurs.length > 0) {
    console.log('Modification refusée :');
    afficherErreurs(erreurs);
    return;
  }
  await enregistrerJson(FICHIER_DONNEES, plants);
  console.log(`Plant ${id} modifié.`);
}

async function main() {
  ouvrirSaisie();
  let plants;

  try {
    console.log('==================================================');
    console.log('   INVENTAIRE DE LA PÉPINIÈRE');
    console.log('   Pépinière pédagogique');
    console.log('==================================================');
    try {
      plants = await chargerJson(FICHIER_DONNEES);
      if (!Array.isArray(plants)) {
        throw new TypeError('le fichier JSON ne contient pas un tableau');
      }
      console.log(`${plants.length} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
    } catch (erreur) {
      plants = [];
      console.log(
        `Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. L'inventaire démarre vide.`,
      );
    }

    let continuer = true;
    while (continuer) {
      afficherMenu();
      const choix = await demander('Votre choix : ');
      if (choix === null) {
        continuer = false;
        continue;
      }

      try {
        switch (choix) {
          case '0':
            console.log('Au revoir !');
            continuer = false;
            break;
          case '1':
            await ajouter(plants);
            break;
          case '2':
            console.log(`\n--- Inventaire (${plants.length} espèce(s)) ---`);
            console.log(listerPlants(plants));
            break;
          case '3':
            await rechercher(plants);
            break;
          case '4':
            await trier(plants);
            break;
          case '5':
            afficherSynthese(plants);
            break;
          case '6':
            await supprimer(plants);
            break;
          case '7':
            await modifier(plants);
            break;
          default:
            console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
        }
      } catch (erreur) {
        const message = erreur instanceof Error ? erreur.message : String(erreur);
        console.log(message.startsWith('TODO') ? `À compléter : ${message}` : `Erreur inattendue : ${message}`);
      }
    }
  } finally {
    fermerSaisie();
  }
}

main();