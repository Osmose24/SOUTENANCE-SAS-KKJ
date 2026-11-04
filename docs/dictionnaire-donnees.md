# Dictionnaire des données

Chaque objet de `donnees/plants.json` représente une espèce de l'inventaire et son nombre de plants disponibles.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique de la ligne | texte | obligatoire, unique sans tenir compte de la casse | — | `N09` |
| `nomCommun` | Nom commun de l'espèce | texte | obligatoire ; toute chaîne non vide est acceptée | — | `pin` |
| `groupe` | Groupe botanique attribué | texte | valeur exacte parmi les groupes autorisés | — | `gymnosperme` |
| `nombrePlants` | Quantité disponible pour cette espèce | nombre entier | entier positif ou nul | plants | `8` |
| `dateReleve` | Date du comptage | texte `AAAA-MM-JJ` | date calendaire réelle au format imposé | jour | `2026-10-24` |

**Listes de valeurs autorisées** : `angiosperme`, `gymnosperme`. Les quantités nulles sont acceptées ; les quantités négatives, décimales ou non numériques sont refusées.

**Provenance** : jeu de données fictif fourni dans `donnees/plants.json` et décrit dans `SUJET.md`. Le brief indique que les dix dates de départ sont le 24 octobre 2026 ; il ne fournit pas de fiche botanique, de relevés observés, de noms de compteurs ni de justificatifs individuels. Les groupes doivent être validés par le coach agronomie avant tout usage réel.
