# **Annexe 1 : Docker, dossiers et réseau**

Avant de configurer Radarr, Sonarr ou Prowlarr, il faut comprendre trois choses :

- les applications tournent dans des conteneurs
- les conteneurs doivent accéder aux bons dossiers
- les applications doivent pouvoir se parler sur le réseau

Si ces trois points sont propres, le reste devient beaucoup plus simple.

## Pourquoi Docker ?

Un serveur Servarr utilise plusieurs applications.
On pourrait tout installer directement sur la machine, mais ce serait vite difficile à maintenir.

Docker permet de lancer chaque application dans son propre conteneur :

- qBittorrent dans un conteneur
- Prowlarr dans un conteneur
- Radarr dans un conteneur
- Sonarr dans un conteneur
- Plex ou Jellyfin dans un conteneur

Un conteneur, c’est une application isolée avec ce dont elle a besoin pour fonctionner.
Il ne contient pas un système complet comme une machine virtuelle, donc c’est plus léger.

## VM ou Docker ?

Une machine virtuelle simule un ordinateur complet.
C’est utile pour isoler un système entier, mais c’est plus lourd.

Pour un serveur Servarr, Docker est généralement plus adapté :

- plus léger
- plus rapide à redémarrer
- plus facile à sauvegarder
- plus simple pour multiplier les applications

La VM peut rester utile si vous voulez isoler tout le serveur dans une machine dédiée.
Mais à l’intérieur, les applications peuvent quand même tourner avec Docker.

## Ce qu’un conteneur doit recevoir

Quand on crée un conteneur, on lui donne surtout :

**Des ports**  
Ils permettent d’ouvrir l’interface web ou de connecter les applications entre elles.

Exemple :

```text
192.168.1.10:8989 → Sonarr
192.168.1.10:7878 → Radarr
192.168.1.10:9696 → Prowlarr
```

**Des volumes**  
Ils permettent au conteneur d’accéder à des dossiers de la machine.

Exemple :

```text
/mnt/user/data → /data
```

À gauche : le dossier réel sur la machine.  
À droite : le chemin vu par l’application dans le conteneur.

**Des variables d’environnement**  
Elles règlent certains paramètres :

- fuseau horaire
- utilisateur
- groupe
- mot de passe
- options de démarrage

Exemple :

```text
TZ=Europe/Paris
PUID=1000
PGID=1000
```

## Le dossier le plus important : /data

La règle simple :

**qBittorrent, Radarr et Sonarr doivent partager le même dossier `/data`.**

Exemple conseillé :

```text
/mnt/user/data
├── downloads
│   ├── torrents
│   └── cross-seed
└── library
    ├── movies
    └── series
```

Dans les conteneurs, on monte ce dossier comme ça :

```text
/mnt/user/data → /data
```

Ensuite :

- qBittorrent télécharge dans `/data/downloads/torrents`
- Radarr range les films dans `/data/library/movies`
- Sonarr range les séries dans `/data/library/series`
- Plex/Jellyfin lit `/data/library`

## Pourquoi c’est si important ?

Radarr et Sonarr ne téléchargent pas eux-mêmes.
Ils demandent à qBittorrent de télécharger, puis ils importent le fichier dans la bibliothèque.

Si les chemins sont cohérents, ils peuvent créer un **hardlink**.

Un hardlink permet d’avoir :

- le fichier dans le dossier de téléchargement pour continuer à seed
- le même fichier rangé dans la bibliothèque pour Plex/Jellyfin
- sans doubler l’espace disque

Exemple :

```text
/data/downloads/torrents/Film.2024.1080p.mkv
/data/library/movies/Film (2024)/Film (2024).mkv
```

Ces deux chemins peuvent pointer vers le même fichier physique.

## Erreur classique à éviter

Mauvais montage :

```text
qBittorrent : /mnt/user/data/downloads → /downloads
Radarr      : /mnt/user/data/library/movies → /movies
Sonarr      : /mnt/user/data/library/series → /series
```

Chaque application voit un monde différent.
Les imports peuvent marcher, mais les hardlinks risquent de casser ou les chemins deviennent pénibles à corriger.

Meilleur montage :

```text
qBittorrent : /mnt/user/data → /data
Radarr      : /mnt/user/data → /data
Sonarr      : /mnt/user/data → /data
Plex/Jellyfin : /mnt/user/data/library → /data/library
```

Toutes les apps parlent le même langage.

## Réseau entre applications

Depuis votre navigateur, vous utilisez souvent l’IP de la machine :

```text
http://192.168.1.10:8989
```

Mais entre conteneurs Docker, les applications peuvent souvent s’appeler par leur nom :

```text
http://qbittorrent:8080
http://prowlarr:9696
http://radarr:7878
http://sonarr:8989
```

Exemple dans Sonarr pour ajouter qBittorrent :

```text
Host : qbittorrent
Port : 8080
```

Si vous utilisez une interface comme Unraid, TrueNAS, Synology, Portainer, Dockstarter ou Ultra.cc, le principe reste le même.
Seule l’interface change.

## API Key

Une API Key est une clé qui permet à deux applications de communiquer.

Exemples :

- Prowlarr utilise l’API Key de Radarr pour lui envoyer les indexers
- Seerr utilise l’API Key de Sonarr/Radarr pour envoyer les demandes
- Cross-seed utilise les API Keys pour interroger les applications

Ce n’est pas un mot de passe utilisateur classique.
C’est plutôt une clé d’accès entre applications.

## Docker Compose

Docker Compose permet de décrire un ou plusieurs conteneurs dans un fichier `.yaml`.

Exemple simplifié pour Sonarr :

```yaml
services:
  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    restart: unless-stopped
    ports:
      - "8989:8989"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
    volumes:
      - /mnt/user/appdata/sonarr:/config
      - /mnt/user/data:/data
```

Ce fichier dit :

- quelle image utiliser
- quel nom donner au conteneur
- quel port ouvrir
- où stocker la configuration
- quels dossiers rendre accessibles

L’avantage : la configuration est écrite, sauvegardable et reproductible.

## Résumé

Pour un setup Servarr propre :

- utilisez Docker ou une interface qui crée des conteneurs
- donnez le même `/data` à qBittorrent, Radarr et Sonarr
- gardez les configurations dans `/appdata`
- utilisez les noms des conteneurs pour connecter les apps entre elles
- récupérez les API Keys quand une application doit parler à une autre

Une fois ces bases comprises, vous pouvez revenir au parcours dans [Démarrer pas à pas](01-demarrer.md).
