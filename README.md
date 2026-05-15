# Guide Servarr FR

Ce guide explique comment construire un serveur multimédia autour de la suite Arr, sans partir dans tous les sens :

- installer les bonnes applications
- connecter les services entre eux
- télécharger et ranger automatiquement
- lire avec Plex ou Jellyfin
- optimiser ensuite, quand la base fonctionne

L’objectif n’est pas de tout configurer parfaitement dès le premier jour.
L’objectif est d’avoir un serveur simple, compréhensible, puis de l’améliorer étape par étape.

![Schéma Servarr](Docs/assets/servarr-flow.jpg)

## Le chemin recommandé

Suivez les pages dans cet ordre :

1. [Démarrer pas à pas](Docs/01-demarrer.md)
2. [Bases : Docker, dossiers et réseau](Docs/02-bases.md)
3. [Applications : qui fait quoi ?](Docs/03-applications.md)
4. [Vidéo : comprendre les releases](Docs/04-video.md)
5. [Checklist : vérifier l'installation](Docs/05-checklist.md)
6. [Optimiser : profils, Custom Formats et règles](Docs/06-optimiser.md)
7. [FAQ torrents](Docs/07-faq-torrents.md)

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
