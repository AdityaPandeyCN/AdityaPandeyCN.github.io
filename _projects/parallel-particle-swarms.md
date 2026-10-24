---
layout: page
title: ParallelParticleSwarms.jl
description: Particle swarm optimization inside GPU kernels, made to scale to any problem dimension and to handle ill-conditioned problems.
permalink: /work/parallel-particle-swarms/
importance: 3
category: work
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">

<dl class="pf-facts">
  <dt>Organisation</dt>
  <dd>SciML</dd>
  <dt>Period</dt>
  <dd>2026 – present</dd>
  <dt>Stack</dt>
  <dd>Julia, KernelAbstractions.jl, CUDA.jl</dd>
  <dt>Code</dt>
  <dd><a href="https://github.com/SciML/ParallelParticleSwarms.jl">SciML/ParallelParticleSwarms.jl</a></dd>
</dl>

ParallelParticleSwarms.jl runs global optimization with whole particle swarms inside GPU kernels, for problems such as fitting the parameters of ODE models.

## What I did

- **GPU kernels that scale with dimension.** The kernels kept full particles in shared memory, so they stopped compiling once problems had more than a few dimensions. I restructured the reductions so shared memory no longer depends on the problem size.
- **A working hybrid local search.** The L-BFGS phase that refines the swarm's best points minimized the wrong quantity and could not solve ill-conditioned problems. I rewrote it as a projected L-BFGS with a Strong Wolfe line search that runs inside the GPU kernel.
- **Benchmarks.** I built the particle swarm benchmarks in SciMLBenchmarks.jl, including neural ODE parameter estimation.
