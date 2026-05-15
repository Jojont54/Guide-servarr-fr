# **Vidéo : comprendre les releases**

Quand on configure Radarr/Sonarr, on ne choisit pas seulement une résolution.
On choisit un compromis entre **qualité**, **taille**, **compatibilité**, **stockage** et **transcodage**.

Le nom d'une release contient souvent tout ce qu'il faut savoir :

`Film.2024.1080p.WEB-DL.x265.DV.HDR10.Atmos.TrueHD.7.1-Groupe`

## Source

La **source** indique d'où vient la vidéo avant compression.

**WEB-DL**  
Fichier récupéré directement depuis une plateforme de streaming.
Très propre, sans logo TV, sans coupure pub.
C'est souvent le meilleur choix pour les films et séries récents.

**WEBRip**  
Capture ou extraction réencodée depuis une plateforme de streaming.
Peut être très bon, mais généralement un peu moins propre qu'un WEB-DL.

**BluRay**  
Vidéo issue d'un disque Blu-ray, souvent réencodée.
Très bonne qualité, surtout pour les films.

**Remux**  
Copie quasi directe du Blu-ray, sans réencodage vidéo.
Qualité maximale, mais fichiers très lourds.
Excellent pour une médiathèque premium, moins pratique si le stockage est limité.

**HDTV / TVRip**  
Capture TV.
Qualité plus variable, parfois logo, coupures ou compression plus visible.
A éviter si une version WEB-DL existe.

**CAM / TS / TC**  
Captures cinéma ou sources très faibles.
A bloquer dans une configuration propre.

## Résolution

La résolution indique le nombre de pixels.
Plus haut ne veut pas toujours dire meilleur si l'encodage est mauvais.

**480p**  
Très léger, utile seulement pour les petits écrans ou les contenus rares.

**720p**  
Correct pour séries légères, vieux contenus ou stockage limité.

**1080p**  
Le meilleur choix général.
Bonne qualité, taille raisonnable, excellente compatibilité.

**2160p / 4K**  
Très bonne qualité, mais fichiers lourds.
Demande plus de stockage, un bon réseau local et des clients capables de lire la 4K sans transcodage.

## Codec vidéo

Le codec est la méthode utilisée pour compresser la vidéo.

**x264 / H.264 / AVC**  
Le plus compatible.
Lecture facile partout : TV, navigateur, téléphone, Plex, Jellyfin.
Très bon choix par défaut.

**x265 / H.265 / HEVC**  
Meilleure compression que x264.
Même qualité pour une taille plus petite, surtout en 1080p/4K.
Moins compatible avec certains vieux appareils.
Peut provoquer du transcodage si le client ne le supporte pas.

**AV1**  
Codec moderne et très efficace.
Très bon sur le papier, mais compatibilité encore variable.
A utiliser seulement si vos clients le lisent correctement.

**XviD / DivX**  
Anciens codecs.
Souvent liés à de vieilles releases SD.
A éviter sauf contenu rare.

## Qualité et bitrate

Le **bitrate** correspond au débit vidéo.
Plus il est élevé, plus le fichier peut conserver de détails, mais plus il est lourd.

Un bon 1080p bien encodé peut être meilleur qu'un mauvais 4K trop compressé.

Repères simples :

- 1080p léger : 2 à 5 Go pour un film
- 1080p propre : 6 à 12 Go pour un film
- 4K compressé : 10 à 25 Go pour un film
- 4K Remux : 40 à 90 Go pour un film

## HDR, DV et SDR

**SDR**  
Image classique.
Compatible partout.

**HDR10**  
Image avec plus de dynamique et de couleurs.
Très courant en 4K.
Nécessite un écran compatible HDR pour un rendu correct.

**Dolby Vision / DV**  
HDR avancé.
Très beau quand toute la chaîne est compatible.
Peut poser problème selon le lecteur, la TV, le conteneur ou le profil Dolby Vision.

Pour une configuration simple :

- en 1080p, rester en SDR est souvent le plus simple
- en 4K, HDR10 est le choix le plus universel
- DV est excellent, mais à garder si vos lecteurs le supportent bien

## Audio

L'audio peut aussi déclencher du transcodage.

**AAC**  
Léger et très compatible.
Très bien pour séries ou petits fichiers.

**AC3 / Dolby Digital**  
Compatible avec beaucoup de TV, barres de son et amplis.
Bon choix général.

**EAC3 / Dolby Digital Plus**  
Très courant sur les plateformes de streaming.
Bon compromis qualité/compatibilité.

