---
layout: default
title: Quel NAS ou Seedbox ?
description: Comparer seedbox, Raspberry Pi, NAS du commerce et serveur DIY pour héberger une stack Servarr.
---

# **Annexe 5 : Quel NAS ou Seedbox ?**

Le meilleur choix dépend surtout de trois choses : votre budget, votre envie de bricoler et le nombre d'utilisateurs.
Il n'existe pas une machine parfaite pour tout le monde.

Avant d'acheter, gardez en tête que le stockage coûte souvent plus cher que la machine elle-même.
Deux bons disques peuvent vite dépasser le prix d'un petit serveur.

## Seedbox

Une seedbox est un **système par abonnement**.
Vous louez un serveur déjà connecté à Internet, souvent avec une très bonne bande passante.

Certaines offres incluent directement les applications utiles à un setup Servarr.
Par exemple, des services comme **Ultra.cc** proposent des applications autour du téléchargement et du streaming, avec Jellyfin ou Plex selon les offres et les plans.

### Pour qui ?

- vous ne voulez pas laisser une machine allumée chez vous ;
- votre connexion Internet a un mauvais upload ;
- vous voulez préserver facilement votre ratio sur les trackers privés ;
- vous préférez payer un abonnement plutôt que gérer du matériel.

### Points forts

- pas de matériel à acheter ;
- très bon débit ;
- pratique pour le torrent et le seed ;
- souvent plus simple pour débuter si l'offre inclut déjà les applications.

### Limites

- coût mensuel permanent ;
- stockage limité par l'abonnement ;
- transcodage parfois limité ou interdit selon les offres ;
- dépendance au fournisseur ;
- moins de liberté qu'une machine à vous.

Une seedbox est souvent le choix le plus simple pour démarrer vite.
Ce n'est pas forcément le moins cher sur plusieurs années.

## Comparaison rapide

L'ordre ci-dessous est une estimation **du plus accessible au plus cher**, mais il varie beaucoup selon les disques, les promotions et le matériel déjà disponible.
Les fourchettes donnent un ordre d'idée en juin 2026 ; pour les machines à la maison, elles sont indiquées **hors disques durs / SSD de stockage**, sauf mention contraire.

| Option | Prix | Puissance | Stockage possible | Idéal pour | Limite principale |
| --- | --- | --- | --- | --- | --- |
| Seedbox | 5 à 30 €/mois, plus pour beaucoup de stockage ou de streaming | Variable selon l'offre | Souvent 1 à 8 To, plus sur offres chères | démarrer sans matériel à la maison | abonnement permanent |
| Raspberry Pi 4/5 | 100 à 250 € avec boîtier, alimentation et petit stockage | Faible à correcte, sans vrai transcodage | 1 à 2 disques USB conseillé | petit serveur léger, faible consommation | peu adapté au transcodage |
| UGREEN NAS | 300 à 900 € boîtier nu | Correcte à bonne selon modèle | 2 à 8 baies selon modèle | NAS moderne prêt à l'emploi | écosystème plus jeune |
| Synology | 250 à 900 € boîtier nu | Correcte, très dépendante du modèle | 2 à 4 baies pour les modèles courants | débutants qui veulent une interface très propre | matériel parfois cher pour la puissance |
| QNAP | 250 à 1 000 € boîtier nu | Correcte à bonne, souvent plus flexible | 2 à 6 baies courantes, plus sur gros modèles | utilisateurs qui veulent plus d'options matérielles | interface plus technique |
| DIY Unraid / TrueNAS | 0 à 400 € si matériel récupéré, 500 à 1 500 €+ en neuf | Très variable, potentiellement élevée | Très variable, souvent 4 à 12 disques ou plus | serveur puissant, évolutif et personnalisable | demande plus de maintenance |

## Raspberry Pi 4/5

Un Raspberry Pi peut héberger une petite stack Servarr si les attentes restent raisonnables.
Il consomme peu, ne prend presque pas de place et coûte moins cher qu'un NAS complet.

### Pour qui ?

- un ou deux utilisateurs ;
- lecture en direct sans transcodage ;
- stockage simple avec SSD ou disque USB ;
- envie d'apprendre Docker sans acheter un gros serveur.

### À savoir

Le Raspberry Pi n'est pas le bon choix si vous voulez transcoder, servir plusieurs utilisateurs en même temps ou brancher beaucoup de disques.
Pour Plex/Jellyfin, il faut privilégier le **direct play** : le fichier doit déjà être compatible avec l'appareil qui lit la vidéo.

