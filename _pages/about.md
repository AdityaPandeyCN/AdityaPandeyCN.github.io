---
layout: default
title: home
permalink: /
description: Performance engineering for numerical and machine learning software.
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">
<canvas id="pf-swarm" class="pf-swarm" aria-hidden="true"></canvas>
<script src="{{ '/assets/js/swarm.js' | relative_url }}" defer></script>

<section class="pf-intro">
  <div class="pf-photo">
    <div class="pf-photo-crop">
      <img src="{{ 'assets/img/prof_pic.jpg' | relative_url }}" alt="Aditya Pandey" width="1000" height="1000">
    </div>
  </div>
  <div class="pf-intro-text">
    <h1>Aditya Pandey</h1>
    <p>
      I work on the performance of numerical and machine learning software: GPU kernels, compiled training loops, automatic differentiation, and the
      I/O that feeds them.
    </p>
    <p>
      I'm currently consulting for <a href="https://evovest.com/">Evovest</a> on their open-source machine learning stack, and I'm open to contract work on
      GPU and performance problems.
    </p>
    <p class="pf-links">
      <a href="mailto:adityapand3y666@gmail.com">Email</a>
      <a href="https://github.com/AdityaPandeyCN">GitHub</a>
      <a href="https://www.linkedin.com/in/aditya-pandey-019482200">LinkedIn</a>
      <a href="{{ '/cv/' | relative_url }}">CV</a>
    </p>
  </div>
</section>

<section class="pf-section">
  <h2>Selected work</h2>
  <ul class="pf-list">
    <li>
      <a href="{{ '/work/evotrees/' | relative_url }}">EvoTrees.jl</a> <span class="pf-org">Evovest</span>
      <p>Rewrote the GPU backend of a gradient-boosting library with KernelAbstractions.jl, so the same kernels run on NVIDIA, AMD and Apple GPUs.</p>
    </li>
    <li>
      <a href="{{ '/work/neurotabmodels/' | relative_url }}">NeuroTabModels.jl</a> <span class="pf-org">Evovest</span>
      <p>Rebuilt training for a tabular deep learning library on Lux.jl and Reactant.jl, and added TabM, ModernNCA and numerical embeddings.</p>
    </li>
    <li>
      <a href="{{ '/work/parallel-particle-swarms/' | relative_url }}">ParallelParticleSwarms.jl</a> <span class="pf-org">SciML</span>
      <p>Restructured the GPU kernels of a particle swarm optimizer so they scale with problem size, and rewrote its L-BFGS local search.</p>
    </li>
    <li>
      <a href="{{ '/work/ramtools/' | relative_url }}">RAMTools</a> <span class="pf-org">CERN-HSF</span>
      <p>Built RAM, a ROOT-based format for genomic alignment data, and RAMTools for working with it during Google Summer of Code 2025: multithreaded conversion from SAM and BAM, and index-free region queries.</p>
    </li>
  </ul>
</section>

<section class="pf-section">
  <h2>Things I can help with</h2>
  <ul class="pf-plain">
    <li>Porting CUDA-only code to kernels that run on any GPU vendor</li>
    <li>Profiling and restructuring GPU kernels</li>
    <li>Compiling and differentiating models through XLA and Enzyme</li>
    <li>Multithreaded I/O and columnar data formats</li>
    <li>Benchmark suites that catch regressions</li>
  </ul>
</section>

<p class="pf-note pf-caption">
  The background is a particle swarm searching a randomly generated landscape for its lowest point, the method
  <a href="{{ '/work/parallel-particle-swarms/' | relative_url }}">ParallelParticleSwarms.jl</a> runs on GPUs.
</p>