**DTS**  
Bonne qualité, mais compatibilité plus variable selon les TV.

**TrueHD / DTS-HD MA**  
Audio Blu-ray lossless.
Très bonne qualité, mais lourd et moins compatible.
Souvent utile seulement avec ampli/home cinéma compatible.

**Atmos**  
Format audio orienté home cinéma.
Peut être basé sur EAC3 ou TrueHD.
La compatibilité dépend du lecteur et de l'installation audio.

## Langues

Pour un serveur francophone, les tags importants sont :

**FRENCH / FR**  
Audio français.

**VFF**  
Version française de France.

**VFQ**  
Version française québécoise.

**MULTi**  
Plusieurs langues incluses.
Souvent intéressant si vous voulez garder VO + VF.

**VOSTFR**  
Version originale avec sous-titres français.

**SUBFRENCH**  
Sous-titres français inclus.

## Sous-titres

**SRT**  
Sous-titres texte.
Très compatible.

**PGS**  
Sous-titres image issus du Blu-ray.
Peuvent provoquer du transcodage avec Plex/Jellyfin selon le client.

**Forced / Forcés**  
Sous-titres uniquement pour les passages en langue étrangère.
Très important pour les films en VF avec quelques dialogues non traduits.

## Conteneur

Le conteneur est le fichier qui contient la vidéo, l'audio et les sous-titres.

**MKV**  
Le plus courant pour une médiathèque.
Très souple : plusieurs pistes audio, sous-titres, chapitres.

**MP4**  
Très compatible, surtout mobile/navigateur.
Moins souple que MKV pour certains usages.

**AVI**  
Ancien format.
A éviter sauf contenu rare.

## Transcodage

Le transcodage arrive quand le serveur doit convertir la vidéo, l'audio ou les sous-titres pendant la lecture.

Ca peut arriver si :

- le client ne supporte pas le codec vidéo
- le client ne supporte pas l'audio
- les sous-titres doivent être incrustés
- le débit est trop élevé pour le réseau
- la résolution est trop haute pour le client

Objectif idéal : **Direct Play**.
Le fichier est lu tel quel, sans conversion.

Pour limiter le transcodage :

- privilégier x264 pour compatibilité maximale
- utiliser x265 seulement si vos clients le lisent bien
- éviter les sous-titres PGS si vous avez des problèmes
- garder une piste audio AC3/EAC3/AAC quand possible
- éviter la 4K pour les utilisateurs à distance si l'upload est limité

## Ce qu'il faut viser pour Servarr

Configuration simple et efficace :

- Séries : `1080p WEB-DL x264` ou `1080p WEB-DL x265`
- Films : `1080p WEB-DL` ou `1080p BluRay`
- 4K : seulement pour les films importants et les clients compatibles
- Audio : garder AC3/EAC3/AAC en priorité
- Sous-titres : SRT ou sous-titres forcés propres
- A bloquer : CAM, TS, TC, mauvais rips, sources TV si une source WEB existe

Configuration premium :

- Films favoris en `2160p BluRay Remux` ou `2160p WEB-DL`
- HDR10 privilégié pour la compatibilité
- Dolby Vision seulement si toute votre chaîne le supporte
- Audio lossless si vous avez un vrai équipement home cinéma

Configuration stockage limité :

- 1080p x265 pour les films et séries
- éviter les Remux
- éviter la 4K sauf exception
- préférer WEB-DL propre à très gros BluRay

## Lecture d'un nom de release

`Serie.S01E01.1080p.WEB-DL.MULTi.EAC3.x264-Groupe`

- `S01E01` : saison 1, épisode 1
- `1080p` : résolution
- `WEB-DL` : source propre streaming
- `MULTi` : plusieurs langues
- `EAC3` : audio Dolby Digital Plus
- `x264` : codec vidéo compatible

`Film.2020.2160p.BluRay.Remux.HDR10.TrueHD.7.1.x265-Groupe`

- `2160p` : 4K
- `BluRay Remux` : qualité maximale depuis Blu-ray
- `HDR10` : image HDR
- `TrueHD 7.1` : audio lossless lourd
- `x265` : codec vidéo HEVC

## Résumé

Pour commencer sans se tromper :

**1080p WEB-DL x264/x265 + audio EAC3/AC3/AAC + sous-titres SRT/forced**

C'est le meilleur équilibre pour un serveur Servarr propre, compatible et facile à maintenir.
