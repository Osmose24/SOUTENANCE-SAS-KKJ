# Journal de recherche

Ce journal récapitule les références du dépôt et les vérifications faites pendant la résolution. Il ne prétend pas consigner des recherches externes qui n'ont pas été réalisées.

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |
| --- | --- | --- | --- |
| Règles des champs, résultats attendus et dialogues à respecter | `SUJET.md` et `fiches/2-donnees-json.md` à `fiches/7-bonus.md` | Les valeurs sont validées avant mutation ; les erreurs de saisie doivent être visibles ; les tris ne doivent pas réordonner les données d'origine. | `src/registre.js`, `src/recherche.js`, `app.js`, tests |
| Conversion numérique et validation de date déjà fournies | `src/outils.js` et `test/outils.test.js` | `versNombre` accepte la virgule décimale et les espaces de milliers ; `estDateValide` vérifie le format et l'existence de la date. | Validation des ajouts et modifications dans `src/registre.js` |
| Résultats de référence et défauts présents | `test/*.test.js`, données du brief et `npm.cmd test` | Le lancement initial comptait 37 tests, dont 5 échecs du bonus ; l'appel `verifierOperation` était absent et deux fonctions bonus étaient encore des TODO. | Corrections de `src/bonus.js` et tests complémentaires |
| Exécution automatisée et interactions du terminal | Tests Node.js `node:test` existants ; lancement isolé de `node app.js` depuis les tests | Les tests d'intégration peuvent exercer la saisie complète sans modifier les données réelles du dépôt. | `test/app.test.js` |

Pour approfondir les API JavaScript, les références conseillées par le brief sont la documentation [MDN JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript) et la [documentation Node.js](https://nodejs.org/api/).