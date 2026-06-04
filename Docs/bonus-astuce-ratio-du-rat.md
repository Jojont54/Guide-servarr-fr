---
layout: default
title: Astuce ratio du rat
description: Monter une petite machine très légère pour qBittorrent, Prowlarr, Cross-seed et un VPN optionnel.
---

# **Astuce ratio du rat**

Cette page est un bonus.
L'idée est de proposer une version **petit budget** pour les utilisateurs qui ne veulent pas, ou ne peuvent pas encore, monter un serveur Servarr complet.

Elle peut tourner avec très peu de puissance :

```text
qBittorrent-nox
Prowlarr
Cross-seed
VPN optionnel
```

Pas de Plex, pas de Jellyfin, pas de transcodage, pas de grosse interface.
Juste une petite machine qui télécharge, seed et cherche des correspondances cross-seed pour aider le ratio.

## Pourquoi faire ça ?

Sur les trackers privés, le ratio dépend surtout de deux choses :

- rester en seed longtemps ;
- trouver des torrents équivalents déjà présents sur d'autres trackers.

Une petite machine peut rester allumée en permanence sans consommer grand-chose.
Elle permet de commencer avec peu de budget : pas besoin de NAS complet, pas besoin de grosse bibliothèque, pas besoin de gérer Plex/Jellyfin dès le départ.

## Ce que cette machine ne fait pas

Cette machine n'est pas là pour :

- lire les films et séries ;
- transcoder ;
- héberger Plex ou Jellyfin ;
- gérer toute la bibliothèque ;
- offrir une expérience de streaming complète à plusieurs utilisateurs.

Son rôle est beaucoup plus simple : garder qBittorrent actif, permettre à Prowlarr de fournir les indexers et laisser Cross-seed travailler.
C'est une base minimale pour faire monter un ratio avant d'investir dans une vraie stack Servarr.

## Matériel minimum

