---
layout: post
title: "Google Summer of Code with INCF"
date: 2024-06-13 00:00:00
description: "Getting started with GSoC 2024 at INCF: NeuroML, SWC morphology conversion, and mentorship."
tags: GSoC open-source neuroscience
categories: blog
thumbnail: assets/img/gsoc-banner.png
---

![GSoC]({{ '/assets/img/gsoc-banner.png' | relative_url }}){: width="100%"}

Welcome to my second post. I'm excited to share my thoughts and experiences about Google Summer of Code.

## What is this post about?

This post covers my initial experience with Google Summer of Code with [INCF](https://www.incf.org/) (International Neuroinformatics Coordinating Facility).

## The organization: INCF

INCF promotes the field of neuroinformatics and aims to advance data reuse and reproducibility in global brain research.

INCF works on exciting applications of computer science to medical data and serves as an umbrella organization for many projects worldwide. The primary reasons INCF felt like a natural fit:

- INCF has participated as a mentoring organization in GSoC since 2011.
- An interesting and well-documented list of ideas (released early, around December).
- A systematic, well-organized, and welcoming community of passionate people from diverse backgrounds.

## The proposal

I started contributing in December 2023 through April 2024 and began writing my proposal around mid-March. After talking to my mentor I quickly made a first draft with a rough estimate of the work. Writing a proposal is an iterative process. Regular feedback from my mentor [Ankur Sinha](https://profiles.ucl.ac.uk/77575-ankur-sinha) helped me fine-tune the timeline and add detail.

## My experience

In my initial phase of learning Machine Learning basics, a senior advised me to watch Geoffrey Hinton's lectures on Neural Networks. I watched the first few lectures and understood how neural networks are designed with reference to the brain. I wanted to know more and found the NeuroML project. I started contributing by raising PRs; during this phase my mentor Ankur Sinha helped me immensely with huge patience. Finally, I got selected into Google Summer of Code. I was thrilled.

My GSoC project involves developing an interactive SWC to NeuroML converter in Python. The SWC format is widely used for representing neuronal morphology data, while NeuroML is a standardized format for describing biophysically detailed neuronal models.

The converter simplifies converting SWC data into NeuroML, making it easier for researchers to integrate morphological data into computational models. A key component is an interactive tool that lets users visualize and manipulate neuronal morphology before converting to NeuroML.

To ensure robustness, I tested against a range of neuronal reconstructions from [NeuroMorpho.org](https://neuromorpho.org/). The project is hosted with the NeuroML community. I am deeply grateful to Google for this opportunity and to my mentors, Ankur Sinha and Padraig Gleeson, for their guidance.

## What's next?

In the coming posts, I plan to write about the technical challenges I face during GSoC, plus updates on personal projects and lessons learned along the way.

Happy reading!
