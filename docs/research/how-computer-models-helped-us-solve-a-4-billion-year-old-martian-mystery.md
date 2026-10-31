---
title: "How Computer Models Helped Us Solve a 4-Billion-Year-Old Martian Mystery"
date: 2025-12-28
excerpt: "Extension along the Martian dichotomy and compression 800 kilometres out into the lowlands. Three numerical models, and only one of them produces the Mars we actually see."
image: "/images/research/figures/mars-dichotomy-map.webp"
category: research
tags: ["research"]
---

# How Computer Models Helped Us Solve a 4-Billion-Year-Old Martian Mystery

Open a topographic map of Mars and the first thing you notice is that the northern half sits about three kilometres lower than the southern half. That is the Martian dichotomy, and how it got there has been argued over for decades.

What drew me in was smaller than the dichotomy itself. At Nilosyrtis Mensae, along the boundary, there are extensional faults where the surface has pulled apart. About 800 kilometres out into the lowlands there are compressional ridges where it has been squeezed. The two sets run roughly parallel.

<CodeMedia src="/images/research/figures/mars-dichotomy-map.webp" type="image" :w="1600" :h="1007"
           caption="Mars with the dichotomy boundary marked. The extensional structures sit along the boundary itself; the compressional ones lie several hundred kilometres out into the northern lowlands." />

That pairing is familiar from Earth. It is what gravity-driven systems on passive continental margins look like: extension at the top of the slope, compression at the toe, with the whole thing sliding on something weak in between. The Gulf of Mexico and the Angolan margin both do it. The question was whether Mars could, and what would have to be buried underneath for it to work.

## Why model it

Imagery alone cannot answer that. You can draw a cross-section that looks plausible and still be describing something that could not physically happen. A numerical model is a way of insisting on the physics: you set the rock properties and the gravity, and then you find out whether the structures form on their own.

The simulations used the Norma code on a slice 700 kilometres wide and 20 kilometres deep, resolved finely enough for faults to develop rather than be imposed, with about four million markers each carrying its own material properties through the deformation.

The setup was a four-kilometre basaltic upper crust, a one-kilometre detachment layer, another four kilometres of lower crust, and a low-density layer on top to give a free surface. The parameters are Martian rather than terrestrial: gravity at 3.72 m/s², crustal density around 3,000 kg/m³, and viscosities and failure criteria to match.

## Three detachments, three outcomes

**A frictional detachment everywhere.** Overpressured clay or shale throughout, with a high fluid pressure ratio. Deformation would not travel. It concentrated at the dichotomy boundary, produced extension along the scarp, and then locked up after about two million years. Even with the fluid pressure cranked up, this layer stays near 10<sup>21</sup> Pa s, which is too stiff to distribute strain across hundreds of kilometres.

**A weak viscous detachment everywhere.** The opposite extreme, at 10<sup>17</sup> to 10<sup>18</sup> Pa s, standing in for salt or ice mixed through fractured basalt. This one deforms the whole system. Extension begins almost immediately and spreads both back into the highlands and forward into the lowlands, and the compressional domain builds out-of-sequence, front thrusts first and new ones stepping backward. By five million years there are clear extensional, transitional and compressional domains. The problem is the topography: it builds two distinct steps in the highlands, which Mars does not have, and the extensional domain comes out too long.

**Two detachments, linked.** A shallow frictional detachment under the highlands connected to a deeper viscous one under the lowlands, joined through a relay zone at the boundary. This is the one that works. Deformation runs in the highlands for the first 4.5 million years as normal faults develop, then shifts: extension dies back in the highlands and picks up in the adjacent lowlands. By 13.5 million years the highland detachment has essentially stopped moving, the compressional domain has reached its maximum width, and by 20 million years the system is stable. The final topography is a single lowered slope near the dichotomy, a wide low-relief bulge in the transition, and ridges at the far end.

## The numbers that separate them

Measuring the three structural domains as fractions of the section length:

| | extensional | transitional | compressional |
|---|---|---|---|
| frictional only | 100% | 0% | 0% |
| viscous only | ~20% | ~30% | ~50% |
| two detachments | 14% | 68% | 18% |
| **Mars, measured** | **24%** | **46%** | **30%** |

The combined model is the closest, and the remaining gap runs the right way: erosion and burial have hidden some of the extensional structures, so the real extensional domain should measure smaller than it was.

The viscosity contrast is the control. The frictional detachment will not go below about 10<sup>21</sup> Pa s however much fluid pressure you give it, while the viscous one sits at 10<sup>17</sup> to 10<sup>18</sup>. You need three to four orders of magnitude between the two to reproduce the pattern, which is a specific and testable claim about what is down there.

## What that implies about early Mars

The model does not just say gravity-driven deformation was possible. It says what had to be buried for it to happen, and that turns into a sequence.

Around 4.5 billion years ago the Borealis impact excavated the northern lowlands, removing much of the existing crust and leaving a large volume of impact melt. As that cooled and a shallow, short-lived ocean formed, evaporites precipitated. Later impacts, the Utopia event around 4.1 billion years ago in particular, mixed those salts through a thick layer of fractured basalt. The result is a mechanically weak layer at five to eleven kilometres depth: exactly what the lowland detachment needs to be.

In the highlands, flood basalts with thin sedimentary interbeds give pockets of overpressured fine-grained material, which is the frictional detachment.

Something then had to start it, somewhere between 3.8 and 3.6 billion years ago. Tharsis loading, the Isidis impact and regional uplift are all candidates. After that gravity does the work, and the models suggest it is quick: the whole system runs its course in around 20 million years, possibly less.

## What the models could do that mapping could not

The detachments are kilometres down and no orbital dataset will see them. What the models provide is the inverse: given the structures at the surface, what must exist below to produce them.

They also constrain the timing. The sequence of early extension, a shift in where strain is accommodated, peak compression, then stabilisation is not recoverable from a static surface.

And they rule things out. Showing that the frictional-only and viscous-only cases fail is as much of the result as showing that the combined case succeeds.

One independent check is worth noting. InSight has detected seismic discontinuities in the lowland crust at 8 ± 2 kilometres, which is within the depth range the model requires for the lowland detachment. That is not confirmation, but it is the right number in the right place.

## How it compares to Earth

The wedge angle for the Martian system comes out at about 0.4°, which is in the same range as terrestrial gravity-driven margins and close to the Angolan one in particular. The mechanics transfer.

The materials do not. On Earth these systems develop in marine sediments as a margin subsides. On Mars this one is built from impact-generated material and the residue of a short-lived ocean, which is a setting Earth does not offer. It also means the model leans on the giant-impact origin for the northern lowlands: without that impact there is no weak layer, and without the weak layer the system does not behave this way.

---

**The paper.** Karagoz, O., Kenkmann, T., and Hergarten, S. (2025). *Gravity-driven fold-thrust belt at the Martian dichotomy.* Earth and Planetary Science Letters. [doi.org/10.1016/j.epsl.2025.119645](https://doi.org/10.1016/j.epsl.2025.119645)

The follow-up, which takes the rheology of the detachment itself as the subject, is Karagoz, O., Kenkmann, T., and Hergarten, S. (2026). *Décollement Rheology Controls Crustal Deformation on Early Mars.* Journal of Geophysical Research: Planets. [doi.org/10.1029/2026JE010093](https://doi.org/10.1029/2026JE010093)

The simulations ran in Norma, a finite-difference mechanical modelling framework for tectonic problems. The numerical codes I develop and work with are described on the [code pages](/code/), and the laboratory side of the same questions is on the [lab page](/lab/).
