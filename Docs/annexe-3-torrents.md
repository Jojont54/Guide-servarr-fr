---
layout: default
title: Torrents, ratio et VPN
description: Comprendre le seed, le port forwarding et l'utilisation d'un VPN.
---

# **Annexe 3 : Torrents, ratio et VPN**

## Différence tracker public / privé ?

**Public :**  
accès libre  
pas de ratio  
moins fiable  

**Privé :**  
accès restreint (inscription / invitation)  
ratio obligatoire  
meilleure qualité  
plus stable  


## C’est quoi le ratio ?

Ratio = upload / download  
1.0 = tu as partagé autant que tu as téléchargé  


## Quel VPN choisir ?

Choisis un VPN qui propose le port forwarding.

**Exemples simples avec binhex-qbittorrentVPN :**
Private Internet Access  
AirVPN  

**Cas particulier : ProtonVPN**
ProtonVPN propose bien du port forwarding, mais il passe par **NAT-PMP** avec un port à renouveler régulièrement.
D'après la documentation Proton, en configuration manuelle, le mapping NAT-PMP ne reste ouvert que 60 secondes si la boucle de renouvellement n'est pas relancée.
Ce n'est donc pas le choix le plus simple avec `binhex-qbittorrentVPN` si vous voulez un port entrant stable sans script supplémentaire.
En revanche, ProtonVPN reste possible avec **Gluetun**, qui documente `VPN_SERVICE_PROVIDER=protonvpn` et `VPN_PORT_FORWARDING=on`.

**À éviter pour cet usage :**  
les VPN sans port forwarding (ex : NordVPN)  

## Comment utiliser le VPN avec qBittorrent ?

Le plus propre est d'utiliser un conteneur qui intègre directement qBittorrent, le VPN et un kill switch.

Exemple :

`binhex-qbittorrentVPN`

Pourquoi c'est pratique :

- qBittorrent passe par le VPN
- si le VPN tombe, le kill switch bloque le trafic torrent
- les autres apps restent accessibles normalement sur le réseau local
- on évite de mettre tout le serveur derrière le VPN

À éviter :

- lancer qBittorrent sans kill switch
- mettre Radarr/Sonarr/Prowlarr derrière le VPN sans besoin clair
- choisir un VPN sans port forwarding si vous utilisez des trackers privés

Le VPN protège la sortie torrent.
Il ne remplace pas un bon ratio, un port ouvert et le respect des règles du tracker.

## Pourquoi c’est important le port forwarding ?

Sur BitTorrent, il existe une différence essentielle :  
tu es soit connectable, soit non connectable.

**Port fermé → non connectable**  
tu inities les connexions pour télécharger  
les autres peers ne peuvent pas se connecter à toi  

Résultat :
tu ne seed qu’aux peers que tu contactes  
tu es peu visible  
upload limité  


**Port ouvert → connectable**  
tu peux initier des connexions  
les autres peuvent se connecter à toi  

Résultat :
plus de peers  
plus d’upload  
seed efficace  

## Pourquoi mon ratio ne monte pas ?

Souvent parce que :

tu n’es pas connectable (port fermé)  
peu de demande sur le torrent  
trop de seeders  

## Puis-je supprimer un torrent juste après téléchargement ?

Mauvaise idée sur tracker privé :

mesure de protection anti H&R  
ton ratio chute  
risque de ban  

## Quelques tips

### Règles de base
 
Toujours penser à ton ratio avant de télécharger  
Un bon setup réseau > un bon tracker  

### Booster son ratio (méthodes propres)

**Seeder longtemps**  
laisser tourner ses torrents H24  
surtout les nouveaux torrents  

Simple, efficace, recommandé.

**Télécharger tôt (early seeding)**  
prendre un torrent dès sa sortie  
beaucoup de leechers → beaucoup d’upload  

Meilleure méthode naturelle.

**Choisir les bons torrents**  
torrents populaires  
peu de seeders / beaucoup de leechers  

Plus de demande = plus d’upload.

**Être connectable (port forwarding)**  
Indispensable :  
plus de connexions  
plus d’upload  
meilleur ratio  

## Quelques Mot-clé

**Freeleech**  
le téléchargement ne compte pas dans ton ratio  
l’upload est toujours compté  

**Silverleech**  
le téléchargement est partiellement compté (ex : 50 %)  
l’upload est entièrement compté  

compromis entre normal et freeleech  

**Double upload**  
ton upload est multiplié (ex : x2)  
ton download reste normal  

permet de monter ton ratio plus rapidement 

**Bonus de seed**  
certains trackers récompensent le temps de seed  
tu gagnes des points en laissant tes torrents actifs  

utilisable pour :  
acheter du crédit upload  
d'autre récompense sur le site  
faire des échanges ou des requêtes  

**Hit & Run (H&R)**  
tu télécharges un torrent sans respecter les règles de seed  
généralement : temps minimum ou ratio minimum non atteint  

peut entraîner :  
avertissement  
restriction  
ban  

**Cross-seed**  
utiliser un même fichier pour plusieurs trackers  
permet :  
d’augmenter l’upload  
d’optimiser le ratio sans retélécharger  

ATTENTION ne pas confondre avec multi-seed  
1 Torrent avec plusieurs tracker = fausse les stats --> Interdit  
1 Torrent par tracker sur les mêmes fichiers --> OK  
