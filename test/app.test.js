import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = fileURLToPath(new URL('../app.js', import.meta.url));
const DONNEES_DEPART = await readFile(new URL('./donnees-test.json', import.meta.url), 'utf8');

async function creerDossierTemporaire() {
  const dossier = await mkdtemp(join(tmpdir(), 'inventaire-pepiniere-'));
  await mkdir(join(dossier, 'donnees'));
  await writeFile(join(dossier, 'donnees', 'plants.json'), DONNEES_DEPART);
  return dossier;
}

function lancerApp(dossier, input) {
  const resultat = spawnSync(process.execPath, [APP], {
    cwd: dossier,
    input,
    encoding: 'utf8',
    timeout: 10000,
  });
  assert.equal(resultat.error, undefined, resultat.error?.message);
  assert.equal(resultat.status, 0, resultat.stderr);
  return resultat.stdout;
}

test('menu : recherche, tri décroissant, synthèse et choix inconnu', async () => {
  const dossier = await creerDossierTemporaire();
  try {
    const sortie = lancerApp(
      dossier,
      '3\n1\nn09\n3\n2\nPALM\n4\n2\n5\n9\n0\n',
    );
    assert.match(sortie, /10 espèce\(s\) chargée\(s\)/);
    assert.match(sortie, /N09 \| pin \| gymnosperme \| 8 plants/);
    assert.match(sortie, /1 espèce\(s\) dont le nom contient « palm »/);
    assert.match(sortie, /N04 \| tomate \| angiosperme \| 50 plants/);
    assert.match(sortie, /Stock total : 240 plants/);
    assert.match(sortie, /Groupe le plus fourni : angiosperme \(222 plants\)/);
    assert.match(sortie, /Choix inconnu : « 9 »/);
    assert.match(sortie, /Au revoir !/);
  } finally {
    await rm(dossier, { recursive: true, force: true });
  }
});

test('menu : ajoute, modifie et supprime en conservant les changements dans le JSON', async () => {
  const dossier = await creerDossierTemporaire();
  try {
    const sortie = lancerApp(
      dossier,
      '1\nn11\nPapayer\nAngiosperme\n1\n2026-10-27\n7\nn11\nnombrePlants\n5\n6\nn11\n0\n',
    );
    assert.match(sortie, /Plant N11 ajouté/);
    assert.match(sortie, /Plant N11 modifié/);
    assert.match(sortie, /Plant N11 supprimé/);
    assert.deepEqual(
      JSON.parse(await readFile(join(dossier, 'donnees', 'plants.json'), 'utf8')).map((plant) => plant.id),
      ['N01', 'N02', 'N03', 'N04', 'N05', 'N06', 'N07', 'N08', 'N09', 'N10'],
    );
  } finally {
    await rm(dossier, { recursive: true, force: true });
  }
});

test('menu : un fichier JSON illisible démarre avec un inventaire vide', async () => {
  const dossier = await mkdtemp(join(tmpdir(), 'inventaire-pepiniere-'));
  try {
    await mkdir(join(dossier, 'donnees'));
    await writeFile(join(dossier, 'donnees', 'plants.json'), '{');
    const sortie = lancerApp(dossier, '2\n0\n');
    assert.match(sortie, /Impossible de lire donnees\/plants\.json/);
    assert.match(sortie, /Inventaire \(0 espèce\(s\)/);
    assert.match(sortie, /Aucun plant enregistré\./);
  } finally {
    await rm(dossier, { recursive: true, force: true });
  }
});

test('menu : refuse une quantité décimale et une date impossible sans changer les données', async () => {
  const dossier = await creerDossierTemporaire();
  try {
    const sortie = lancerApp(
      dossier,
      '1\nN11\npapayer\nangiosperme\n2.5\n2026-02-30\n2\n0\n',
    );
    assert.match(sortie, /Ajout refusé/);
    assert.match(sortie, /Le nombre de plants doit être un nombre entier positif ou nul/);
    assert.match(sortie, /La date doit exister au format AAAA-MM-JJ/);
    assert.match(sortie, /Inventaire \(10 espèce\(s\)/);
    assert.equal(JSON.parse(await readFile(join(dossier, 'donnees', 'plants.json'), 'utf8')).length, 10);
  } finally {
    await rm(dossier, { recursive: true, force: true });
  }
});
