# **LES BASES : Machine virtuel et Docker**

## Machine virtuelle

Une **machine virtuelle (VM)**, c’est : Un ordinateur complet simulé à l’intérieur de ton ordinateur

Elle possède :

* son propre système d’exploitation (Windows, Linux…)  
* son CPU, RAM, disque (virtuels)  
* son réseau 

On utilise une VM quand on veut :

* Tester un OS (Linux, Windows…)  
* Isoler un environnement  
* Faire du dev propre  
* Simuler un serveur  
* Lancer un OS différent (ex: Linux sur Windows)

Nous voulons **isoler les apps** mais les VM ont des limites :

* Lourd (RAM \+ CPU)  
* Lent à démarrer  
* Duplique un OS entier  
* Peu pratique pour multiplier les services

C’est pour ça que Docker existe 

## Docker

**Docker** est une plateforme pour lancer des applications dans des conteneurs isolés

Un conteneur \= une app \+ tout ce dont elle a besoin pour fonctionner

Mais pas d’OS complet, utilise l’OS hôte.

Docker est donc idéal :

* Très rapide à démarrer  
* Léger (pas d’OS à dupliquer)  
* Facile à reproduire  
* Chaque app est isolée des autres

Configuration d’un app dans docker → docker compose

La configuration contient : 

* **Les volumes** → Pour stocker les données  
  * films  
  * base de données  
  * fichiers utilisateurs

Sans volume → les données sont perdues si le conteneur est recréé. 

L’app est isolée du système, le volume permet de donner accès à des dossiers, des fichiers à l'application. 

Dossier dans l’OS → Dossier dans l’app

`/mnt/user/data/mes-photos → /photos`

* **Les ports** → Accès réseau de l’app

pour accéder à l’application (interface web) ou connecter 2 apps entre-elles

`192.168.1.10:8080`

* **L'environnement (Variables) →** Paramètres de configuration  
  * mot de passe  
  * fuseau horaire  
  * utilisateur

`USER_PASSWORD = UnMDPderêve`

## Docker compose

**Docker Compose** est un outil permettant de **définir et lancer un ou plusieurs conteneurs Docker**.  
Il utilise un fichier **.yaml** qui décrit :

- les conteneurs à lancer  
- leur configuration (ports, volumes, variables d’environnement)  
- leurs interactions (réseau, dépendances)  

Chaque application est **isolée du système** et n’a accès qu’aux ressources qu’on lui autorise (dossiers, réseau, paramètres, etc.).

Une analogie simple : lors de l’installation d’un logiciel sur Windows, une fenêtre de configuration apparaît, et on clique souvent sur “Suivant” sans trop réfléchir.  
Le fichier `.yaml` remplace cette étape… **mais de manière écrite, reproductible et modifiable à tout moment**.

Docker Compose permet ainsi de **recréer exactement la même application en une seule commande**.  
En sauvegardant ses fichiers `.yaml`, on dispose en pratique d’un **backup de la configuration de ses applications**.

> Cela ne sauvegarde pas les données (fichiers, bases de données), uniquement la configuration.

```yaml
version: "3"

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

Ici nous créons Sonarr, on lui donne un nom, on choisi le repo source, et quelques paramètres, puis on lui donne comme dit plus haut: 
- du réseau (port)
- un environement (PUID / PGID, droit accès en lecture ecriture)
- des accès au disques / au fichiers, ici un dossier qui s'appellera /config dans l'app mais qui écrit sur /mnt/user/appdata/sonarr de notre ordinateur. Et le dossier /data

De nombreuses méthodes simplifie ce processus:
- L'interface Docker de Unraid
- Portainer.io
- La bibliothèque app de Ultra.cc
- Synology, QNAP, Ugreen, etc. 

Ces interfaces évitent d’écrire le fichier YAML à la main. Mais il est toujours possible d'utilise docker compose dans le terminal en ligne de commande.

## Résumé

On peut utiliser le VM ou Docker pour isoler les applications entre elles.   
Dans notre usage nous allons isoler nos différents services et usages.

- Streaming  
- Cloud  
- Serveur minecraft  
- etc
