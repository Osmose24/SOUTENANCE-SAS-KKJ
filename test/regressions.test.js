import test from 'node:test';
import assert from 'node:assert/strict';
import { verifierPlant } from '../src/registre.js';
import { modifierPlant } from '../src/bonus.js';
import { rechercherParNom } from '../src/recherche.js';

const PLANT = {
  id: 'N11',
  nomCommun: 'papayer',
  groupe: 'angiosperme',
  nombrePlants: 15,
  dateReleve: '2026-10-27',
};

test('verifierPlant accepte les espaces de milliers et refuse une date impossible', () => {
  assert.deepEqual(verifierPlant({ ...PLANT, nombrePlants: '1 000' }, []), []);
  assert.ok(verifierPlant({ ...PLANT, dateReleve: '2026-02-30' }, []).length > 0);
});

test('verifierPlant traite les champs absents et les doublons sans casse comme invalides', () => {
  assert.equal(verifierPlant({}, []).length, 5);
  assert.ok(verifierPlant({ ...PLANT, id: 'n11' }, [PLANT]).length > 0);
});

test('rechercherParNom accepte une recherche vide et un texte non sensible à la casse', () => {
  const plants = [{ nomCommun: 'palmier à huile' }, { nomCommun: 'Pin' }];
  assert.equal(rechercherParNom(plants, '').length, 2);
  assert.deepEqual(rechercherParNom(plants, 'PALM'), [plants[0]]);
});

test('modifierPlant valide les dates et convertit correctement une quantité avec séparateur français', () => {
  const plants = [{ ...PLANT }];
  assert.deepEqual(modifierPlant(plants, 'N11', 'nombrePlants', '1 000'), []);
  assert.equal(plants[0].nombrePlants, 1000);
  assert.ok(modifierPlant(plants, 'N11', 'dateReleve', '2026-02-30').length > 0);
  assert.equal(plants[0].dateReleve, '2026-10-27');
});
