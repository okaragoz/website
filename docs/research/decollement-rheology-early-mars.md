---
title: "Why Mars's Ridges Sit 40 Kilometres Apart"
date: 2026-10-31
excerpt: "The wrinkle ridges around Tharsis are evenly spaced, and that spacing is not decoration. It measures how weak the layer beneath them had to be, and it points at salt."
image: "https://images.unsplash.com/photo-1635349429385-201ee3a51b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
category: research
tags: ["research"]
---

# Why Mars's Ridges Sit 40 Kilometres Apart

The circum-Tharsis wrinkle ridge system is the strongest tectonic imprint early Mars left behind. Tharsis grew into the largest volcanic province on the planet, and in building it loaded the lithosphere and redistributed stress across thousands of kilometres. The ridges are what that did to the crust.

<CodeMedia src="/images/research/figures/decollement-fig1-context.webp" type="image" :w="1400" :h="1014" :cap="520"
           caption="Geophysical context of the Tharsis volcanic province: global topography from the HRSC-MOLA blend with the circumferential wrinkle ridges in black, crustal thickness across the dome, the principal horizontal strain from flexural bending, and the gravity disturbance." />

What makes the ridges useful is not that they exist but that they are organised. They are spatially coherent over enormous distances, which is not what independent local deformation produces. Coherence at that scale means a single basal décollement running laterally beneath all of it, and once you accept that, the spacing stops being a descriptive detail. The characteristic wavelength of a compressional system is set by the mechanical properties of the layer it detaches on, so the spacing is a measurement of that layer.

The question is therefore narrow and quantitative: given ridges spaced the way these are, how weak did the décollement have to be, and what could it have been made of?

## The observation to be matched

Across Solis Planum and Lunae Planum the ridges are quasi-periodic, and their spacing is about 40 kilometres. That number, together with the very low surface slopes across the province, is what any model has to reproduce.

<CodeMedia src="/images/research/figures/decollement-fig3-spacing.webp" type="image" :w="1400" :h="379" :cap="520"
           caption="Wrinkle ridge morphology and spacing across the circum-Tharsis ridges, in CTX and THEMIS mosaics. The quasi-periodic spacing of around 40 kilometres is the quantity that constrains the mechanics." />

The slopes matter as much as the spacing. Swath profiles across the province run at surface slopes of roughly 0.28° to 0.38°, from an extensional domain near Tharsis to a compressional domain far out. A wedge that shallow is already a strong statement about how weak the base must be.

<CodeMedia src="/images/research/figures/decollement-fig2-profiles.webp" type="image" :w="1400" :h="807" :cap="520"
           caption="Tectonic map and topographic swath profiles along the province. Compressional structures are drawn as solid lines and extensional ones dashed; the profiles show the extensional domain passing into the compressional domain at very low surface slope." />

## Two end-member rheologies

We ran thermo-mechanical models of critical-taper wedges under early Martian conditions, varying the décollement and comparing the topography and the strain pattern each one produces.

**A viscous décollement** was tested across four orders of magnitude of Newtonian viscosity. The result is a clean dependence: at 1 × 10<sup>17</sup> Pa s the models produce regularly spaced ridges about 40 kilometres apart at a surface slope of 0.41°, and as the décollement stiffens the wavelength collapses, to 25 kilometres at 5 × 10<sup>17</sup>, then 17 kilometres at 1 × 10<sup>18</sup> and above. Only the weakest cases, below 10<sup>18</sup> Pa s, distribute stress far enough to reproduce what Mars shows.

<CodeMedia src="/images/research/figures/decollement-fig4-viscous.webp" type="image" :w="1400" :h="849" :cap="520"
           caption="Model cross-sections with Newtonian viscous décollements, coloured by the second invariant of the strain rate. Viscosity increases from (a) to (d), and the ridge wavelength falls from 40 kilometres to 17 as it does." />

