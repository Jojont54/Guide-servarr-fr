---
layout: default
title: Exemples Docker Compose
description: Modèles Docker Compose à adapter pour déployer une stack Servarr.
---

# **Annexe 4 : Exemples Docker Compose**

Cette annexe propose des fichiers de départ lisibles et copiables.
Ils ne sont pas universels : adaptez surtout les chemins, les identifiants utilisateur, les ports, le réseau local et le fournisseur VPN à votre machine.

L'exemple principal vise une installation Linux classique avec Jellyfin.
Sur Unraid, TrueNAS, Synology ou une seedbox, les mêmes conteneurs existent souvent via une interface graphique, mais les chemins et permissions changent.

## Avant de copier

Les exemples utilisent `/srv/servarr`, un emplacement adapté à une installation Docker classique sous Ubuntu. Si vos données se trouvent sur un disque ou un pool monté séparément, le chemin peut par exemple devenir `/mnt/storage/servarr`. Sous Unraid, il prendra généralement la forme `/mnt/user/...`.

Les exemples utilisent le dossier suivant :

```text
/srv/servarr
├── appdata
└── data
    ├── downloads
    │   ├── torrents
    │   └── cross-seed
    └── library
        ├── movies
        └── series
```

La règle importante reste la même :

**qBittorrent, Radarr et Sonarr doivent recevoir le même volume `/data`.**

> **Vous utilisez un NAS ?**  
> Sur **Synology**, **Unraid**, **QNAP**, **TrueNAS** ou **UGREEN NAS**, vous pouvez généralement créer les mêmes conteneurs depuis l'interface graphique de votre appareil, ou importer un fichier Docker Compose lorsque cette option est disponible. Les noms des menus et les chemins changent, mais le principe reste identique : conservez les configurations dans un dossier persistant, montez le même dossier de données en `/data` pour qBittorrent/Radarr/Sonarr, et adaptez les ports à ceux déjà utilisés sur votre NAS.

Créez un fichier `.env` à côté de votre fichier `compose.yaml` :

```env
PUID=1000
PGID=1000
TZ=Europe/Paris
APPDATA=/srv/servarr/appdata
DATA=/srv/servarr/data
LAN_NETWORK=192.168.1.0/24
```

Le fichier `.env` n'est pas obligatoire : vous pouvez remplacer directement `${PUID}`, `${PGID}`, `${APPDATA}`, `${DATA}` et `${LAN_NETWORK}` par vos valeurs dans chaque conteneur. Il évite simplement de répéter les mêmes chemins et réglages partout.

- `PUID` et `PGID` doivent correspondre à l'utilisateur qui possède vos dossiers.
- `DATA` doit contenir à la fois `downloads` et `library` pour permettre les hardlinks.
- `LAN_NETWORK` est votre réseau local, à adapter par exemple en `192.168.0.0/24`.

Sur Ubuntu ou une installation Docker en ligne de commande, ouvrez un terminal dans le dossier où se trouve votre fichier `compose.yaml` ainsi que votre éventuel fichier `.env`.
Par exemple, si ces fichiers sont enregistrés dans `/srv/servarr`, rendez-vous d'abord dans ce dossier :

```bash
cd /srv/servarr
```

Lancez ensuite la commande suivante dans le terminal :

```bash
docker compose up -d
```

Docker lit le fichier `compose.yaml` présent dans le dossier courant, télécharge les images nécessaires et démarre les conteneurs en arrière-plan. L'option `-d` permet de récupérer immédiatement la main dans le terminal.

## Commandes Docker utiles

Sur une installation Linux classique, les commandes suivantes se lancent depuis un terminal. Sur un NAS comme Synology, Unraid, QNAP, TrueNAS ou UGREEN NAS, vous pouvez souvent créer, démarrer et mettre à jour les conteneurs directement depuis l'interface web ; utilisez ces commandes seulement si votre interface le demande ou pour dépanner.

Les commandes `docker compose` ci-dessous doivent être lancées depuis le dossier qui contient votre fichier `compose.yaml`.

### Gérer toute la stack

| Action | Commande |
| --- | --- |
| Démarrer les conteneurs | `docker compose up -d` |
| Voir les conteneurs et leur état | `docker compose ps` |
| Arrêter les conteneurs sans les supprimer | `docker compose stop` |
| Redémarrer les conteneurs arrêtés | `docker compose start` |
| Redémarrer toute la stack | `docker compose restart` |
| Arrêter et supprimer les conteneurs | `docker compose down` |

