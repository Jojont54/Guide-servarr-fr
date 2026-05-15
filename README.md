# Guide Servarr FR

Ce guide s’adresse aux personnes qui veulent monter un serveur multimédia automatisé avec Radarr, Sonarr, Prowlarr, qBittorrent et Plex/Jellyfin, sans devoir apprendre toute la stack d’un coup.

L’idée est simple : commencer par une base qui fonctionne, comprendre le rôle de chaque application, puis ajouter les optimisations seulement quand le serveur est stable.

Ce n’est pas une documentation exhaustive de chaque outil.
C’est un chemin de configuration pensé pour éviter les erreurs classiques : mauvais chemins Docker, imports cassés, absence de hardlinks, transcodage inutile, ratio qui ne monte pas ou torrents qui restent oubliés dans qBittorrent.

Le guide avance donc en deux temps :

- un parcours principal pour construire et améliorer le serveur
- des annexes pour comprendre les notions quand vous avez besoin de creuser

Au final, l’objectif est de construire un serveur capable de :

- installer la base
- connecter les services entre eux
- télécharger et ranger automatiquement
- lire avec Plex ou Jellyfin
- optimiser ensuite, quand ça fonctionne

L’objectif n’est pas de tout configurer parfaitement dès le premier jour.
L’objectif est d’avoir un serveur simple, compréhensible, puis de l’améliorer étape par étape.

![Schéma Servarr](Docs/assets/servarr-flow.jpg)

## Le parcours

1. [Démarrer pas à pas](Docs/01-demarrer.md)
2. [Optimiser cette bonne base](Docs/02-optimiser-base.md)
3. [Ajouter des applications](Docs/03-ajouter-applications.md)
4. [Optimiser les nouvelles applications](Docs/04-optimiser-applications.md)

## Annexes

1. [Docker, dossiers et réseau](Docs/annexe-1-docker-reseau.md)
2. [Vidéo : comprendre les releases](Docs/annexe-2-video.md)
3. [Torrents, ratio et VPN](Docs/annexe-3-torrents.md)

## Le principe en une minute

```text
Utilisateur
↓
Seerr / Jellyseerr / Overseerr
↓
Radarr / Sonarr
↓
Prowlarr
↓
qBittorrent
↓
Radarr / Sonarr range dans /data/library
↓
Plex / Jellyfin lit le fichier
```

Si cette chaîne est claire, le reste du guide devient beaucoup plus simple.
