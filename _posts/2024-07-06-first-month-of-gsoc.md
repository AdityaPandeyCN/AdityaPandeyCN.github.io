---
layout: post
title: "First Month of GSoC"
date: 2024-07-06 00:00:00
description: "A recap of my first month with GSoC at INCF: SWC parsing, software practices, and UCL lab meetings."
tags: GSoC open-source neuroscience
categories: blog
thumbnail: assets/img/nerve.jpg
---

![Neuronal morphology]({{ '/assets/img/nerve.jpg' | relative_url }}){: width="100%"}

This is about my experience in Google Summer of Code, a recap of the first month with INCF.

## Pre-cap of my first month

Continuing my previous post about GSoC with INCF, I'm writing down what I learned.

The first month went like the wind, probably the most impactful month for me learning programming. It's been an incredible journey of growth and discovery, both in technical skills and professional development.

One major accomplishment was creating a pull request that added a new module for loading and parsing SWC files. Developing this module taught me a lot about file handling, data structures, and efficient parsing techniques.

Perhaps most important was learning software development best practices, which dramatically improved the quality and maintainability of my code:

1. **Writing test files:** thorough unit tests from my mentors, catching bugs early.
2. **Adding docstrings:** clear documentation so anyone can understand and contribute.
3. **Implementing type hints:** more readable code and fewer type-related errors.
4. **Utilizing logger functions:** proper logging instead of `print`, making debugging far more efficient.

These practices gave me a deeper understanding of what it means to be a professional software developer. Support from my mentors at INCF has been invaluable.

## UCL lab meetings

I was fortunate enough to attend Silver Lab's weekly meeting, where they discuss lab challenges and researchers share learnings of the week. Academia's calm, composed culture stands out. Much of technological progress stands on the shoulders of research work done there. I don't always follow every paper discussion, but thinking from first principles helps everything click.

## What's next

Until now we have developed a program to successfully load and parse SWC data. The next step is converting it to NeuroML, covering edge cases and understanding soma handling. Thankfully I have Cvapp (a Java-based converter developed by my other mentor Padraig Gleeson) to look up to.

Thank you for joining me on this adventure. Looking forward to sharing more challenges and lessons in the next posts.

Happy reading!
