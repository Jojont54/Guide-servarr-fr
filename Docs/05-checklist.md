# **Checklist : vérifier l'installation**

Cette page sert à valider votre installation.
Ne cherchez pas à tout optimiser tant que cette checklist n’est pas propre.

## 1. Dossiers

- qBittorrent voit `/data/downloads/torrents`
- Radarr voit `/data/library/movies`
- Sonarr voit `/data/library/series`
- Radarr, Sonarr et qBittorrent ont tous accès au même `/data`
- les fichiers importés ne doublent pas l’espace disque si les hardlinks fonctionnent

Test simple :

```text
/data/downloads/torrents
/data/library/movies
/data/library/series
```

Ces chemins doivent être cohérents dans les apps.

## 2. qBittorrent

- l’interface web est accessible
- le dossier de téléchargement est correct
- Radarr peut s’y connecter
- Sonarr peut s’y connecter
- le port d’écoute est ouvert si possible
- les torrents restent en seed après téléchargement

Sur tracker privé, vérifiez surtout le port forwarding et le ratio.

## 3. Prowlarr

- les indexers sont ajoutés
- les tests d’indexers sont verts
- Radarr est connecté dans les applications
- Sonarr est connecté dans les applications
- la synchronisation fonctionne

Test simple :

- lancez une recherche manuelle dans Prowlarr
- vérifiez qu’il trouve des résultats

## 4. Radarr

- le dossier racine est `/data/library/movies`
- qBittorrent est ajouté comme client de téléchargement
- Prowlarr est synchronisé
- un profil qualité existe
- un film test peut être recherché
- le film est importé automatiquement après téléchargement
- le fichier apparaît dans Plex/Jellyfin

Si le téléchargement finit mais que l’import ne marche pas, vérifiez d’abord les chemins.

## 5. Sonarr

- le dossier racine est `/data/library/series`
- qBittorrent est ajouté comme client de téléchargement
- Prowlarr est synchronisé
- un profil qualité existe
- une série test peut être recherchée
- un épisode est importé automatiquement
- la série apparaît dans Plex/Jellyfin

Pour les séries, vérifiez aussi la langue et les règles de release.

## 6. Plex ou Jellyfin

- la bibliothèque Films pointe vers `/data/library/movies`
- la bibliothèque Séries pointe vers `/data/library/series`
- l’analyse détecte les contenus
- les métadonnées remontent correctement
- la lecture fonctionne
- le plus possible est en Direct Play

Si tout transcode, regardez la page [Vidéo](04-video.md).

## 7. Seerr / Jellyseerr / Overseerr

- Plex ou Jellyfin est connecté
- Radarr est connecté
- Sonarr est connecté
- une demande de film arrive dans Radarr
- une demande de série arrive dans Sonarr
- l’utilisateur voit l’état de disponibilité

Quand cette étape fonctionne, les utilisateurs n’ont plus besoin d’accéder à Radarr/Sonarr.

## 8. Test complet

Le vrai test :

1. demandez un film depuis Seerr/Jellyseerr/Overseerr
2. vérifiez que Radarr reçoit la demande
3. vérifiez que Radarr trouve une release via Prowlarr
4. vérifiez que qBittorrent télécharge
5. vérifiez que Radarr importe le fichier
6. vérifiez que Plex/Jellyfin voit le film
7. lancez la lecture

Puis faites la même chose avec une série.

## 9. Optimisation

À faire seulement quand la base fonctionne :

- appliquer les profils qualité
- ajouter les Custom Formats
- configurer Profilarr ou les YAML manuellement
- ajouter Maintainerr
- ajouter Cleanupparr
- ajouter Cross-seed
- ajuster les règles de langue
- surveiller le transcodage

## Résultat attendu

Un serveur sain doit ressembler à ça :

```text
Demande
↓
Recherche automatique
↓
Téléchargement
↓
Import avec hardlink
↓
Lecture dans Plex/Jellyfin
↓
Seed conservé
```

Si cette chaîne fonctionne, le cœur du serveur est bon.
