# **LES APPS : Le rôle de chaque application**

Un serveur Servarr n’est pas une seule application.
C’est une chaîne.

Chaque app a un rôle précis.
Quand on comprend le chemin d’un film ou d’une série, les réglages deviennent beaucoup plus logiques.

![Servarr](../Images/Servarr.jpg)

## Le chemin d’un média

```text
Demande utilisateur
↓
Seerr / Jellyseerr / Overseerr
↓
Radarr ou Sonarr
↓
Prowlarr
↓
qBittorrent
↓
Radarr ou Sonarr
↓
Plex ou Jellyfin
```

Exemple concret :

1. Un utilisateur demande un film.
2. Seerr envoie la demande à Radarr.
3. Radarr cherche une release via Prowlarr.
4. Prowlarr interroge les trackers.
5. Radarr choisit une release et l’envoie à qBittorrent.
6. qBittorrent télécharge dans `/data/downloads`.
7. Radarr importe le fichier dans `/data/library/movies`.
8. Plex/Jellyfin détecte le film et le rend disponible.

Pour les séries, c’est la même logique avec Sonarr.

## Les applications indispensables

### qBittorrent : télécharger

qBittorrent est le client BitTorrent.
Il reçoit les torrents envoyés par Radarr/Sonarr, télécharge les fichiers et continue à seed.

À retenir :

- il doit télécharger dans `/data/downloads/torrents`
- il doit être accessible par Radarr et Sonarr
- sur tracker privé, le port forwarding est très important

### Prowlarr : trouver

Prowlarr centralise les indexers/trackers.
Au lieu de configurer les trackers séparément dans Radarr et Sonarr, on les configure dans Prowlarr.

À retenir :

- Prowlarr ne télécharge rien
- il fournit les résultats de recherche
- il peut synchroniser les indexers vers Radarr/Sonarr

### Radarr : organiser les films

Radarr gère les films.

Il sait :

- surveiller les films demandés
- chercher une release
- envoyer le téléchargement à qBittorrent
- importer le fichier terminé
- renommer et ranger dans la bibliothèque
- améliorer la qualité si une meilleure release apparaît

Dossier conseillé :

```text
/data/library/movies
```

### Sonarr : organiser les séries

Sonarr fait le même travail que Radarr, mais pour les séries.

Il sait :

- suivre les saisons et épisodes
- chercher automatiquement les nouveaux épisodes
- envoyer les téléchargements à qBittorrent
- importer et ranger les épisodes
- gérer les upgrades de qualité

Dossier conseillé :

```text
/data/library/series
```

### Plex / Jellyfin : lire

Plex et Jellyfin sont les serveurs multimédias.
Ils ne cherchent pas les torrents et ne rangent pas les fichiers.
Ils lisent simplement ce que Radarr/Sonarr ont organisé.

Bibliothèques conseillées :

```text
Films  → /data/library/movies
Séries → /data/library/series
```

Objectif : avoir le plus possible de lecture directe, sans transcodage.
La page [VIDEO](VIDEO.md) explique les notions importantes pour ça.

### Seerr / Jellyseerr / Overseerr : demander

Ces applications donnent une interface simple aux utilisateurs.

Elles permettent de :

- chercher un film ou une série
- faire une demande
- envoyer la demande à Radarr ou Sonarr
- voir si le média est disponible

Aujourd’hui, Jellyseerr/Overseerr sont très utilisés.
Seerr arrive comme remplaçant moderne.

## Les applications utiles ensuite

Ces apps ne sont pas nécessaires pour démarrer.
Ajoutez-les quand la base fonctionne.

### Profilarr : appliquer des profils

Profilarr permet de gérer les profils qualité et les Custom Formats de Sonarr/Radarr depuis une base GitHub.
C’est pratique pour appliquer rapidement une configuration cohérente.

Repo DB FR :
[Profilarr-database-french-regex](https://github.com/Jojont54/Profilarr-database-french-regex)

Si vous ne voulez pas utiliser Profilarr, vous pouvez appliquer les YAML manuellement depuis [OPTIMISER](OPTIMISER.md).

### Maintainerr : supprimer intelligemment

Maintainerr analyse Plex/Jellyfin, Radarr, Sonarr et Seerr pour décider quoi nettoyer.

Exemples :

- supprimer un film demandé mais jamais regardé après plusieurs mois
- garder un média seulement 30 jours après visionnage
- protéger certains contenus avec un tag `perma`
- gérer des overlays directement depuis Maintainerr

### Cleanupparr : nettoyer les téléchargements

Cleanupparr s’occupe surtout du côté téléchargement.
Il peut supprimer ou gérer les torrents devenus inutiles :

- torrents orphelins
- fichiers qui ne sont plus dans la bibliothèque
- échecs
- doublons
- seed terminé selon vos règles

Il aide à garder qBittorrent propre.

### Cross-seed / QUI : optimiser le ratio

Cross-seed cherche des torrents équivalents à ce que vous avez déjà.
Le but est d’ajouter le même contenu sur d’autres trackers sans retélécharger.

Avantage :

- plus de seed
- meilleur ratio
- moins de téléchargement inutile

Attention :

- tous les trackers n’acceptent pas les mêmes usages
- il faut lire les règles des trackers
- il vaut mieux limiter les recherches pour éviter les abus

### Tautulli

Tautulli est utile pour Plex.
Il permet de suivre :

- qui regarde quoi
- depuis quel appareil
- si la lecture est directe ou transcodée
- les statistiques d’usage

### Homarr

Homarr sert à créer un dashboard.
Pratique pour regrouper les liens vers toutes les applications du serveur.

### Wizarr

Wizarr simplifie les invitations Plex.
Utile si vous partagez votre serveur avec plusieurs utilisateurs.

## Ordre d’installation recommandé

Pour éviter de se perdre :

1. qBittorrent
2. Prowlarr
3. Radarr
4. Sonarr
5. Plex ou Jellyfin
6. Seerr / Jellyseerr / Overseerr
7. Profilarr ou configuration manuelle des profils
8. Maintainerr, Cleanupparr, Cross-seed

## Résumé

Si vous devez retenir une phrase :

**Prowlarr trouve, qBittorrent télécharge, Radarr/Sonarr organisent, Plex/Jellyfin lit, Seerr permet aux utilisateurs de demander.**

Le reste sert à améliorer, nettoyer ou automatiser.
