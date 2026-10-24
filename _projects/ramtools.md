---
layout: page
title: RAMTools
description: Tools for RAM (ROOT Alignment/Map), a format for genomic alignment data built on ROOT's RNTuple.
permalink: /work/ramtools/
importance: 4
category: work
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio.css' | relative_url }}">

<dl class="pf-facts">
  <dt>Organisation</dt>
  <dd>CERN-HSF, through Google Summer of Code</dd>
  <dt>Period</dt>
  <dd>2025 – present</dd>
  <dt>Stack</dt>
  <dd>C++17, ROOT RNTuple</dd>
  <dt>Code</dt>
  <dd><a href="https://github.com/compiler-research/ramtools">compiler-research/ramtools</a></dd>
</dl>

RAM (ROOT Alignment/Map) is a format for sequencing alignments built on RNTuple, the columnar storage CERN's ROOT uses for physics data. RAMTools converts SAM and BAM files to RAM and answers the same queries as samtools. I built it during Google Summer of Code 2025 and have maintained it since.

## What I did

- **Converters** from SAM and BAM to RAM, multithreaded, with output order preserved so files stay queryable.
- **Region queries** by binary search directly over the columns, with no separate index.