`docker compose down` ne supprime pas vos fichiers de configuration ni vos médias si les volumes pointent bien vers vos dossiers sur la machine.
N'ajoutez pas l'option `-v` sans comprendre son effet : elle peut supprimer des volumes Docker contenant des données.

### Consulter les erreurs

Pour afficher les messages de toutes les applications :

```bash
docker compose logs -f
```

Pour suivre seulement une application, indiquez son nom de service, par exemple :

```bash
docker compose logs -f sonarr
```

Utilisez `Ctrl+C` pour quitter l'affichage des logs : cela n'arrête pas les conteneurs.

### Redémarrer une seule application

Après avoir modifié un réglage ou si une application répond mal :

```bash
docker compose restart sonarr
```

Remplacez `sonarr` par `radarr`, `prowlarr`, `qbittorrent`, `jellyfin` ou `seerr` selon l'application concernée.

### Mettre à jour les applications

Depuis le dossier du fichier `compose.yaml` :

```bash
docker compose pull
docker compose up -d
```

La première commande récupère les nouvelles images disponibles. La seconde recrée les conteneurs concernés en conservant leur configuration et leurs médias stockés dans les dossiers montés.

### Vérifier Docker sur la machine

Ces commandes peuvent être lancées depuis n'importe quel dossier :

| Action | Commande |
| --- | --- |
| Vérifier que Docker est installé | `docker --version` |
| Voir tous les conteneurs actifs | `docker ps` |
| Voir aussi les conteneurs arrêtés | `docker ps -a` |
| Voir l'espace disque utilisé par Docker | `docker system df` |

## Un fichier YAML par application

Vous n'êtes pas obligé de placer toutes les applications dans un seul fichier `compose.yaml`.
Vous pouvez créer un dossier `docker-compose` contenant un fichier YAML nommé par application, ce qui permet de les retrouver et de les gérer indépendamment.

Exemple d'organisation :

```text
/srv/servarr/docker-compose
├── qbittorrent.yaml
├── prowlarr.yaml
├── radarr.yaml
├── sonarr.yaml
└── jellyfin.yaml
```

`compose.yaml` est le nom lu automatiquement par Docker Compose. Avec un fichier nommé `radarr.yaml`, précisez son nom avec l'option `-f`.

Pour démarrer uniquement Radarr, ouvrez un terminal dans le dossier `docker-compose` :

```bash
cd /srv/servarr/docker-compose
docker compose -f radarr.yaml up -d
```

Sur un NAS, cette séparation peut aussi se traduire par un projet ou un conteneur créé séparément dans l'interface web.

### Garder les applications connectées

Avec plusieurs fichiers Compose, créez une seule fois un réseau commun :

```bash
docker network create servarr
```

Ajoutez ensuite cette partie à la fin de **chaque** fichier YAML :

```yaml
networks:
  servarr:
    external: true
```

Et conservez dans chaque service :

```yaml
    networks:
      - servarr
```

Ainsi, Radarr peut joindre `qbittorrent` ou `prowlarr` par leur nom de conteneur, même si les applications sont définies dans des fichiers différents.

Le réseau commun ne remplace pas les dossiers partagés : qBittorrent, Radarr et Sonarr doivent toujours monter le même volume en `/data`, par exemple :

```yaml
    volumes:
      - ${DATA}:/data
```

Pour lancer plusieurs fichiers en même temps, ajoutez simplement plusieurs options `-f` :

```bash
docker compose -f qbittorrent.yaml -f prowlarr.yaml -f radarr.yaml -f sonarr.yaml -f jellyfin.yaml up -d
```

### Un seul fichier ou plusieurs ?

| Organisation | Avantage principal | Bon choix si... |
| --- | --- | --- |
| Un seul `compose.yaml` | Toute la stack se lance en une commande | Vous débutez et voulez une installation simple à suivre |
| Un fichier YAML nommé par application | Chaque conteneur est simple à retrouver et à gérer | Votre NAS fonctionne par projets séparés ou vous préférez isoler les services |

## Exemple 1 : La base avec Jellyfin

Cet exemple contient qBittorrent **sans VPN**, Prowlarr, Radarr, Sonarr, Jellyfin et Seerr.
Il permet de visualiser toute la stack ; avant d'utiliser le torrent, remplacez le service qBittorrent par l'exemple VPN suivant.

