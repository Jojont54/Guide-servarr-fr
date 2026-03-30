# OPTIMISER  : Les YAML

## **OPTIMISER : Les YAML**

Adaptation des Custom-Formats de Pandaarr (sans problème d’espace, ni de transcodage)  
[https://github.com/Pandaarr/arr-custom-formats](https://github.com/Pandaarr/arr-custom-formats)

## Custom format (Les mêmes pour sonarr et radarr)


FR (On prend si y’a que ca, ou VFO)

{  
  "name": "FR",  
  "includeCustomFormatWhenRenaming": false,  
  "specifications": \[  
    {  
      "name": "Langue",  
      "implementation": "LanguageSpecification",  
      "negate": false,  
      "required": true,  
      "fields": {  
        "value": 2,  
        "exceptLanguage": false  
      }  
    },  
    {  
      "name": "480p OUT",  
      "implementation": "ResolutionSpecification",  
      "negate": true,  
      "required": false,  
      "fields": {  
        "value": 480  
      }  
    },  
    {  
      "name": "exclu",  
      "implementation": "ReleaseTitleSpecification",  
      "negate": true,  
      "required": true,  
      "fields": {  
        "value": "\\\\bMULTI(?:\[ .\_-\]?(?:VFI|VFF|VFQ|VF2|VFF2|VFI2|\\\\d))?\\\\b|\\\\b(vfq|vfi|vq)\\\\b|\\\\bFR\\\\s\*\\\\+\\\\s\*\[A-Z\]{2}\\\\b|\\\\b\[A-Z\]{2}\\\\s\*\\\\+\\\\s\*FR\\\\b"  
      }  
    },  
    {  
      "name": "Title FR",  
      "implementation": "ReleaseTitleSpecification",  
      "negate": false,  
      "required": true,  
      "fields": {  
        "value": "\\\\b(vf|truefr|french|francais|français|vof|VFF|VF2|VFF2)\\\\b"  
      }  
    }  
  \]  
}

###   FRQ (On en veut pas) 

{  
  "name": "FRQ",  
  "includeCustomFormatWhenRenaming": false,  
  "specifications": \[  
    {  
      "name": "Langue",  
      "implementation": "LanguageSpecification",  
      "negate": false,  
      "required": true,  
      "fields": {  
        "value": 2,  
        "exceptLanguage": false  
      }  
    },  
    {  
      "name": "480p OUT",  
      "implementation": "ResolutionSpecification",  
      "negate": true,  
      "required": false,  
      "fields": {  
        "value": 480  
      }  
    },  
    {  
      "name": "exclu",  
      "implementation": "ReleaseTitleSpecification",  
      "negate": true,  
      "required": true,  
      "fields": {  
        "value": "\\\\bMULTI(?:\[ .\_-\]?(?:VFI|VFF|VFQ|VF2|VFF2|VFI2|\\\\d))?\\\\b|\\\\b(vf|vff|truefr|french|vof)\\\\b|\\\\bFR\\\\s\*\\\\+\\\\s\*\[A-Z\]{2}\\\\b|\\\\b\[A-Z\]{2}\\\\s\*\\\\+\\\\s\*FR\\\\b"  
      }  
    },  
    {  
      "name": "Title FRQ",  
      "implementation": "ReleaseTitleSpecification",  
      "negate": false,  
      "required": true,  
      "fields": {  
        "value": "\\\\b(vfq|vfi|vq)\\\\b"  
      }  
    }  
  \]  
}

### Multi (C’est ce qu’on préfère)

{  
  "name": "Multi",  
  "includeCustomFormatWhenRenaming": false,  
  "specifications": \[  
    {  
      "name": "Original",  
      "implementation": "LanguageSpecification",  
      "negate": false,  
      "required": false,  
      "fields": {  
        "value": \-2,  
        "exceptLanguage": false  
      }  
    },  
    {  
      "name": "French",  
      "implementation": "LanguageSpecification",  
      "negate": false,  
      "required": false,  
      "fields": {  
        "value": 2,  
        "exceptLanguage": false  
      }  
    },  
    {  
      "name": "480p OUT",  
      "implementation": "ResolutionSpecification",  
      "negate": true,  
      "required": false,  
      "fields": {  
        "value": 480  
      }  
    },  
    {  
      "name": "Title Multi",  
      "implementation": "ReleaseTitleSpecification",  
      "negate": false,  
      "required": true,  
      "fields": {  
        "value": "(?i)\\\\bMULTI(?:\[ .\_-\]?(?:VFI|VFF|VFQ|VF2|VFQ2|VFF2|VFI2|\\\\d))?\\\\b(?\!\[ .\_-\]?subs?)|\\\\bFR\\\\s\*\\\\+\\\\s\*\[A-Z\]{2}\\\\b|\\\\b\[A-Z\]{2}\\\\s\*\\\\+\\\\s\*FR\\\\b"  
      }  
    }  
  \]  
}

### VOSTFR (On prend si y’a que ca)

{  
  "name": "VOST",  
  "includeCustomFormatWhenRenaming": false,  
  "specifications": \[  
    {  
      "name": "480p OUT",  
      "implementation": "ResolutionSpecification",  
      "negate": true,  
      "required": false,  
      "fields": {  
        "value": 480  
      }  
    },  
    {  
      "name": "exclu",  
      "implementation": "ReleaseTitleSpecification",  
      "negate": true,  
      "required": true,  
      "fields": {  
        "value": "\\\\bMULTI(?:\[ .\_-\]?(?:VFI|VFF|VFQ|VF2|VFF2|VFI2|\\\\d))?\\\\b|\\\\b(vf|vff|vfq|vfi|truefr|french|vof)\\\\b|\\\\bFR\\\\s\*\\\\+\\\\s\*\[A-Z\]{2}\\\\b|\\\\b\[A-Z\]{2}\\\\s\*\\\\+\\\\s\*FR\\\\b"  
      }  
    },  
    {  
      "name": "Title Sous-titres",  
      "implementation": "ReleaseTitleSpecification",  
      "negate": false,  
      "required": true,  
      "fields": {  
        "value": "\\\\b(vost|vostfr|subfr|subfrench)\\\\b"  
      }  
    },  
    {  
      "name": "FR",  
      "implementation": "LanguageSpecification",  
      "negate": true,  
      "required": false,  
      "fields": {  
        "value": 2,  
        "exceptLanguage": false  
      }  
    }  
  \]  
}

Profiles  

## Rules Maintainerr

Le tag “perma” doit exister dans sonarr / radarr pour garder des contenus permanents. 

**Films**

* Le demandeur a regardé son film → on le garde 30 jours → puis on peut supprimer. (Si le film n’intéresse que le demandeur)  
* Demandé mais jamais regardé → on laisse 3 mois  
* Film inactif depuis 2 mois → supprimable. (Si le film intéresse plus que le demandeur)  
* La watchlist protège seulement 6 mois.  
* Tout film vieux de plus d’un an → supprimé (garde-fou)  
* Exception : “perma” ne sera jamais supprimé, quoi qu’il arrive.

**Séries / Animes**

* Le demandeur a fini la saison → on garde 1 mois → puis nettoyage. (Ça n’intéressait que le demandeur)  
* Vu par d’autre que le demandeur, mais laissée à l’abandon depuis 2 mois → supprimable.   
* Demandée, jamais lancée, passé 3 mois → supprimable.  
* La watchlist protège seulement 6 mois.  
* Toute saison vieille de \+1 an → supprimé (garde-fou)  
* Exception : “perma” ne sera jamais supprimé, quoi qu’il arrive.

#### Rule Film 

mediaType: MOVIES  
rules:  
  \- "0":  
      \- firstValue: Plex.seenBy  
        action: CONTAINS  
        lastValue: Seerr.addUser  
      \- operator: AND  
        firstValue: Seerr.isRequested  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "true"  
      \- operator: AND  
        firstValue: Seerr.mediaAddedAt  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "30"  
      \- operator: AND  
        firstValue: Plex.watchlist\_isWatchlisted  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "false"  
      \- operator: AND  
        firstValue: Radarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: Perma  
  \- "1":  
      \- operator: OR  
        firstValue: Seerr.mediaAddedAt  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "90"  
      \- operator: AND  
        firstValue: Seerr.isRequested  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "true"  
      \- operator: AND  
        firstValue: Plex.watchlist\_isWatchlisted  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "false"  
      \- operator: AND  
        firstValue: Radarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: Perma  
  \- "2":  
      \- operator: OR  
        firstValue: Plex.lastViewedAt  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "60"  
      \- operator: AND  
        firstValue: Plex.watchlist\_isWatchlisted  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "false"  
      \- operator: AND  
        firstValue: Radarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: Perma  
  \- "3":  
      \- operator: OR  
        firstValue: Plex.addDate  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "365"  
      \- operator: AND  
        firstValue: Radarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: Perma  
  \- "4":  
      \- operator: OR  
        firstValue: Plex.watchlist\_isWatchlisted  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "true"  
      \- operator: AND  
        firstValue: Plex.addDate  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "180"  
      \- operator: AND  
        firstValue: Radarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: Perma

### Rule série et animes (Créé 2 règles si les profiles sont séparé dans sonarr)

mediaType: SEASONS  
rules:  
  \- "0":  
      \- firstValue: Seerr.isRequested  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "true"  
      \- operator: AND  
        firstValue: Plex.sw\_lastWatched  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "60"  
      \- operator: AND  
        firstValue: Plex.watchlist\_isWatchlisted  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "false"  
      \- operator: AND  
        firstValue: Sonarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: perma  
  \- "1":  
      \- operator: OR  
        firstValue: Seerr.isRequested  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "true"  
      \- operator: AND  
        firstValue: Plex.sw\_viewedEpisodes  
        action: EQUALS  
        customValue:  
          type: number  
          value: 0  
      \- operator: AND  
        firstValue: Plex.sw\_lastEpisodeAddedAt  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "90"  
      \- operator: AND  
        firstValue: Plex.watchlist\_isWatchlisted  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "false"  
      \- operator: AND  
        firstValue: Sonarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: perma  
  \- "2":  
      \- operator: OR  
        firstValue: Seerr.isRequested  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "true"  
      \- operator: AND  
        firstValue: Plex.sw\_allEpisodesSeenBy  
        action: CONTAINS  
        lastValue: Seerr.addUser  
      \- operator: AND  
        firstValue: Plex.lastViewedAt  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "30"  
      \- operator: AND  
        firstValue: Plex.watchlist\_isWatchlisted  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "false"  
      \- operator: AND  
        firstValue: Sonarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: perma  
  \- "3":  
      \- operator: OR  
        firstValue: Plex.addDate  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "365"  
      \- operator: AND  
        firstValue: Sonarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: perma  
  \- "4":  
      \- operator: OR  
        firstValue: Plex.watchlist\_isWatchlisted  
        action: EQUALS  
        customValue:  
          type: boolean  
          value: "true"  
      \- operator: AND  
        firstValue: Plex.addDate  
        action: BEFORE  
        customValue:  
          type: custom\_days  
          value: "180"  
      \- operator: AND  
        firstValue: Sonarr.tags  
        action: NOT\_CONTAINS\_PARTIAL  
        customValue:  
          type: text  
          value: perma

