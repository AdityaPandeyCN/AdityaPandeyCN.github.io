---
layout: page
title: work
permalink: /work/
description: GPU and performance work on open-source libraries.
nav: true
nav_order: 1
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">

{% assign projects = site.projects | sort: "importance" %}

<div class="pf-section">
<ul class="pf-list">
  {% for project in projects %}
    <li>
      <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
      <p>{{ project.description }}</p>
    </li>
  {% endfor %}
</ul>
</div>
