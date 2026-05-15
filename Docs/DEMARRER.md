# **DÉMARRER : Le parcours pas à pas**

Cette page sert de fil conducteur.
Les autres pages expliquent les détails, mais ici on suit l’ordre logique pour construire un serveur Servarr fonctionnel.

## Objectif

À la fin du parcours, vous devez pouvoir :

- demander un film ou une série depuis une interface simple
- laisser Radarr/Sonarr chercher la bonne release
- envoyer le téléchargement à qBittorrent
- ranger automatiquement le fichier dans une bibliothèque
- lire le média avec Plex ou Jellyfin

On commence volontairement simple.
Les optimisations viennent ensuite.

## Étape 1 : Préparer les dossiers

Avant d’installer les applications, préparez une structure claire.

Exemple recommandé :

```text
data
├── downloads
│   ├── torrents
│   └── cross-seed
└── library
    ├── movies
    └── series
```

L’idée importante :

**qBittorrent, Radarr et Sonarr doivent voir le même dossier `/data`.**

Exemple :

- sur la machine : `/mnt/user/data`
- dans les conteneurs : `/data`

Pourquoi ?
Parce que Radarr/Sonarr doivent pouvoir ranger les fichiers téléchargés sans les copier.
C’est ce qui permet les hardlinks.

À éviter :

- donner `/downloads` à qBittorrent
- donner `/movies` à Radarr
- donner `/series` à Sonarr

Si chaque app voit un chemin différent, les imports deviennent plus compliqués et les hardlinks peuvent casser.

## Étape 2 : Installer les applications de base

Pour commencer, installez seulement le minimum :

- qBittorrent
- Prowlarr
- Radarr
- Sonarr
- Plex ou Jellyfin

Seerr/Jellyseerr/Overseerr peut venir juste après, quand Radarr et Sonarr fonctionnent.

Les outils optionnels comme Maintainerr, Cleanupparr, Cross-seed et Profilarr sont utiles, mais il vaut mieux les ajouter quand la base est stable.