```yaml
name: servarr

services:
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
      - WEBUI_PORT=8080
    volumes:
      - ${APPDATA}/qbittorrent:/config
      - ${DATA}:/data
    ports:
      - "8080:8080"
      - "6881:6881"
      - "6881:6881/udp"
    restart: unless-stopped
    networks:
      - servarr

  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${APPDATA}/prowlarr:/config
    ports:
      - "9696:9696"
    restart: unless-stopped
    networks:
      - servarr

  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${APPDATA}/radarr:/config
      - ${DATA}:/data
    ports:
      - "7878:7878"
    restart: unless-stopped
    networks:
      - servarr

  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${APPDATA}/sonarr:/config
      - ${DATA}:/data
    ports:
      - "8989:8989"
    restart: unless-stopped
    networks:
      - servarr

  jellyfin:
    image: lscr.io/linuxserver/jellyfin:latest
    container_name: jellyfin
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${APPDATA}/jellyfin:/config
      - ${DATA}/library:/data/library:ro
    ports:
      - "8096:8096"
    restart: unless-stopped
    networks:
      - servarr

  seerr:
    image: ghcr.io/seerr-team/seerr:latest
    container_name: seerr
    init: true
    environment:
      - TZ=${TZ}
      - LOG_LEVEL=info
      - PORT=5055
    volumes:
      - ${APPDATA}/seerr:/app/config
    ports:
      - "5055:5055"
    healthcheck:
      test: wget --no-verbose --tries=1 --spider http://localhost:5055/api/v1/settings/public || exit 1
      start_period: 20s
      timeout: 3s
      interval: 15s
      retries: 3
    restart: unless-stopped
    networks:
      - servarr

networks:
  servarr:
    name: servarr
```

Après le démarrage :

- dans qBittorrent, configurez le téléchargement vers `/data/downloads/torrents` ;
- dans Radarr, choisissez `/data/library/movies` comme dossier racine ;
- dans Sonarr, choisissez `/data/library/series` comme dossier racine ;
- dans Jellyfin, ajoutez les bibliothèques depuis `/data/library`.
- avant de démarrer Seerr, donnez la propriété de `${APPDATA}/seerr` à l'utilisateur `1000:1000`, utilisé par son image officielle.

Interfaces :

| Application | Adresse |
| --- | --- |
| qBittorrent | `http://IP_DU_SERVEUR:8080` |
| Prowlarr | `http://IP_DU_SERVEUR:9696` |
| Radarr | `http://IP_DU_SERVEUR:7878` |
| Sonarr | `http://IP_DU_SERVEUR:8989` |
| Jellyfin | `http://IP_DU_SERVEUR:8096` |
| Seerr | `http://IP_DU_SERVEUR:5055` |

## Variante : Plex à la place de Jellyfin

Si vous utilisez Plex, remplacez simplement le service `jellyfin` par celui-ci.
Le mode réseau `host` est couramment utilisé pour faciliter la découverte locale des lecteurs.

```yaml
  plex:
    image: lscr.io/linuxserver/plex:latest
    container_name: plex
    network_mode: host
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
      - VERSION=docker
    volumes:
      - ${APPDATA}/plex:/config
      - ${DATA}/library:/data/library:ro
    restart: unless-stopped
```

## Exemple 2 : qBittorrent avec VPN intégré et kill switch

Cet exemple remplace uniquement le service `qbittorrent` du premier compose.
L'image `binhex/arch-qbittorrentvpn` inclut qBittorrent, WireGuard/OpenVPN et des règles réseau empêchant les fuites si le tunnel VPN tombe.
Elle prend nativement en charge **ProtonVPN**, **Private Internet Access (PIA)** et **AirVPN** via `VPN_PROV=protonvpn`, `VPN_PROV=pia` ou `VPN_PROV=airvpn`.

```yaml
  qbittorrent:
    image: binhex/arch-qbittorrentvpn:latest
    container_name: qbittorrent
    privileged: true
    sysctls:
      - net.ipv4.conf.all.src_valid_mark=1
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - UMASK=002
      - VPN_ENABLED=yes
      - VPN_PROV=protonvpn
      - VPN_CLIENT=wireguard
      - STRICT_PORT_FORWARD=yes
      - LAN_NETWORK=${LAN_NETWORK}
      - NAME_SERVERS=1.1.1.1,1.0.0.1
      - ENABLE_PRIVOXY=no
      - WEBUI_PORT=8080
      - DEBUG=false
    volumes:
      - ${APPDATA}/qbittorrentvpn:/config
      - ${DATA}:/data
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "8080:8080"
    restart: unless-stopped
    networks:
      - servarr
```

`privileged: true` et `net.ipv4.conf.all.src_valid_mark=1` sont nécessaires avec WireGuard selon la documentation de l'image.
Les ports `8118` (Privoxy) et `9118` (SOCKS) ne sont pas ouverts ici car ces fonctions restent désactivées. Ne remplacez pas `PUID`, `PGID` par `0` : utilisez l'utilisateur propriétaire de vos dossiers.

