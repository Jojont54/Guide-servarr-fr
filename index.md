---
layout: default
title: Accueil
description: Guide francophone pour monter et optimiser un serveur multimédia automatisé avec la suite Arr.
permalink: /
home: true
---

{% capture readme_content %}{% include_relative README.md %}{% endcapture %}
{{ readme_content | markdownify }}
