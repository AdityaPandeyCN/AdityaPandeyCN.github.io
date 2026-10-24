---
layout: page
title: NeuroTabModels.jl
description: Deep learning for tabular data, compiled to XLA with Reactant.jl and differentiated with Enzyme.
permalink: /work/neurotabmodels/
importance: 2
category: work
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">

<dl class="pf-facts">
  <dt>Organisation</dt>
  <dd>Evovest</dd>
  <dt>Period</dt>
  <dd>2026 – present</dd>
  <dt>Stack</dt>
  <dd>Julia, Lux.jl, Reactant.jl, Enzyme, Zygote</dd>
  <dt>Code</dt>
  <dd><a href="https://github.com/Evovest/NeuroTabModels.jl">Evovest/NeuroTabModels.jl</a></dd>
</dl>

NeuroTabModels is Evovest's library of neural networks for tabular data. I rebuilt its training stack and added recent architectures from the tabular deep learning literature.

## What I did

- **Compiled training with Reactant.jl.** I moved the models to Lux.jl and compiled training and inference to XLA through Reactant.jl, instead of running them op by op from Julia.
- **Multiple AD backends.** Gradients come from Enzyme or Zygote, on CPU, GPU or Reactant, each loaded only when the user asks for it.
- **New architectures.** TabM in all three of its variants, ModernNCA, numerical embeddings shared by every model, and temporal embeddings for time-dependent data.
- **ModernNCA at scale.** ModernNCA attends over the whole training set, so memory grew with the data. I rewrote its attention to work in chunks with a FlashAttention-style backward pass, so memory stays flat no matter how large the training set is (in review).