### Cas ProtonVPN / WireGuard

Dans l'espace ProtonVPN, générez une configuration WireGuard sur un serveur P2P en activant l'option **NAT-PMP (Port Forwarding)**, puis placez le fichier WireGuard dans le dossier de configuration attendu par l'image binhex.

Pour ProtonVPN en OpenVPN, le suffixe `+pmp` dans l'identifiant sert à demander le port forwarding.
Avec un fichier WireGuard récent, l'élément important est d'avoir activé NAT-PMP au moment de générer la configuration.

À vérifier après démarrage :

- l'interface qBittorrent est accessible depuis votre réseau local ;
- les logs indiquent que le VPN est connecté ;
- le port entrant est récupéré si `STRICT_PORT_FORWARD=yes` ;
- le trafic torrent ne sort pas si le VPN est arrêté.

## Exemple 3 : Applications optionnelles

Ce bloc peut être ajouté au compose de base quand le serveur fonctionne déjà.
Il installe Profilarr, Maintainerr, Cleanuparr et Cross-seed ; leur configuration fonctionnelle est expliquée dans [Optimiser les nouvelles applications](04-optimiser-applications.md).

```yaml
  profilarr:
    image: santiagosayshey/profilarr:latest
    container_name: profilarr
    environment:
      - TZ=${TZ}
    volumes:
      - ${APPDATA}/profilarr:/config
    ports:
      - "6868:6868"
    restart: unless-stopped
    networks:
      - servarr

  maintainerr:
    image: ghcr.io/maintainerr/maintainerr:latest
    container_name: maintainerr
    user: "${PUID}:${PGID}"
    environment:
      - TZ=${TZ}
    volumes:
      - ${APPDATA}/maintainerr:/opt/data
    ports:
      - "6246:6246"
    restart: unless-stopped
    networks:
      - servarr

  cleanuparr:
    image: ghcr.io/cleanuparr/cleanuparr:latest
    container_name: cleanuparr
    environment:
      - TZ=${TZ}
      - PORT=11011
      - BASE_PATH=
      - PUID=${PUID}
      - PGID=${PGID}
      - UMASK=022
    volumes:
      - ${APPDATA}/cleanuparr:/config
      - ${DATA}:/data
    ports:
      - "11011:11011"
    restart: unless-stopped
    networks:
      - servarr

  cross-seed:
    image: ghcr.io/cross-seed/cross-seed:6
    container_name: cross-seed
    user: "${PUID}:${PGID}"
    volumes:
      - ${APPDATA}/cross-seed:/config
      - ${DATA}:/data
    ports:
      - "2468:2468"
    command: daemon
    restart: unless-stopped
    networks:
      - servarr
```

À retenir :

- Profilarr est accessible sur `http://IP_DU_SERVEUR:6868` et conserve sa configuration dans `/config`.
- Maintainerr conserve ses données dans `/opt/data`.
- Cleanuparr a besoin de voir les téléchargements et la bibliothèque pour contrôler les hardlinks.
- Cross-seed utilise `user: UID:GID`, et non les variables `PUID` / `PGID`.
- Exécutez Cross-seed une première fois pour générer puis modifier son fichier `config.js`.

## Vérifier avant de lancer

Avant un `docker compose up -d`, contrôlez :

- les chemins dans `.env` existent ;
- l'utilisateur `PUID:PGID` peut lire et écrire dans `appdata` et `data` ;
- aucun port n'est déjà utilisé sur la machine ;
- le VPN est correctement réglé avant d'envoyer des torrents ;
- les dossiers vus par qBittorrent, Radarr et Sonarr restent tous sous `/data`.

## Sources des modèles

- [Documentation Docker Compose](https://docs.docker.com/compose/)
- [Images LinuxServer.io](https://docs.linuxserver.io/)
- [Installation Docker de Seerr](https://docs.seerr.dev/getting-started/docker)
- [Installation Docker de Profilarr](https://github.com/Dictionarry-Hub/profilarr)
- [Image binhex/qbittorrentvpn](https://hub.docker.com/r/binhex/arch-qbittorrentvpn)
- [Port forwarding manuel ProtonVPN](https://protonvpn.com/support/port-forwarding-manual-setup)
- [Installation de Maintainerr](https://docs.maintainerr.info/installation/)
- [Installation de Cleanuparr](https://cleanuparr.github.io/Cleanuparr/docs/installation/detailed/)
- [Installation Docker de Cross-seed](https://www.cross-seed.org/docs/basics/getting-started)
