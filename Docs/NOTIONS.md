# **NOTIONS : Réseau et hardlinks en pratique**

Cette page sert surtout quand quelque chose ne marche pas :

- une application n’arrive pas à joindre une autre
- Radarr/Sonarr n’importent pas
- les fichiers sont copiés au lieu d’être hardlinkés
- Plex/Jellyfin ne voit pas les médias

Pour le parcours principal, commencez plutôt par [DÉMARRER](DEMARRER.md).

## Quand une app doit parler à une autre

Chaque application a une interface web accessible avec :

```text
IP de la machine + port
```

Exemples depuis votre navigateur :

```text
http://192.168.1.10:8080  → qBittorrent
http://192.168.1.10:9696  → Prowlarr
http://192.168.1.10:7878  → Radarr
http://192.168.1.10:8989  → Sonarr
```

Mais entre conteneurs Docker, on utilise souvent le nom du conteneur :

```text
http://qbittorrent:8080
http://prowlarr:9696
http://radarr:7878
http://sonarr:8989
```

Exemple :

Dans Sonarr, pour connecter qBittorrent :

```text
Host : qbittorrent
Port : 8080
```

Si ça ne marche pas, vérifiez :

- les deux conteneurs sont démarrés
- ils sont sur le même réseau Docker
- le nom du conteneur est correct
- le port interne est correct
- l’identifiant et le mot de passe sont corrects

## API Key

Une API Key est une clé d’accès entre applications.

Elle permet par exemple :

- à Prowlarr d’envoyer les indexers à Radarr/Sonarr
- à Seerr d’envoyer une demande à Radarr/Sonarr
- à Cross-seed de consulter Radarr/Sonarr/Prowlarr

Dans Radarr/Sonarr, elle se trouve généralement dans :

```text
Settings → General → Security
```

Si une application refuse de se connecter alors que l’adresse est bonne, vérifiez l’API Key.

## Hardlink

Un hardlink permet d’avoir le même fichier visible à deux endroits.

Exemple :

```text
/data/downloads/torrents/Film.2024.mkv
/data/library/movies/Film (2024)/Film (2024).mkv
```

Le fichier reste seedable dans qBittorrent, mais il est aussi rangé proprement pour Plex/Jellyfin.

Important :

- ce n’est pas une copie
- ce n’est pas un raccourci
- l’espace disque n’est utilisé qu’une fois

## Conditions pour que les hardlinks marchent

Les hardlinks ont besoin de chemins cohérents.

Bon principe :

```text
qBittorrent → /data
Radarr      → /data
Sonarr      → /data
```

Mauvais principe :

```text
qBittorrent → /downloads
Radarr      → /movies
Sonarr      → /series
```

Même si les dossiers pointent vers le bon endroit côté machine, les applications ne voient pas les mêmes chemins.
Ça complique les imports et peut casser les hardlinks.

## Symptômes fréquents

**Le téléchargement est terminé, mais Radarr/Sonarr n’importe pas**  
Vérifiez les chemins.
Radarr/Sonarr doivent voir le fichier au même endroit que qBittorrent.

**Radarr/Sonarr copie le fichier au lieu de faire un hardlink**  
Vérifiez que `/downloads` et `/library` sont sur le même disque/filesystem.
Vérifiez aussi que Radarr/Sonarr ont bien accès au dossier parent `/data`.

**Plex/Jellyfin ne voit pas le film**  
Vérifiez que Radarr/Sonarr importent bien dans `/data/library`.
Puis relancez une analyse de bibliothèque.

**Prowlarr ne synchronise pas avec Radarr/Sonarr**  
Vérifiez l’adresse, le port et l’API Key.

## Résumé

Pour éviter 80 % des problèmes :

- donnez le même `/data` à qBittorrent, Radarr et Sonarr
- utilisez les noms de conteneurs pour connecter les apps entre elles
- gardez les API Keys sous la main
- vérifiez les chemins avant de toucher aux profils qualité
