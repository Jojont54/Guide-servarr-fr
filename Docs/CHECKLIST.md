# **LA CHECKLIST : Configuration**

[Lien vers la vidéo de OptiNAS pour la config](https://www.youtube.com/watch?v=gQ56YY4Y56o)

Cette vidéo explique tout.

## Création des dossiers

data
├── downloads
│     ├── torrents
│     └── cross-seed
└── library
	├── movies
﻿	└── series

## Ordre d’installation recommandé

**qBittorrent →**📥 Télécharger  
(optionnel) VPN → Gluetun ou une stack qBittorrent avec VPN intégré  
Redirection de port OBLIGATOIRE (Avec ou sans VPN)

**Prowlarr** → 🔎 Trouver  
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

## (Optionnel) Gestion automatique de la suppression

**Maintainerr →** 🧹 Optimiser  
Connexion à Plex ou Jellyfin, Sonarr, Radarr et Seerr  
→ Configuration des Rules (“ajoute dans la corbeille si”)

**Cleanupparr →** 🧹 Optimiser  
Connexion à Sonarr, Radarr, qBittorrent  
→ Configuration de Download Cleaner (supprimé le seed automatiquement si plus dans la bibliothèque)