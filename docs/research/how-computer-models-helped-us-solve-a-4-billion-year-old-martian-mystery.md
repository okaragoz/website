---
title: "How Computer Models Helped Us Solve a 4-Billion-Year-Old Martian Mystery"
date: 2025-12-28
excerpt: "One of Mars's most striking features is also one of its biggest mysteries. If you look at a map of the Red Planet, you'll notice something odd: the northern half…"
image: "https://images.unsplash.com/photo-1635349429385-201ee3a51b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
category: research
tags: ["research"]
---

# How Computer Models Helped Us Solve a 4-Billion-Year-Old Martian Mystery

Some of the most beautiful features on Mars are also the most stubborn puzzles. Pull up a map of the Red Planet and something jumps out almost immediately: the northern half sits about 3 kilometers lower than the southern half. We call this the Martian dichotomy, and it's had scientists scratching their heads for decades.

What pulled me in, though, was a detail in one particular spot called Nilosyrtis Mensae. Right along the boundary between the high ground and the low ground, there are extensional faults: cracks where the surface pulled apart. And roughly 800 kilometers out into the lowlands, there are compressional ridges, where the ground got squeezed together instead. The two sets of features run more or less parallel to each other.

That pattern looked oddly familiar to me and my colleagues. It's the kind of thing we see on Earth along passive continental margins, where gravity slowly drags the land downslope: you get extension up top and compression at the bottom. But could that really happen on Mars? And if it did, what would it be telling us about the planet's deep past?

## Why We Turned to Numerical Models

Satellite images alone weren't going to settle this. We needed to find out whether gravity-driven deformation was even physically possible under Martian conditions, and if it was, what kind of buried structure you'd need to pull it off.

That's exactly where numerical modeling comes in. Picture building a virtual Mars inside a computer: a place where you set the laws of physics yourself, swap out rock types, and watch millions of years of deformation unfold in a matter of hours.

## Setting Up Our Virtual Mars

We ran our simulations with a code called Norma. The job was to rebuild a 700-kilometer-wide slice of Mars reaching 20 kilometers down, with enough resolution to capture how faults actually form. Our model tracked about 4 million markers, each carrying its own rock properties as everything moved and deformed through time.

Getting the setup right took some care. We started with:

  * A 4-kilometer-thick upper layer of basaltic rock (representing the Martian crust)
  * A 1-kilometer-thick detachment layer (the weak zone that would allow sliding)
  * Another 4-kilometer layer of lower crust
  * A low-density "sticky air" layer on top to simulate a free surface

