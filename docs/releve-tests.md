# Relevé des tests

## Calculs de référence

Vérification manuelle des données de départ de `donnees/plants.json` :

- Stock total : 30 + 45 + 20 + 50 + 25 + 18 + 12 + 22 + 8 + 10 = **240 plants**.
- Angiospermes : **8 espèces**, total **222 plants**.
- Gymnospermes : **2 espèces**, total **18 plants**.
- Stocks faibles au seuil inclusif de 10 : **N09** (8 plants) et **N10** (10 plants).
- Espèce la plus abondante : **N04, tomate**, avec **50 plants**.

## Tests automatisés

Commande exécutée : `npm.cmd test` (Node.js 24.22.0). Résultat final : **45 tests réussis, 0 échec**. Les nouveaux tests du menu créent un dossier temporaire et n'écrivent pas dans les données réelles du projet.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Suite complète `npm.cmd test` | Tous les tests verts | 45 réussis, 0 échec | Exécution locale |
| Validation du registre | Quantité entière >= 0, champs obligatoires, date réelle et identifiant unique | Validé, y compris valeurs manquantes, date impossible et code dupliqué sans casse | Tests automatisés |
| Recherche et tri | Recherche sans casse ; copie triée sans altérer l'inventaire | Validé par tests unitaires | Tests automatisés |
| Synthèse de départ | 240 plants, 8/2 espèces par groupe, seuil inclusif | Résultats conformes aux calculs ci-dessus | Tests automatisés |
| Menu, ajout, modification, suppression | Dialogue complet et écritures JSON persistantes | Parcours exécutés sur copie temporaire ; données relues après opérations | Tests d'intégration |
| Fichier JSON illisible | Message explicite et démarrage vide | Vérifié avec JSON mal formé | Test d'intégration |
| Clone et lancement sur un autre poste | `node app.js` et `npm test` fonctionnels hors du poste de travail | oui exécuté dans cet environnement | vérifié |