**A frictional décollement** is the intuitive alternative: overpressured fine-grained material weakened by high pore fluid pressure. It fails, and it fails structurally rather than for want of tuning. A frictional layer is mechanically self-limiting. It localises strain instead of transmitting it, so even at pore fluid pressure ratios of 0.95 and 0.99 the models produce short-wavelength faulting around 10 kilometres and nothing like the observed system. Pushing the fluid pressure further does not rescue it, because the problem is that the material concentrates whatever it is given rather than passing it along.

The non-Newtonian viscous cases, at décollement temperatures of 250 °C and 300 °C, behave like the weak Newtonian ones and give wavelengths of 45 and 50 kilometres.

<CodeMedia src="/images/research/figures/decollement-fig5-frictional.webp" type="image" :w="1400" :h="757" :cap="520"
           caption="Non-Newtonian viscous décollements in the upper two panels and frictional ones in the lower two. The frictional cases localise into short-wavelength faults at about 10 kilometres however high the pore fluid pressure is set." />

## What that makes the layer

The bound is the result, and it is restrictive: below 10<sup>18</sup> Pa s. The obvious candidate at that strength is salt.

That fits the rest of what is known about the period. Extensive evaporite formation on early Mars, through the Noachian and into the Hesperian, overlaps precisely with the construction of Tharsis. A salt-rich basal layer is not an exotic requirement here, it is what the surface record would lead you to expect.

It is worth being clear about what the mechanics cannot separate. Hydrothermally altered phyllosilicate sequences can also reach these viscosities, and nothing in the modelling excludes them. The argument for salt rests on the independent evidence for evaporites at the right time, not on the viscosity bound alone.

## An independent check

InSight gives a way to test the depth rather than infer it. Shear and compressional wave velocity profiles from several independent analyses of the mission data show a zone of mechanical weakness at roughly 8 to 12 kilometres, a deeper discontinuity at 19 to 25 kilometres, and the brittle-ductile transition below 30 kilometres.

<CodeMedia src="/images/research/figures/decollement-fig6-insight.webp" type="image" :w="1400" :h="849" :cap="520"
           caption="Seismic velocity structure from InSight alongside the interpreted crustal stratigraphy: a brecciated cover, inhomogeneous upper rock sequence, a soluble layer at décollement depth, and basement below." />

A weak layer at that depth is what the wedge models require, arrived at from seismology rather than from structure.

## Why this matters beyond Tharsis

The result links two things usually studied apart: volcanic loading, and deformation thousands of kilometres away from the volcano doing the loading. What connects them is ductile flow in a weak basal layer. Without it the stress does not travel and the far-field ridges have no mechanism.

It also turns surface structure into a constraint on composition. We cannot sample the Martian crust at depth, but the spacing of features measurable from orbit bounds the viscosity of a layer kilometres down, and that bound restricts what the layer can be and what conditions made it. Reading the hydrothermal and depositional history of early Mars off the wavelength of a ridge system is indirect, and at present it is the route available.

## Where it sits in the sequence

This is the fourth piece of a connected argument. The [morphometric work at Lunae Planum](/research/wrinkle-ridges) established that these ridges root into a detachment and placed it at 2.6 to 4 kilometres depth. [The subsurface study](/research/subsurface-wrinkle-ridges) confirmed from natural cross-sections that the faults flatten with depth, as they must if they join something horizontal. [The dichotomy modelling](/research/how-computer-models-helped-us-solve-a-4-billion-year-old-martian-mystery) showed that reproducing Martian structures needs a viscous décollement rather than a frictional one, and quantified the contrast required.

This paper takes the same question to the whole circum-Tharsis system and uses ridge spacing, rather than individual structures, as the measurement. The four agree: the early Martian crust had a weak, laterally continuous layer at depth, it was weak enough to flow rather than merely slip, and the most likely reason is salt.

---

**The paper.** Karagoz, O., Ruh, J. B., Kenkmann, T., and Poelchau, M. H. (2026). *Décollement Rheology Controls Crustal Deformation on Early Mars.* Journal of Geophysical Research: Planets. [doi.org/10.1029/2026JE010093](https://doi.org/10.1029/2026JE010093)

The numerical codes behind work of this kind are described on the [code pages](/code/), and the laboratory experiments that test the same rheologies in a tank are on the [lab page](/lab/).