The fiddly part was the rock properties. Mars isn't Earth, so we had to dial in:

  * Martian gravity (3.72 m/s², about 38% of Earth's)
  * Martian crustal densities (around 3000 kg/m³)
  * The correct viscosity for different rock types
  * How rocks fail under stress

## Testing Three Different Scenarios

This is where the modeling really earned its keep. We didn't settle for a single simulation: we ran three fundamentally different scenarios and asked which one actually matched the Mars we see today.

**Model 1: A Frictional Detachment Throughout**

In the first model, we made the detachment layer out of overpressured clay or shale-like material running through the whole system. We gave it a fairly high fluid pressure ratio (λ = 0.9) so it would be weak enough to deform.

The result was a letdown, but a useful one. Deformation kept getting stuck near the dichotomy boundary. We'd get extension along the scarp, sure, but it just couldn't travel far into the highlands or the lowlands. After only 2 million years of simulation, the whole thing essentially seized up. We might see some faulting near the boundary, but nothing close to the 800-kilometer-wide system nature actually built.

Even with all that fluid pressure, the viscosity of this frictional layer hovered around 10²¹ Pa·s: still too stiff for the spread-out deformation we were after.

**Model 2: A Weak Viscous Detachment Throughout**

For the second model, we swung to the opposite extreme: a very weak, viscous-like detachment with a viscosity of just 10¹⁷–10¹⁸ Pa·s running continuously beneath both the highlands and the lowlands. That could stand in for salt, ice, or some mixture of the two along with fractured basalt.

This one did a far better job of deforming the entire system. Extension kicked off almost right away (within 0.03 million years of simulation time) near the dichotomy, then spread both backward into the highlands and forward into the lowlands.

The compressional domain came together nicely too, with thrust faults forming in an "out-of-sequence" pattern: the front faults appeared first, then new ones popped up progressively backward toward the highlands. By 5 million years, we had clear extensional, transitional, and compressional domains.

But it had a flaw. The model built two distinct topographic steps in the highlands, and that's just not what Mars shows us. The extensional domain came out too long compared to what we observe, as well.

**Model 3: Two Different Detachments**

The third model was the winner. We blended the two earlier ideas: a shallower frictional detachment in the highlands, linked to a deeper viscous detachment in the lowlands.

Here's where the numerical modeling really flexed. The model showed how those two detachment layers could hook up through a "relay zone" right at the dichotomy boundary. The strain patterns told a genuinely compelling story:

  * For the first 4.5 million years, most deformation occurred in the highlands as normal faults formed
  * Then there was a shift: extension decreased in the highlands but picked up in the nearby lowlands
  * By 13.5 million years, the frictional detachment in the highlands was essentially done moving
  * The compressional domain, meanwhile, showed that characteristic out-of-sequence development, reaching its maximum width around 13.35 million years
  * By 20 million years (our simulation end time), the system had stabilized

And the final topography from Model 3 lined up with observations beautifully: a single lowered slope near the dichotomy, a wide low-relief bulge in the transitional zone, and a string of ridges in the compressional domain.

## What the Numbers Told Us

Once we put the three models side by side, the contrast was hard to miss. We measured the normalized lengths of the three structural domains:

  * **Model 1** (frictional only): 100% extensional domain, 0% transitional, 0% compressional
  * **Model 2** (viscous only): ~20% extensional, ~30% transitional, ~50% compressional
  * **Model 3** (combined): 14% extensional, 68% transitional, 18% compressional

The real Mars sections we mapped averaged: 24% extensional, 46% transitional, 30% compressional.

Model 3 was clearly the closest fit, and that's even before you account for erosion and burial on Mars, which would have hidden some of the extensional features and made that domain look smaller than it really was.

The viscosity contrast between the two detachment types mattered just as much. The frictional detachment never dropped below about 10²¹ Pa·s even with high fluid pressure, while the viscous detachment sat at 10¹⁷–10¹⁸ Pa·s: roughly 1,000 to 10,000 times weaker. You need a gap of several orders of magnitude like that to reproduce the pattern we see.

## What This Means for Mars's History

The modeling didn't just prove gravity-driven deformation was possible. It told us what had to be hiding beneath the Martian surface to make it happen.

And the fact that you need two different detachment types says something pretty deep about Mars's early days. Here's the story that comes together:

About 4.5 billion years ago, a giant impact (the "Borealis impact") carved out the northern lowlands. It excavated much of the crust that was already there and left behind an enormous pool of impact melt. As that cooled and a shallow, short-lived ocean formed, evaporites, salt minerals, precipitated out. Later impacts, especially the Utopia impact around 4.1 billion years ago, churned up and spread that salt through a thick layer of fractured basalt (megaregolith).

The upshot? A mechanically weak layer sitting 5-11 kilometers deep, just about perfect for acting as a detachment surface.

Up in the highlands, meanwhile, volcanic activity laid down flood basalts with thin sedimentary layers wedged between them, creating pockets of overpressured fine-grained material that could serve as a frictional detachment.

Then, somewhere around 3.8-3.6 billion years ago (Late Noachian to Early Hesperian), something set the whole thing in motion. Maybe it was the Tharsis volcanic region swelling and nudging Mars's entire crust, maybe the Isidis impact, maybe regional uplift. Whatever lit the fuse, gravity took it from there.

Our models suggest this all happened fairly fast: the entire system played out in maybe 20 million years, possibly less. The dichotomy boundary failed, the highlands began sliding northward, and the system ran its course, sculpting the features we see today before erosion and volcanic resurfacing buried part of the evidence.

## Why Numerical Modeling Was Essential

Let me be honest about this: we never could have worked it out without numerical modeling. Here's why:

**1\. Testing what we can't see:** The detachment layers are buried kilometers deep. No amount of satellite mapping could tell us whether they exist or what they're made of. But the models showed us what _must_ be there to produce the observed structures.

**2\. Testing physical plausibility:** It's one thing to draw a cross-section that looks nice. It's another to prove that it can actually form under real physical conditions. The models incorporate actual rock mechanics, realistic viscosities, and proper gravitational forces. If something can't work in the model, it probably can't work in nature.

**3\. Understanding timing:** The models revealed that this wasn't a slow, steady process but rather had distinct phases: early extension, a shift in strain patterns, peak compression, then stabilization. This temporal evolution would be impossible to reconstruct from surface observations alone.

**4\. Quantifying requirements:** The models told us precisely how weak the detachment layers needed to be. A viscosity contrast of 1,000-10,000 times between the highland and lowland detachments wasn't just helpful: it was necessary. That's a concrete constraint for understanding Mars's subsurface composition.

**5\. Ruling out alternatives:** Just as important as showing Model 3 worked was showing that Models 1 and 2 didn't. Science advances by elimination as much as confirmation.

## The Bigger Picture

What I love about this work is how it shows Mars and Earth sharing more geology than you'd expect. Gravity-driven fold-thrust belts are everywhere on Earth along passive continental margins: think of the Gulf of Mexico or the coast of Angola. The wedge angle we calculated for Mars (~0.4°) lines up nicely with those Earth examples, the Angola margin in particular.

There's a meaningful difference, though. On Earth, these systems usually form in marine sediments as continental margins subside. On Mars, we're looking at one that grew out of impact-related materials and ancient ocean sediments, driven by the strange conditions of the planet's early history.

The modeling threw in a bonus, too: it lent support to the giant impact origin for the northern lowlands. Without that impact to build the mechanically weak layer down there, the gravity-driven system simply couldn't have behaved the way our models did.

## What's Next?

This work cracks open a whole new set of questions. If salt-rich layers really do sit this deep in the Martian lowlands, what does that mean for:

  * Other tectonic features on Mars?
  * The history and composition of early Martian oceans?
  * Potential resources for future Mars missions?

Here's something that still gives me chills: NASA's InSight lander has already picked up seismic discontinuities in the lowland crust at depths of 8±2 kilometers: remarkably close to what our model predicted. Future seismic studies could help pin down whether these weak layers are really there and what they're made of.

For me, this project is a perfect reminder of why numerical modeling is such a powerful tool in planetary science. Mars doesn't have plate tectonics the way Earth does, but its geological history has been anything but quiet. Computer models let us run experiments we could never set up in a lab or in the field, probing events that unfolded billions of years ago on a planet none of us has ever set foot on.

Every time we launch a new simulation, we're really putting a question to Mars: "Could this have happened?" For gravity-driven deformation at Nilosyrtis Mensae, the answer seems to be yes, and honestly, the story it tells is hard to put down.

* * *

_This research was published in Earth and Planetary Science Letters. The numerical simulations were performed using the Norma code, a finite-difference mechanical modeling framework specifically designed for studying tectonic processes._
