# **Optimiser les nouvelles applications**

Cette page vient après l'ajout des applications optionnelles.
Elle sert à régler ce qui touche au nettoyage, au seeding et à l'entretien du serveur.

À ce stade, la base doit déjà fonctionner : Radarr/Sonarr importent correctement, Plex/Jellyfin lit les fichiers, et qBittorrent conserve le seed.

## Cleanupparr

Cleanupparr peut nettoyer les téléchargements terminés selon les règles de seed, mais aussi repérer les téléchargements qui n'ont plus de hardlink vers la médiathèque.
La documentation officielle détaille cette partie ici : [Download Cleaner](https://cleanuparr.github.io/Cleanuparr/docs/configuration/download-cleaner/?unlinked-categories).

### Download Cleaner

<img src="assets/cleanuparr-download-cleaner.png" width="800">

Activez le Download Cleaner et choisissez une fréquence simple, par exemple toutes les heures.
Les `Ignored Downloads` servent à exclure un hash, une catégorie, un tag ou un tracker précis du nettoyage.

### Unlinked Downloads

<img src="assets/cleanuparr-unlinked-downloads.png" width="800">

Cette partie cherche les torrents qui n'ont plus de hardlink vers la bibliothèque.
Les catégories `radarr`, `tv-sonarr` et `cross-seed-link` sont vérifiées, puis les torrents orphelins sont déplacés vers la catégorie `unlinked`.

`Ignored Root Directories` sert surtout à ne pas compter les hardlinks créés dans le dossier de téléchargement ou par cross-seed.
On ignore donc `/data/downloads/qBittorrent` pour éviter que Cleanupparr considère un torrent comme encore utilisé juste parce qu'il a un lien dans la zone de téléchargement.

### Seeding Rules

<img src="assets/cleanuparr-seeding-rules.png" width="800">

Les règles sont évaluées de haut en bas.
Ici, les torrents `unlinked` sont supprimés après un ratio ou un temps de seed suffisant, avec suppression des fichiers activée.

## Cross-seed / QUI

Cross-seed permet d'ajouter des torrents équivalents sur d'autres trackers sans retélécharger les fichiers.
C'est utile pour améliorer le ratio, mais il faut rester prudent et respecter les règles de chaque tracker.

Lors de la création du conteneur, un fichier `config.js` est créé dans `appdata`.
C'est ce fichier qu'il faut modifier.

### Torznab

```js
    torznab: [
        "http://prowlarr:9696/1/api?apikey=12345",
        "http://prowlarr:9696/2/api?apikey=12345",
    ],
```

### Sonarr, Radarr et qBittorrent

```js
    sonarr: ["http://sonarr:8989/?apikey=12345"],
    radarr: ["http://radarr:7878/?apikey=12345"],
    torrentClients: ["qbittorrent:http://user:pass@qbittorrent:8080"],
```

### Ralentir les recherches

Pour éviter les abus et limiter les risques de ban sur les trackers, il vaut mieux ralentir la recherche.

```js
    rssCadence: "2 hours",
    searchCadence: "1 day",
    snatchTimeout: "30 seconds",
    searchTimeout: "2 minutes",
    searchLimit: 400,
```

## Rules Maintainerr

Le tag “perma” doit exister dans sonarr / radarr pour garder des contenus permanents. 

**Films**

* Le demandeur a regardé son film → on le garde 30 jours → puis on peut supprimer. (Si le film n’intéresse que le demandeur)  
* Demandé mais jamais regardé → on laisse 3 mois  
* Film inactif depuis 2 mois → supprimable. (Si le film intéresse plus que le demandeur)  
* La watchlist protège seulement 6 mois.  
* Tout film vieux de plus d’un an → supprimé (garde-fou)  
* Exception : “perma” ne sera jamais supprimé, quoi qu’il arrive.

**Séries / Animes**

* Le demandeur a fini la saison → on garde 1 mois → puis nettoyage. (Ça n’intéressait que le demandeur)  
* Vu par d’autre que le demandeur, mais laissée à l’abandon depuis 2 mois → supprimable.   
* Demandée, jamais lancée, passé 3 mois → supprimable.  
* La watchlist protège seulement 6 mois.  
* Toute saison vieille de \+1 an → supprimé (garde-fou)  
* Exception : “perma” ne sera jamais supprimé, quoi qu’il arrive.

### Rule Film 

```yaml
mediaType: MOVIES
rules:
  - "0":
      - firstValue: Plex.seenBy
        action: CONTAINS
        lastValue: Seerr.addUser
      - operator: AND
        firstValue: Seerr.isRequested
        action: EQUALS
        customValue:
          type: boolean
          value: "true"
      - operator: AND
        firstValue: Seerr.mediaAddedAt
        action: BEFORE
        customValue:
          type: custom_days
          value: "30"
      - operator: AND
        firstValue: Plex.watchlist_isWatchlisted
        action: EQUALS
        customValue:
          type: boolean
          value: "false"
      - operator: AND
        firstValue: Radarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma
  - "1":
      - operator: OR
        firstValue: Seerr.mediaAddedAt
        action: BEFORE
        customValue:
          type: custom_days
          value: "90"
      - operator: AND
        firstValue: Seerr.isRequested
        action: EQUALS
        customValue:
          type: boolean
          value: "true"
      - operator: AND
        firstValue: Plex.watchlist_isWatchlisted
        action: EQUALS
        customValue:
          type: boolean
          value: "false"
      - operator: AND
        firstValue: Radarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma
  - "2":
      - operator: OR
        firstValue: Plex.lastViewedAt
        action: BEFORE
        customValue:
          type: custom_days
          value: "60"
      - operator: AND
        firstValue: Plex.watchlist_isWatchlisted
        action: EQUALS
        customValue:
          type: boolean
          value: "false"
      - operator: AND
        firstValue: Radarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma
  - "3":
      - operator: OR
        firstValue: Plex.addDate
        action: BEFORE
        customValue:
          type: custom_days
          value: "365"
      - operator: AND
        firstValue: Radarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma
  - "4":
      - operator: OR
        firstValue: Plex.watchlist_isWatchlisted
        action: EQUALS
        customValue:
          type: boolean
          value: "true"
      - operator: AND
        firstValue: Plex.addDate
        action: BEFORE
        customValue:
          type: custom_days
          value: "180"
      - operator: AND
        firstValue: Radarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma
```

### Rule série et animes (Créé 2 règles si les profiles sont séparé dans sonarr)

```yaml
mediaType: SEASONS
rules:
  - "0":
      - firstValue: Seerr.isRequested
        action: EQUALS
        customValue:
          type: boolean
          value: "true"
      - operator: AND
        firstValue: Plex.sw_lastWatched
        action: BEFORE
        customValue:
          type: custom_days
          value: "60"
      - operator: AND
        firstValue: Plex.watchlist_isWatchlisted
        action: EQUALS
        customValue:
          type: boolean
          value: "false"
      - operator: AND
        firstValue: Sonarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma
  - "1":
      - operator: OR
        firstValue: Seerr.isRequested
        action: EQUALS
        customValue:
          type: boolean
          value: "true"
      - operator: AND
        firstValue: Plex.sw_viewedEpisodes
        action: EQUALS
        customValue:
          type: number
          value: 0
      - operator: AND
        firstValue: Plex.sw_lastEpisodeAddedAt
        action: BEFORE
        customValue:
          type: custom_days
          value: "90"
      - operator: AND
        firstValue: Plex.watchlist_isWatchlisted
        action: EQUALS
        customValue:
          type: boolean
          value: "false"
      - operator: AND
        firstValue: Sonarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma
  - "2":
      - operator: OR
        firstValue: Seerr.isRequested
        action: EQUALS
        customValue:
          type: boolean
          value: "true"
      - operator: AND
        firstValue: Plex.sw_allEpisodesSeenBy
        action: CONTAINS
        lastValue: Seerr.addUser
      - operator: AND
        firstValue: Plex.lastViewedAt
        action: BEFORE
        customValue:
          type: custom_days
          value: "30"
      - operator: AND
        firstValue: Plex.watchlist_isWatchlisted
        action: EQUALS
        customValue:
          type: boolean
          value: "false"
      - operator: AND
        firstValue: Sonarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma
  - "3":
      - operator: OR
        firstValue: Plex.addDate
        action: BEFORE
        customValue:
          type: custom_days
          value: "365"
      - operator: AND
        firstValue: Sonarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma
  - "4":
      - operator: OR
        firstValue: Plex.watchlist_isWatchlisted
        action: EQUALS
        customValue:
          type: boolean
          value: "true"
      - operator: AND
        firstValue: Plex.addDate
        action: BEFORE
        customValue:
          type: custom_days
          value: "180"
      - operator: AND
        firstValue: Sonarr.tags
        action: NOT_CONTAINS_PARTIAL
        customValue:
          type: text
          value: Perma

```

