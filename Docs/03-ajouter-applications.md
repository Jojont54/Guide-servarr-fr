# **Ajouter des applications**

Une fois la base fonctionnelle, vous pouvez ajouter des applications autour de Servarr.
Le but n'est pas d'ajouter tout d'un coup, mais de choisir ce qui répond à un besoin clair.

La base, c'est déjà :

```text
qBittorrent → Prowlarr → Radarr / Sonarr → Plex / Jellyfin → Seerr
```

Les applications ci-dessous viennent ensuite.

## Profilarr

Profilarr permet d'appliquer des profils qualité et des Custom Formats dans Radarr/Sonarr depuis une base GitHub.

C'est utile si vous ne voulez pas tout recréer à la main dans Radarr et Sonarr.

Repo DB FR :
[Profilarr-database-french-regex](https://github.com/Jojont54/Profilarr-database-french-regex)

Si vous préférez faire manuellement, utilisez la page [Optimiser cette bonne base](02-optimiser-base.md).

## Maintainerr

Maintainerr sert à nettoyer la médiathèque automatiquement.

Il peut par exemple :

- supprimer un film demandé mais jamais regardé
- garder un contenu seulement quelques semaines après visionnage
- protéger certains films ou séries avec un tag `perma`
- gérer les overlays directement depuis Maintainerr

À connecter :

- Plex ou Jellyfin
- Radarr
- Sonarr
- Seerr / Jellyseerr / Overseerr

Les règles proposées sont dans [Optimiser les nouvelles applications](04-optimiser-applications.md).

## Cleanupparr

Cleanupparr nettoie surtout le côté téléchargement.

Il aide à gérer :

- les torrents orphelins
- les fichiers qui ne sont plus dans la bibliothèque
- les échecs
- les doublons
- les torrents à supprimer quand ils ne servent plus

À connecter :

- qBittorrent
- Radarr
- Sonarr

## Cross-seed / QUI

Cross-seed cherche des torrents équivalents à ce que vous avez déjà.
Le but est d'améliorer le ratio sans retélécharger les fichiers.

Avantages :

- plus de seed
- meilleur ratio
- moins de téléchargement inutile

Attention :

- tous les trackers n'autorisent pas les mêmes pratiques
- il faut lire les règles de vos trackers
- il vaut mieux ralentir les recherches

La configuration est dans [Optimiser les nouvelles applications](04-optimiser-applications.md).

## Tautulli

Tautulli est utile pour Plex.

Il permet de voir :

- qui regarde quoi
- depuis quel appareil
- si la lecture est directe ou transcodée
- les statistiques d'utilisation

## Homarr

Homarr permet de créer un dashboard avec les liens vers toutes les applications du serveur.

C'est pratique quand la stack commence à grandir.

## Wizarr

Wizarr simplifie les invitations Plex.

Utile si vous partagez votre serveur avec plusieurs utilisateurs.

## Ordre conseillé

Ajoutez les apps progressivement :

1. Profilarr ou configuration manuelle des profils
2. Maintainerr
3. Cleanupparr
4. Cross-seed / QUI
5. Tautulli, Homarr, Wizarr selon vos besoins

Après l'ajout, passez à [Optimiser les nouvelles applications](04-optimiser-applications.md).
