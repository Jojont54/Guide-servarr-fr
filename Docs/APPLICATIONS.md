# **LES APPS : A quoi elles servent**

![Servarr](../Images/Servarr.jpg)

**Overseerr / Jellyseerr (bientôt remplacé par Seerr)**  
Application utilisateur permettant de récolter les demandes d’ajout de films et de séries sur le serveur, avec validation, suivi de statut et intégration à Radarr et Sonarr.  
**Plex / Jellyfin**  
Serveur multimédia qui indexe les contenus téléchargés et permet leur lecture en streaming sur tous les appareils (TV, mobile, navigateur, etc.).  
**Radarr**  
Gestionnaire de films qui surveille les films demandés, interroge les indexeurs via Prowlarr, envoie les téléchargements à qBittorrent, puis organise automatiquement les fichiers une fois téléchargés. Utilise des Hardlinks pour que les fichiers soit lisible par Plex / Jellyfin  
**Sonarr**  
Gestionnaire de séries TV qui suit les épisodes et saisons, recherche automatiquement les nouvelles sorties, déclenche les téléchargements via Prowlarr et qBittorrent, puis classe les fichiers pour Plex/Jellyfin. (Identique a Radarr pour les séries TV)  
**Prowlarr**  
Moteur central d’indexeurs qui communique avec les trackers (publics ou privés) et fournit à Radarr, Sonarr et autres applications une source unifiée pour rechercher des torrents ou NZB.  
**qBittorrent**  
Client BitTorrent qui télécharge réellement les fichiers à partir des torrents fournis par Prowlarr et gère le seeding une fois le téléchargement terminé.  
**Maintainerr**  
Outil de gestion et de purge de la médiathèque qui analyse Plex/Jellyfin (contenus non vus, peu populaires, trop anciens, etc.) et peut demander à Sonarr/Radarr de supprimer certains médias.  
**Cleanupparr**  
Outil d’automatisation du nettoyage côté téléchargement qui supprime ou gère les torrents et fichiers devenus inutiles (seed trop long, échecs, doublons, orphelins) dans qBittorrent. Vérifie que les hardlinks existe dans la bibliothèque.  
**Cross-seed / QUI**  
Outils d’optimisation du seeding qui détectent des correspondances entre torrents (même contenu, hashes compatibles) pour ajouter automatiquement des torrents supplémentaires et maximiser le ratio sans re-télécharger sur d'autres tracker que celui d'origine (pas accepté par tout les trackers)

Autre outils intéressant à ajouter à la config :  

\- **Tautulli** \--\> pour les utilisateurs de Plex, un dashboard  
\- **Homarr** \--\> dashboard pour les utilisateurs du serveurs  
\- **Wizarr** \--\> pour les utilisateurs de Plex, simplifie les invitations
\- **Profilarr** \--\> gestion des profils qualité et Custom Formats de Sonarr/Radarr depuis une base GitHub, pour appliquer rapidement une configuration cohérente. Repo DB FR : https://github.com/Jojont54/Profilarr-database-french-regex

## **Configuration**

[Lien vers la vidéo de OptiNAS pour la config](https://www.youtube.com/watch?v=gQ56YY4Y56o)

Cette vidéo explique tout.

### Création des dossiers
```
data
├── downloads
│     ├── torrents
│     └── cross-seed
└── library
	├── movies
﻿	└── series
```
Il est conseillé d'installer toute les applications avec un accès a /data

### Ordre d’installation recommandé

Des outils permettent de simplifier l'installation comme l'interface graphique de TrueNAS, de Unraid, de Ultra.cc, sur un PC linux Dockstater et Saltbox

**qBittorrent →**📥 Télécharger  
(optionnel) VPN → Gluetun ou une stack qBittorrent avec VPN intégré  
Redirection de port OBLIGATOIRE (Avec ou sans VPN)

**Prowlarr →** 🔎 Trouver  
Liste des indexers (tracker)  
Configuration de la synchronisation au app Radarr/Sonarr/etc.

**Radarr et Sonarr →** 🧠 Organiser  
Page à configurer :   
Download clients  
→ ajouter qbittorent (adresse \+ port \+ user \+ password)  
General  
→ On retrouve l’apikey pour prowlarr, seerr, etc.  
Custom formats  
→ https://github.com/Pandaarr/arr-custom-formats

**Plex / Jellyfin →** 📺 Lire  
Configurer les bibliothèques

**Seerr →** 👤 Utiliser  
Au démarrage demande la configuration :   
Sonarr et Radarr et Plex ou Jellyfin

### (Optionnel) Gestion automatique de la suppression et optimisation

**Maintainerr →** 🧹 Supprimer  
Connexion à Plex ou Jellyfin, Sonarr, Radarr et Seerr  
→ Configuration des Rules (“ajoute dans la corbeille si”)

**Cleanupparr →** 🧹 Supprimer  
Connexion à Sonarr, Radarr, qBittorrent  
→ Configuration de Download Cleaner (supprimé le seed automatiquement si plus dans la bibliothèque)

**Cross-seed →** 🌱​ Optimiser  
Lors de la création du conteneur, un fichier config.js se créé dans appdata, il faut le modifier  
→ Configuration de Torznab
```
    torznab: [
        "http://prowlarr:9696/1/api?apikey=12345",
        "http://prowlarr:9696/2/api?apikey=12345",
    ],
```
→ Configuration de Sonarr / Radarr / qbittorent
```
    sonarr: ["http://sonarr:8989/?apikey=12345"],
    radarr: ["http://radarr:7878/?apikey=12345"],
    torrentClients: ["qbittorrent:http://user:pass@qbittorent:8080"],
```
→ Ensuite, pour éviter un ban sur les trackers, il vaut mieux ralentir la recherche
```
    rssCadence: "2 hours",
    searchCadence: "1 day",
    snatchTimeout: "30 seconds",
    searchTimeout: "2 minutes",
    searchLimit: 400,
```