Le but est d'utiliser une machine stable, peu chère et peu énergivore. Pour l'astuce ratio, la puissance CPU compte peu : le disque, le réseau et les chemins propres sont plus importants. Pour une stack Servarr complète, utilisez le score **CPU Mark** sur [PassMark / CPU Benchmark](https://www.cpubenchmark.net/) comme repère rapide : un Raspberry Pi 4 tourne plutôt autour de **850 à 1 000 points**, souvent proche de **950**, un Raspberry Pi 5 autour de **2 700 points**, et sous environ **5 000 points**, une stack complète devient plus difficile.

| Besoin | Astuce du rat | Stack entière |
| --- | --- | --- |
| CPU | Raspberry Pi 4/5, vieux thin client, vieux portable très modeste ou petite machine basse consommation | Intel N100/N150, i7-2600 ou vieux PC avec CPU correct ; visez environ 5 000 points CPU Mark ou plus |
| RAM | 2 Go minimum, 4 Go plus confortable | 8 Go recommandés pour Radarr, Sonarr, Prowlarr, qBittorrent, Plex/Jellyfin et Seerr |
| Stockage système | petit SSD conseillé ou carte SD sur Raspberry Pi 4/5 | SSD conseillé pour Docker et les bases de données des applications |
| Stockage torrents | disque USB, SSD, disque interne ou partage réseau | disque interne, NAS ou stockage fiable avec assez de place pour la bibliothèque |
| Réseau | Ethernet recommandé | Ethernet fortement recommandé, surtout avec plusieurs utilisateurs |
| Consommation | le plus bas possible, car la machine reste allumée longtemps | moins prioritaire, mais à surveiller sur un vieux PC allumé 24/7 |

## Organisation simple

Exemple de dossiers :

```text
/srv/ratio-rat
├── appdata
│   ├── qbittorrent
│   ├── prowlarr
│   └── cross-seed
└── data
    ├── downloads
    └── cross-seed
```

Comme dans le reste du guide, gardez les chemins simples.
qBittorrent et Cross-seed doivent voir les mêmes dossiers de téléchargement.

## VPN ou pas VPN ?

Le VPN est optionnel, mais fortement recommandé si cette machine télécharge en torrent depuis votre connexion maison.

Deux approches sont possibles :

- utiliser une image qBittorrent avec VPN intégré et kill switch ;
- utiliser qBittorrent sans VPN si la machine est déjà dans un environnement protégé, par exemple certaines seedbox ou certains réseaux déjà configurés.

Pour débuter, l'approche la plus simple reste un conteneur qBittorrent qui inclut directement le VPN et le kill switch.
Cela évite de bricoler un VPN global sur toute la machine.

## Exemple Docker Compose léger

Cet exemple reprend l'approche du guide : un réseau commun, des dossiers persistants et un VPN limité au client torrent.
Adaptez les chemins, `PUID`, `PGID`, `LAN_NETWORK` et les réglages VPN.

```yaml
name: ratio-rat

services:
  qbittorrent:
    image: binhex/arch-qbittorrentvpn:latest
    container_name: qbittorrent
    privileged: true
    sysctls:
      - net.ipv4.conf.all.src_valid_mark=1
    environment:
      - PUID=1000
      - PGID=1000
      - UMASK=002
      - VPN_ENABLED=yes
      - VPN_PROV=protonvpn
      - VPN_CLIENT=wireguard
      - STRICT_PORT_FORWARD=yes
      - LAN_NETWORK=192.168.1.0/24
      - NAME_SERVERS=1.1.1.1,1.0.0.1
      - ENABLE_PRIVOXY=no
      - WEBUI_PORT=8080
      - DEBUG=false
    volumes:
      - /srv/ratio-rat/appdata/qbittorrent:/config
      - /srv/ratio-rat/data:/data
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "8080:8080"
    restart: unless-stopped
    networks:
      - ratio-rat

  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
    volumes:
      - /srv/ratio-rat/appdata/prowlarr:/config
    ports:
      - "9696:9696"
    restart: unless-stopped
    networks:
      - ratio-rat

  cross-seed:
    image: ghcr.io/cross-seed/cross-seed:6
    container_name: cross-seed
    user: "1000:1000"
    volumes:
      - /srv/ratio-rat/appdata/cross-seed:/config
      - /srv/ratio-rat/data:/data
    ports:
      - "2468:2468"
    command: daemon
    restart: unless-stopped
    networks:
      - ratio-rat

networks:
  ratio-rat:
    name: ratio-rat
```

Si vous ne voulez pas de VPN, remplacez le service `qbittorrent` par l'image LinuxServer classique :

```yaml
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
      - WEBUI_PORT=8080
    volumes:
      - /srv/ratio-rat/appdata/qbittorrent:/config
      - /srv/ratio-rat/data:/data
    ports:
      - "8080:8080"
      - "6881:6881"
      - "6881:6881/udp"
    restart: unless-stopped
    networks:
      - ratio-rat
```

## Réglages à faire

Dans qBittorrent :

- dossier de téléchargement : `/data/downloads` ;
- catégories propres si vous utilisez plusieurs trackers ;
- limites de seed adaptées aux règles de vos trackers ;
- interface web accessible seulement depuis votre réseau local.

Dans Prowlarr :

- ajoutez les indexers nécessaires ;
- récupérez les URL Torznab et les API keys utiles pour Cross-seed.

Dans Cross-seed :

- configurez qBittorrent comme client ;
- ajoutez vos indexers ;
- vérifiez que les chemins vus par Cross-seed correspondent aux chemins vus par qBittorrent ;
- commencez doucement avant d'automatiser trop fort.

## Usage final

Une fois la machine configurée, vous pouvez chercher vos torrents directement depuis la page **Search** de Prowlarr et les envoyer à qBittorrent.

Vous pouvez aussi continuer à passer par les sites de vos trackers, télécharger les fichiers `.torrent` à la main, puis les ajouter dans qBittorrent.

Ensuite, Cross-seed cherche automatiquement les correspondances possibles sur les autres trackers configurés.
Quand il trouve un torrent équivalent, il peut l'ajouter à qBittorrent sans retélécharger les fichiers, ce qui permet de seed sur plusieurs trackers à partir des mêmes données.

## Et Servarr dans tout ça ?

Cette astuce ne remplace pas Radarr, Sonarr, Seerr, Plex ou Jellyfin.
Elle sert surtout à commencer petit, avec une machine peu coûteuse et un objectif simple : télécharger proprement, rester en seed et profiter du cross-seed.

Plus tard, si vous ajoutez un NAS, un mini PC plus puissant ou une seedbox plus complète, vous pourrez reprendre les mêmes bases : qBittorrent, Prowlarr, chemins propres, VPN limité au client torrent et Cross-seed.

## À retenir

- la puissance CPU est secondaire ;
- le stockage et le réseau comptent plus ;
- le VPN doit rester limité au client torrent ;
- Cross-seed a besoin de chemins cohérents avec qBittorrent ;
- commencez simple, puis ajustez les règles de seed avec le temps.

Le vrai luxe, ici, ce n'est pas la puissance.
C'est une petite machine fiable qui reste en ligne sans demander d'attention.
