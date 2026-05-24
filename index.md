---
layout: default
title: Accueil
description: Guide francophone pour monter et optimiser un serveur multimédia automatisé avec la suite Arr.
permalink: /
home: true
---

{% capture readme_content %}{% include_relative README.md %}{% endcapture %}
{% assign readme_content = readme_content
  | replace: 'Docs/01-demarrer.md', 'Docs/01-demarrer.html'
  | replace: 'Docs/02-optimiser-base.md', 'Docs/02-optimiser-base.html'
  | replace: 'Docs/03-ajouter-applications.md', 'Docs/03-ajouter-applications.html'
  | replace: 'Docs/04-optimiser-applications.md', 'Docs/04-optimiser-applications.html'
  | replace: 'Docs/annexe-1-docker-reseau.md', 'Docs/annexe-1-docker-reseau.html'
  | replace: 'Docs/annexe-2-video.md', 'Docs/annexe-2-video.html'
  | replace: 'Docs/annexe-3-torrents.md', 'Docs/annexe-3-torrents.html' %}
{{ readme_content | markdownify }}