Ressource utile pour voir une configuration complète en vidéo :
[vidéo OptiNAS sur la configuration Servarr](https://www.youtube.com/watch?v=gQ56YY4Y56o)

## Étape 3 : Configurer qBittorrent

qBittorrent est le client de téléchargement.

À configurer :

- dossier de téléchargement : `/data/downloads/torrents`
- port d’écoute ouvert si possible
- identifiant et mot de passe de l’interface web
- catégories si vous voulez séparer films, séries et cross-seed

Si vous utilisez des trackers privés, la redirection de port est très importante.
Sans port ouvert, vous pouvez télécharger, mais vous seederez souvent beaucoup moins bien.

### VPN et kill switch

Pour le téléchargement torrent, le plus simple est souvent d'utiliser une image Docker qui intègre directement :

- qBittorrent
- le VPN
- un kill switch

Exemple : `binhex-qbittorrentVPN`.

L'intérêt du kill switch est important : si le VPN tombe, qBittorrent ne continue pas à télécharger ou seed en dehors du VPN.
Ça évite les fuites réseau.

Je conseille cette approche plutôt que de bricoler un VPN séparé au niveau de toute la machine, surtout pour débuter.
On garde le VPN limité au client torrent, pendant que Radarr, Sonarr, Prowlarr, Plex/Jellyfin et Seerr restent accessibles normalement sur le réseau local.
Gluetun peut aussi faire le travail, mais il est plus compliqué à utiliser et à relier correctement aux autres conteneurs.

À retenir :

- le VPN doit idéalement proposer le port forwarding
- le port transféré doit être utilisé par qBittorrent
- si le VPN ne propose pas de port forwarding, le seeding sera souvent moins bon
- ne mettez pas toute la stack Servarr derrière le VPN sans raison

## Étape 4 : Configurer Prowlarr

Prowlarr sert à centraliser les indexers/trackers.

Dans Prowlarr :

1. Ajoutez vos indexers.
2. Testez qu’ils répondent correctement.
3. Ajoutez Radarr dans les applications.
4. Ajoutez Sonarr dans les applications.
5. Synchronisez.

Prowlarr évite d’ajouter les trackers à la main dans chaque application.
C’est lui qui fournit les résultats de recherche à Radarr et Sonarr.

## Étape 5 : Configurer Radarr

Radarr gère les films.

À faire :

- ajouter le dossier racine : `/data/library/movies`
- ajouter qBittorrent comme client de téléchargement
- vérifier que Prowlarr est bien connecté
- choisir un profil qualité simple pour commencer
- tester avec un seul film

Ne commencez pas avec 200 films d’un coup.
Ajoutez un film test, laissez Radarr chercher, télécharger, importer, puis vérifiez le résultat dans Plex/Jellyfin.

## Étape 6 : Configurer Sonarr

Sonarr fonctionne comme Radarr, mais pour les séries.

À faire :

- ajouter le dossier racine : `/data/library/series`
- ajouter qBittorrent comme client de téléchargement
- vérifier que Prowlarr est bien connecté
- choisir un profil qualité simple
- tester avec une série courte ou un seul épisode

Pour les séries, surveillez bien la langue et les releases MULTi/VF/VOSTFR selon vos préférences.

## Étape 7 : Configurer Plex ou Jellyfin

Plex/Jellyfin ne télécharge rien.
Il lit simplement ce que Radarr et Sonarr ont rangé.

Créez deux bibliothèques :

- Films : `/data/library/movies`
- Séries : `/data/library/series`

Ensuite, lancez une analyse.
Si tout est bien rangé, vos contenus doivent apparaître automatiquement.

Objectif : obtenir du **Direct Play** autant que possible.
Si Plex/Jellyfin transcode tout, il faudra vérifier les codecs, l’audio, les sous-titres ou le débit réseau.

## Étape 8 : Ajouter Seerr / Jellyseerr / Overseerr

Cette application sert d’interface utilisateur.

Elle permet de :

- chercher un film ou une série
- faire une demande
- envoyer la demande à Radarr ou Sonarr
- suivre l’état du téléchargement

À connecter :

- Plex ou Jellyfin
- Radarr
- Sonarr

Une fois configuré, vos utilisateurs n’ont plus besoin d’aller dans Radarr/Sonarr.
Ils passent par Seerr/Jellyseerr/Overseerr.

## Étape 9 : Tester le chemin complet

Avant d’optimiser, testez toute la chaîne :

1. Demandez un film depuis Seerr/Jellyseerr/Overseerr.
2. Vérifiez que Radarr reçoit la demande.
3. Vérifiez que Radarr trouve une release via Prowlarr.
4. Vérifiez que qBittorrent télécharge.
5. Vérifiez que Radarr importe le fichier.
6. Vérifiez que Plex/Jellyfin voit le film.
7. Lancez la lecture.

Si cette chaîne fonctionne, votre serveur est déjà utilisable.

## Étape 10 : Optimiser ensuite

Quand la base est stable, vous pouvez améliorer :

- les profils qualité
- les Custom Formats
- les règles de langue
- le nettoyage automatique
- le seeding
- les demandes utilisateurs

Outils utiles ensuite :

- **Profilarr** : appliquer des profils et Custom Formats depuis une base GitHub
- **Maintainerr** : supprimer automatiquement les médias selon des règles
- **Cleanupparr** : nettoyer les téléchargements inutiles ou orphelins
- **Cross-seed** : améliorer le ratio en ajoutant des torrents équivalents
- **Tautulli** : suivre l’usage Plex
- **Homarr** : créer un dashboard
- **Wizarr** : simplifier les invitations Plex

Pour Profilarr, vous pouvez utiliser ce repo DB FR :
[Profilarr-database-french-regex](https://github.com/Jojont54/Profilarr-database-french-regex)

## Résumé débutant

Le bon ordre :

```text
Dossiers
↓
qBittorrent
↓
Prowlarr
↓
Radarr / Sonarr
↓
Plex / Jellyfin
↓
Seerr / Jellyseerr / Overseerr
↓
Optimisation
```

Ne cherchez pas à tout automatiser dès le départ.
Un serveur simple qui importe correctement vaut mieux qu’une stack complète impossible à débugger.
