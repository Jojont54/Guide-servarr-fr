# Guide Servarr FR

Ce guide explique comment construire un serveur multimédia autour de la suite Arr :

- demander un film ou une série
- trouver la bonne release
- télécharger
- ranger automatiquement
- lire avec Plex ou Jellyfin
- nettoyer et optimiser ensuite

L’objectif n’est pas de tout configurer parfaitement dès le premier jour.
L’objectif est d’avoir un serveur qui fonctionne, de comprendre ce que chaque brique fait, puis d’améliorer progressivement.

## Le chemin recommandé

Si vous débutez, suivez les pages dans cet ordre :

1. [DÉMARRER : Le parcours pas à pas](Docs/DEMARRER.md)
2. [LES BASES : Docker, dossiers et réseau](Docs/BASES.md)
3. [LES APPS : Le rôle de chaque application](Docs/APPLICATIONS.md)
4. [VIDEO : Les bases pour choisir les bonnes releases](Docs/VIDEO.md)
5. [CHECKLIST : Vérifier que tout fonctionne](Docs/CHECKLIST.md)
6. [OPTIMISER : Profils, Custom Formats et règles](Docs/OPTIMISER.md)
7. [FAQ : Torrents, ratio et port forwarding](Docs/FAQ.md)

Annexe utile en cas de problème :

- [NOTIONS : Réseau et hardlinks en pratique](Docs/NOTIONS.md)

## Pour aller vite

La base d’un serveur Servarr propre :

- **qBittorrent** télécharge
- **Prowlarr** trouve les torrents
- **Radarr** gère les films
- **Sonarr** gère les séries
- **Plex ou Jellyfin** lit les médias
- **Jellyseerr / Overseerr / Seerr** permet aux utilisateurs de faire des demandes

Les outils comme Maintainerr, Cleanupparr, Cross-seed ou Profilarr sont utiles, mais ils viennent après.

## Avant de commencer

Il faut idéalement :

- une machine allumée souvent ou H24
- un disque avec assez d’espace
- Docker ou une interface qui gère les conteneurs
- un dossier commun pour les téléchargements et la bibliothèque
- un tracker/indexer configuré dans Prowlarr
- si vous utilisez des trackers privés : comprendre le ratio et le port forwarding

## Idée générale

```text
Utilisateur
   ↓ demande un film ou une série
Seerr / Jellyseerr / Overseerr
   ↓ envoie la demande
Radarr / Sonarr
   ↓ cherche via
Prowlarr
   ↓ envoie le torrent à
qBittorrent
   ↓ télécharge dans /data/downloads
Radarr / Sonarr
   ↓ range via hardlink dans /data/library
Plex / Jellyfin
   ↓ lit le fichier
Utilisateur
```

Si cette chaîne est claire, le reste du guide devient beaucoup plus simple.
