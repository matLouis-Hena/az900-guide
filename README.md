# AZ-900 Guide

AZ-900 Guide est une plateforme web de révision dédiée à la certification **Microsoft Azure Fundamentals AZ-900**.

Le projet a pour objectif de présenter les notions importantes d’Azure de manière plus accessible qu’un simple cours linéaire, avec des fiches de révision, des quiz, un examen blanc, un suivi de progression et des conseils de préparation.

Le projet est développé avec **React** et **Vite**, puis déployé sur **Azure App Service** via **GitHub**.

---

## Objectifs du projet

Ce projet a été réalisé dans le cadre d’un projet personnel autour du cloud et de Microsoft Azure.

Les objectifs principaux sont :

- comprendre les concepts fondamentaux d’Azure ;
- créer une application web interactive avec React ;
- organiser des données de formation sous forme de fichiers JSON ;
- proposer un système de quiz et d’examen blanc ;
- sauvegarder la progression utilisateur localement ;
- déployer une application web sur Azure ;
- automatiser le déploiement avec GitHub Actions.

---

## Fonctionnalités

### Fiches de révision

L’application propose des fiches de révision sur les principales notions de la certification AZ-900.

Fonctionnalités disponibles :

- recherche par mot-clé ;
- filtre par catégorie ;

---

### Quiz d’entraînement

Le mode entraînement permet de réviser les questions progressivement.

Il contient :

- questions mélangées ;
- correction immédiate ;
- explication après validation ;
- questions à choix unique ;
- questions à choix multiples ;
- filtres par module ;
- filtres par catégorie ;
- sauvegarde de la progression.

---

### Examen blanc

L’examen blanc simule une situation plus proche d’un vrai test.

Il contient :

- 50 questions ;
- limite de temps de 45 minutes ;
- score affiché uniquement à la fin ;
- résumé complet des réponses ;
- absence de correction immédiate pendant l’examen.

L’examen blanc est débloqué après un certain nombre de bonnes réponses en mode entraînement.

---

### Suivi de progression

Une page dédiée permet de suivre l’avancement de l’utilisateur.

Elle affiche notamment :

- la progression globale ;
- le nombre de notions consultées ;
- le nombre total de questions ;
- les bonnes réponses en entraînement ;
- le meilleur score obtenu à l’examen blanc ;
- des badges de progression ;
- des recommandations de révision.

---

### Conseils de préparation

Une page de conseils aide l’utilisateur à mieux se préparer à l’examen.

Elle reprend :

- les pièges fréquents ;
- les points importants à revoir ;
- une méthode de réponse pendant le test ;
- des conseils de préparation finale ;
- un objectif de score réaliste.

---

## Technologies utilisées

Le projet utilise les technologies suivantes :

- React
- Vite
- React Router
- JavaScript
- JSON
- HTML/CSS
- LocalStorage
- GitHub
- Azure App Service

---

## Structure du projet

```txt
src/
├── components/
│   ├── Navbar.jsx
│   └── footer.jsx
│
├── data/
│   ├── concepts.json
│   └── questions.json
│
├── pages/
│   ├── Home.jsx
│   ├── Concepts.jsx
│   ├── Quiz.jsx
│   ├── ExamTips.jsx
│   ├── Progress.jsx
│   └── About.jsx
│
├── App.jsx
├── main.jsx
└── index.css


