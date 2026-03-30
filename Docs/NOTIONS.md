# **QUELQUES NOTIONS : Réseau & Hardlink**

## Réseau

**Chaque machine a une adresse.**

192.168.1.10 → IP de ta machine / NAS

**Chaque application a un port.** 

192.168.1.10:8080 → IP \+ Port de l’application

Permet par exemple d'accéder à l’interface graphique si elle existe dans un navigateur:

[http://192.168.1.10:8080](http://192.168.1.10:8080)

**API Key (clé d’accès)**

Certaines applications demandent une **clé API** → C’est comme un mot de passe entre applications.

**Docker crée un réseau automatiquement**

Quand on utilise Docker Compose :

tous les services sont sur le **même réseau**

donc ils peuvent se parler directement 

192.168.1.10:8080 depuis l’exterieur du réseau peut devenir qbittorrent:8080 dans le réseau

**Exemple concret**

Dans Sonarr :

* URL : `http://qbittorrent:8080`  
* API Key : `xxxxxxxx`

→ permet à Sonarr de :

* ajouter des téléchargements  
* contrôler partiellement qBittorrent  
* trier les téléchargements dans le dossier bibliothèque

## Hardlink

Un hardlink, c’est : Un second nom (ou chemin) qui pointe vers le même fichier physique.

Tu as un fichier :

/downloads/film.2000.1080p.ACC.nom.a.ralonge.mkv

Tu crées un hardlink :

/movies/film \- 2000.mkv

Résultat :

* Ce n’est PAS une copie  
* Ce n’est PAS un raccourci

C’est **le même fichier**, accessible à deux endroits

→ Tu seed le fichier, il est disponible et rangé ailleurs mais l’espace est consommé une fois \!

Les conditions pour que ça marche : TRÈS IMPORTANT  
Même disque / même filesystem

/mnt/user/data/downloads

/mnt/user/data/library

L’application doit avoir accès au 2, dans le même filesystem 

→ Plutôt que de donner à sonarr :

- /mnt/user/data/downloads → /download  
- /mnt/user/data/library → /library

**On donne accès à /mnt/user/data/** ou on crée un sous-dossier (par exemple /mnt/user/data/streaming) contenant download et library.

## Résumé

Chaque app demandera l'accès au apps voisines via IP, port et APIkey.   
Chaque app a besoin d’espace sur le disque pour faire son travail: 

- ses données propres (appdata), base de données, etc.  
- les données sur le disque (library, download), pour le traitement