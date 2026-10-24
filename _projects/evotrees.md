---
layout: page
title: EvoTrees.jl
description: A rewrite of the GPU backend for gradient-boosted trees, portable across GPU vendors.
permalink: /work/evotrees/
importance: 1
category: work
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">

<dl class="pf-facts">
  <dt>Organisation</dt>
  <dd>Evovest</dd>
  <dt>Period</dt>
  <dd>2025 – present</dd>
  <dt>Stack</dt>
  <dd>Julia, KernelAbstractions.jl, CUDA.jl, AMDGPU.jl</dd>
  <dt>Code</dt>
  <dd><a href="https://github.com/Evovest/EvoTrees.jl">Evovest/EvoTrees.jl</a></dd>
</dl>

EvoTrees is a gradient-boosting library written in pure Julia. Its GPU backend only ran on NVIDIA, and it fell well behind XGBoost on deep trees, because split selection ran node by node with frequent trips back to the CPU.

## What I did

- **Rewrote the GPU backend.** The whole tree-building loop now stays on the device: histograms, gains and split selection, parallel over every node and feature of a tree level at once. That removes the per-node overhead that made deep trees slow.
- **Made it portable.** The kernels are written once with KernelAbstractions.jl and run on NVIDIA, AMD and Apple GPUs.
- **Unified CPU and GPU.** Both backends share the same loss math and data layout, so the two stay consistent.
- **Added multi-target regression** on CPU and GPU, fitting several targets jointly with one tree structure.
