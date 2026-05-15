# Guide Servarr FR

Ce guide explique comment construire un serveur multimédia autour de la suite Arr, sans partir dans tous les sens :

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
