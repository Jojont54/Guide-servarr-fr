# **FAQ : Torrents**

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

**Exemples :**  
ProtonVPN  
Private Internet Access  
AirVPN  

**À éviter pour cet usage :**  
les VPN sans port forwarding (ex : NordVPN)  

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