## UGREEN NAS

UGREEN propose des NAS modernes avec une approche grand public.
C'est intéressant pour quelqu'un qui veut une machine dédiée, compacte et relativement simple, sans monter un serveur soi-même.

### Pour qui ?

- utilisateur débutant à intermédiaire ;
- besoin d'un NAS récent avec plusieurs baies ;
- envie d'une interface graphique ;
- préférence pour une solution plus clé en main qu'un PC DIY.

### À savoir

UGREEN est attractif sur le matériel, mais son écosystème NAS est plus récent que Synology ou QNAP.
C'est à prendre en compte si vous cherchez surtout une solution très documentée et éprouvée.

## Synology

Synology est souvent le choix rassurant.
L'interface DSM est propre, la documentation est abondante et l'expérience est généralement très accessible.

### Pour qui ?

- débutant qui veut éviter le bricolage ;
- usage familial ;
- sauvegardes, fichiers personnels et serveur média ;
- installation via interface graphique.

### À savoir

Synology est agréable à utiliser, mais le rapport puissance/prix n'est pas toujours le meilleur.
Pour une grosse stack, du transcodage ou beaucoup d'utilisateurs, il faut bien choisir le modèle.

## QNAP

QNAP propose souvent des NAS avec plus d'options matérielles : réseau plus rapide, ports supplémentaires, modèles puissants, extension possible.

### Pour qui ?

- utilisateur qui veut plus de puissance ou d'évolutivité ;
- besoin de 2.5 GbE, 10 GbE ou de plusieurs baies ;
- envie d'un NAS plus flexible qu'une solution très verrouillée.

### À savoir

QNAP peut être très intéressant, mais l'interface demande parfois un peu plus d'attention.
C'est moins "débutant tranquille" que Synology, mais souvent plus riche côté matériel.

## DIY : Unraid ou TrueNAS

Le DIY consiste à construire ou recycler sa propre machine.
Le budget est **très variable** selon ce que vous possédez déjà.

Vous pouvez partir :

- d'un vieux PC gaming réhabilité ;
- d'un mini PC ;
- d'une carte mère dédiée achetée sur AliExpress ;
- d'un boîtier serveur avec plusieurs baies ;
- d'une configuration neuve pensée pour le stockage.

### Unraid

Unraid est populaire pour les serveurs maison.
Il est apprécié pour Docker, les VM, les disques de tailles différentes et une interface plutôt accessible.

C'est souvent un bon choix pour un serveur média évolutif.
La licence est payante, mais l'expérience est confortable.

### TrueNAS

TrueNAS est très solide pour le stockage.
Il est particulièrement intéressant si vous voulez une base sérieuse avec ZFS, snapshots et gestion propre des données.

Il demande un peu plus de rigueur.
Pour un débutant complet, il peut paraître plus strict qu'Unraid.

### À savoir

Un vieux PC peut être presque gratuit si vous l'avez déjà.
Mais il peut aussi consommer plus, faire plus de bruit et prendre plus de place qu'un NAS compact.

Une carte mère dédiée type AliExpress peut donner un excellent rapport puissance/prix, mais elle demande plus de recherche : alimentation, boîtier, refroidissement, ports SATA, réseau, fiabilité.

## Recommandation simple

Si vous ne savez pas quoi choisir :

- **vous voulez aller vite sans matériel** : seedbox ;
- **vous voulez apprendre à petit prix** : Raspberry Pi 5 avec SSD, sans transcodage ;
- **vous voulez simple à la maison** : Synology ou UGREEN ;
- **vous voulez plus d'options matérielles** : QNAP ;
- **vous voulez le meilleur potentiel à long terme** : DIY avec Unraid ou TrueNAS.

Pour un serveur Servarr familial avec plusieurs utilisateurs, évitez de sous-estimer le stockage, le réseau et le transcodage.
Le meilleur serveur est souvent celui qui reste simple à maintenir six mois plus tard.

## Sources utiles

- [Documentation Ultra.cc](https://docs.ultra.cc/)
- [Raspberry Pi 5 Product Brief](https://datasheets.raspberrypi.com/rpi5/raspberry-pi-5-product-brief.pdf)
- [UGREEN NASync](https://nas.ugreen.com/)
- [Synology NAS](https://www.synology.com/)
- [QNAP NAS](https://www.qnap.com/)
- [Unraid](https://unraid.net/product)
- [TrueNAS](https://www.truenas.com/)
