# **LA CHECKLIST : Configuration**

[Lien vers la vidéo de OptiNAS pour la config](https://www.youtube.com/watch?v=gQ56YY4Y56o)

Cette vidéo explique tout.

## Création des dossiers
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

## Ordre d’installation recommandé

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

## (Optionnel) Gestion automatique de la suppression et optimisation

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