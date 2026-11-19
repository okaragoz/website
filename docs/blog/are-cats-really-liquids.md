---
title: "Are Cats Really Liquids? The Surprisingly Serious Science Behind a Very Funny Question"
date: 2026-11-19
excerpt: "A physicist once took the internet's favourite cat joke seriously and wrote a paper about it. The joke only works if you follow the physics, and the physics turns on something most textbook definitions leave out."
image: "https://images.unsplash.com/photo-1615678857339-4e7e51ce22db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
category: blog
tags: ["blog"]
---

# Are Cats Really Liquids? The Surprisingly Serious Science Behind a Very Funny Question

I spend a good part of my working life watching silicone move. A few centimetres of it sit in a tank in the laboratory, standing in for tens of kilometres of lithosphere, and over an afternoon it does what rock takes ten million years to do. Visitors almost always ask the same question, usually while poking it: is that stuff solid, or is it liquid? The honest answer is that the question is badly posed, and the clearest way I know to explain why involves cats.

You know the behaviour. An empty cardboard box appears on the floor and within the hour there is a cat inside it. A sink, a mixing bowl, a shoe: anything with a bottom and sides eventually has something poured into it. The same animal that stretches the full length of a sofa will fold itself into a container you would have sworn was too small, then hold the pose without moving for an hour.

So the silly version of my visitors' question is this one, and it has been circulating on the internet for years: **are cats actually liquids?**

In 2014 the physicist Marc-Antoine Fardin published a short paper in the *Rheology Bulletin* called *On the Rheology of Cats*. He took the claim at face value and worked it through with the tools of his field. It is funny, and meant to be. It is also one of the better short introductions to rheology I have read, because the joke only lands if you follow the physics, and the physics turns on something that the textbook definitions of solid and liquid quietly leave out: time.

## The trouble with "it keeps its shape"

Most of us were taught the same three-line version. A solid holds its shape and its volume. A liquid holds its volume but takes the shape of whatever it is in. A gas fills the space available. Set a rock, a glass of water and the surrounding air side by side and those definitions do everything you need.

Now put a cat in a glass bowl. Its back curves to the wall, its legs fold, its head drops into whatever gap is left, and if you covered up the fur and looked only at the final shape you would say you were looking at a liquid in a container. Obviously you would be wrong. A cat has a skeleton and muscles and a nervous system, and it got into that shape partly by deforming and mostly by deciding to. But the example still catches our definitions out, because once you ask what "holds its shape" actually means, you find there is a missing word. Holds it for how long? A second, an hour, a thousand years?

Watch a cat for the fraction of a second it spends in the air mid-jump and it is a rigid object travelling through space. Watch the same cat for the four minutes it takes to settle into a bowl and it is something else entirely. Nothing about the animal changed in between. What changed was how long we looked.

That gap between what a thing is and how long you watched it is the whole subject of rheology.

## Rheology, briefly

Rheology is the study of how things deform and flow: what they do under a force, how fast they change shape, and whether they spring back afterwards or stay where you put them.

Two idealised cases sit at the ends of the range. In a simple Newtonian fluid such as water, the shear stress is proportional to the rate of shear: push harder and it flows faster, and it never goes back. In an elastic solid, the deformation depends on the stress rather than the rate, and when you let go the material returns to the shape it started in.

Almost nothing real sits cleanly at either end. Honey, toothpaste, polymer melts, gels, biological tissue and rock all do something in between, and often something that depends on how you ask. Some resist at first and then give way if you keep the load on. Others behave elastically under a fast push and deform permanently under a slow one. Whether a material looks solid or looks fluid is therefore not purely a property of the material. It is partly a property of the experiment.

Silly Putty is the example everyone has handled. Pull it apart quickly and it snaps. Leave it on the table overnight and you find a puddle. Its chemistry did not change between those two observations; the timescale did.

Fardin's move was to point this at cats, which turns the question from "is a cat a solid or a liquid" into something you can actually answer: over what timescale does a cat take the shape of its surroundings?

## The Deborah number

The quantity that does the work here is the Deborah number, which rheologists use constantly and which is about as simple as a dimensionless group gets:

$$ De = \frac{\tau}{T} $$

$\tau$ is the material's relaxation time, meaning roughly how long it takes to adjust after you disturb it. $T$ is how long you watch. The ratio tells you whether the material had the chance to respond on the timescale of your observation.

When $De$ is large, the relaxation time is much longer than the observation, the material never gets round to relaxing, and what you see is elastic, solid-like behaviour. When $De$ is small, relaxation is quick compared with the observation, the material has all the time it needs, and it flows.

A cat mid-jump is observed for less than a second and holds its shape: large Deborah number. The same cat easing into a bowl over several minutes adapts to the container: small Deborah number. One animal, two apparent states, and the only thing that changed was the denominator.

Fardin put the feline relaxation time somewhere between a second and a minute, based on the examples in the paper. That is a joke estimate and he says so; nobody ran a controlled campaign. The number is not the point. The framework is real, and it is used in earnest for viscoelastic materials, polymer processing, soft matter and biomechanics.

It is also used, with a very large $T$, for the planet I work on.

## What cats have in common with rocks

Pick up a rock. Under ordinary conditions it is the most solid thing within reach. Drop it and it might fracture. Lean on it for a few seconds and it will not measurably deform.

Now leave it in the Earth's crust for ten million years at depth, under pressure, warm. Minerals creep. Dislocations move through the lattice, atoms diffuse around grain boundaries, and the rock accumulates permanent strain without ever melting or breaking. The mantle convects for exactly this reason, and it is not liquid while it does so. What is happening down there is the very slow deformation of a solid under a load that never lets up.

This is the part of the analogy I find genuinely useful rather than merely entertaining, because it is the thing I have to explain most often. When I say the lower crust is weak, I do not mean it is molten. I mean its relaxation time is short compared with the loading time, so on geological timescales it flows. Same material, same rock, different denominator.

The differences are real and worth stating. A cat changes shape through muscle and intent as well as deformation; a rock changes shape through creep mechanisms that depend on temperature, pressure, stress, composition and grain size. Nobody is claiming they obey the same constitutive law. The point of putting them next to each other is narrower than that: both are cases where naming the state of the material tells you less than naming the timescale.

## Surface tension, and where the joke shows its seams

Having settled the relaxation time, Fardin pushes on into territory where the analogy starts to creak, which is where the paper gets interesting.

Surface tension comes first. In an ordinary liquid it comes from the molecular interactions at the interface, and it is why a small droplet pulls itself towards a sphere, why thin liquid bridges pinch off, and why liquid surfaces take the shapes they do. Fardin extends this to cats, including a section on extensional rheology illustrated with a cat stretched along its own body axis. Extensional flow, where a material is pulled apart rather than sheared, really does behave differently from shear, and the difference matters a great deal for polymer solutions. There is even a feline version of the capillary thinning and breakup experiment, borrowed from a standard method for measuring extensional properties.

Out of that comes a second dimensionless group, the capillary number:

$$ Ca = \frac{\eta U}{\gamma} $$

with $\eta$ the dynamic viscosity, $U$ a characteristic velocity and $\gamma$ the interfacial tension. It compares viscous effects against surface-tension effects, and in ordinary fluid mechanics it tells you whether a flowing material will stretch out, spread, or stay dominated by its interface.

The problem is that a cat's outline is not an interface in any sense the equation recognises, and there is no honest way to assign it an interfacial tension. That is precisely the joke. By taking well-defined quantities and applying them to a subject that cannot support them, the paper shows how much of the content of a physical quantity lives in the assumptions behind it rather than in the symbols. The algebra is fine. The algebra is always fine. Whether it means anything is a separate question, and one that gets skipped more often than it should.

## Why some cats will not flow

Anyone who has tried to move a cat that does not want to be moved knows that feline deformation has a threshold.

Fardin handles this with yield stress. Some materials simply do not flow until the applied stress passes a critical value. Toothpaste in a tube holds its shape indefinitely and then moves as soon as you squeeze hard enough; the idealised Bingham model is the standard way to write that down. The paper illustrates it with a kitten in a tilted jar that declines to pour out under gravity, and proposes that the stress has not exceeded the kitten's yield stress. The real explanation involves four limbs, some muscle tone and a decision, but the analogy is not wasted.

Yield stress is doing serious work elsewhere. Mudflows, pastes and dense suspensions all hold still below a critical stress and move above it. In geodynamics, plastic yielding is how we represent the fact that rock strength caps the stress a layer can carry before it deforms irreversibly, and where that cap sits determines whether strain localises onto a fault or spreads out. The question behind all of it is the same one the kitten poses: what is holding this material in place, and what would have to change before it moves?

In the kitten's case, probably nothing. It has decided.

## Friction, sliding and the kitchen floor

The paper also looks at what happens where a cat meets a surface, which is tribology: friction, lubrication, wear and contact.

Some cats spread themselves flat on rough carpet. Others slide across a polished floor, or cling improbably to something nearly vertical. Phrased as materials science, that is a set of questions about contact area, roughness, friction coefficients, adhesion and slip. Fluids have an analogous behaviour called wall slip, where the material right at a boundary moves relative to it instead of obeying the usual no-slip condition, and a cat sliding across a kitchen is Fardin's illustration of it.

He goes further and coins *superfelidaphobic* for a surface that repels cats, by analogy with superhydrophobic surfaces that repel water through a combination of surface chemistry and microscopic roughness. The feline version is harder to pin down, mostly because cats get a vote. A cat stepping around a wet patch is not evidence of a contact angle.

The useful residue is a distinction worth keeping: what a material does is not only a property of the material, but of the boundary it is against. Geometry, roughness and the mechanical state of the walls all change the answer. That is true for toothpaste in a tube, for a polymer melt in an extruder, and for a tank of silicone in a laboratory, where I have spent more time than I would like worrying about drag on the side walls.

## The complication: cats push back

The most interesting limitation shows up near the end of the paper, and it is the one that actually breaks the analogy.

Ordinary fluids are passive. They respond to what is done to them: impose a pressure gradient on water and it flows, shear a viscous liquid between two plates and it deforms according to your boundary conditions and its own properties. The material contributes no energy of its own.

Cats do. They have muscles, they change posture, and they react to what is happening around them. Fardin therefore files them as active rheological materials, which connects to a real and active field. Active matter studies systems whose individual components burn energy to generate motion or force: bacterial suspensions, sheets of migrating cells, biological tissue, flocks. These systems do things passive materials cannot. They move without being pushed, build structure on their own, generate internal stresses, and set up flow patterns with no external forcing at all.

A cat turning around in a cylindrical container is not a bacterial suspension. But the comparison raises a question that active matter research has to answer seriously: if the system supplies its own motion, what is the deformation rate you should put in the denominator? How do you separate the material's response from the forces it is generating internally? Can a single relaxation time describe something like that at all?

Those are open difficulties in the study of living materials. The cat makes them memorable, which is more than most introductions manage.

## When flow goes unstable

The last technical thread is instability. Flows do not always stay smooth; above certain conditions a small disturbance grows instead of dying, and you get secondary motions, vortices, or something closer to chaos. In ordinary fluid mechanics the Reynolds number tells you where inertia starts to win over viscosity. In viscoelastic materials, elastic stress can destabilise a flow even when inertia is negligible, which still surprises people.

The group for that is the Weissenberg number, relaxation time against deformation rate:

$$ Wi = \tau \dot{\gamma} $$

with $\dot{\gamma}$ a characteristic shear rate. Fardin builds a generalised Reynolds-Weissenberg measure out of it and uses it to talk about feline motion and its potential instabilities.

He then reaches the Weissenberg effect itself. Stir certain viscoelastic fluids with a rotating rod and instead of forming the dip you would expect from a Newtonian liquid, the fluid climbs the rod, driven up by elastic normal stresses. The paper illustrates the idea with a cat in a container, adopting a shape that is hard to describe politely.

That one is pure comedy, and it is worth saying so. A cat's posture is not a demonstration of elastic flow instability, and the generalised thresholds in the paper are not criteria you could apply to an arbitrary material. What survives the joke is the observation underneath it: when deformation rate, relaxation and internal stress interact, complex materials do things that no amount of intuition would have predicted, and the equations get there first.

## Why a ridiculous question is good teaching

*On the Rheology of Cats* looks at first like an elaborate in-joke for people who enjoy both physics and the internet. It is that. It is also the most efficient introduction to the subject I have come across, and I say that as someone who has tried and failed to explain relaxation time to a room using a whiteboard.

Relaxation time stays abstract until you compare a fast deformation with a slow one on the same object. Viscoelasticity stays mysterious until you meet something that changes character depending on how quickly you look at it. Yield stress gets a lot easier once you picture something sitting still until pushed hard enough. Surface tension, wall slip and flow instability all stick better when they are attached to a situation you have actually witnessed in your kitchen.

The humour depends on the framework being correct. Fardin does not declare that cats are liquids and stop there; he adopts the vocabulary of a rheologist and follows it as far as it will go, which is further than you expect and not as far as the vocabulary pretends.

That is the second lesson, and the more important one. A description can be elegant, internally consistent and completely inapplicable. Cats do not have a viscosity. Their behaviour is not passive deformation, and it depends on anatomy, mood and whatever is happening in the next room. Knowing where a model stops being about the world is not a footnote to doing science. It is a large fraction of the job, and a paper that teaches it while making you laugh has done something most textbooks do not.

## So, are cats liquids?

Strictly, no. They are animals, made of tissues with different mechanical properties, and they control their own shape. Fitting into a container is not evidence that anything obeys the constitutive equations of a simple fluid.

Less strictly, they do show behaviour that resembles the deformation and shape adaptation of complex materials, and the resemblance is close enough to be worth something. A cat crossing a room and a cat settling into a bowl look mechanically like two different substances, and the only variable that moved was time. As illustrations go, that one is hard to beat.

The wider lesson is that *solid*, *liquid*, *rigid* and *flowing* are useful shorthand rather than full mechanical descriptions. Anyone working on soft matter, tissue, polymers or rock runs into the limits of those categories early. What state is this material in turns out to be less useful than how does it respond to stress, on what timescale, and by which mechanism.

Cats are poor experimental subjects, uncooperative and expensive to recruit. They have one advantage, which is that they make people curious enough to ask.

## Everything flows, eventually

Heraclitus gets the credit for the idea that everything flows, and rheology is what happens when you take that seriously enough to put numbers on it. Whether something looks solid or fluid depends on how long it is given. That does not make every object secretly a liquid; it makes time, stress and material response inseparable parts of the same description, which is a less poetic claim and a more useful one.

Fardin makes the case through a cat in a bowl, a kitten in a jar, a cat on a slippery floor and a cat in a cylinder, and gets relaxation time, yield stress, boundary conditions and active matter out of them in about two pages. The ideas survive the treatment with their content intact, which is the hard part.

So the next time you find a cat in a container it has no business fitting into, the laws of physics are fine. Check how long you have been standing there. Or, to put it the way a rheologist would, ask whether you have given it enough time to flow.

---

### Reference

Fardin, M. A. (2014). *On the Rheology of Cats*. **Rheology Bulletin**, 83(2), 16–17, 30.

*This is a popular-science reading of a deliberately humorous paper. The rheology is standard and the cats are an analogy, not a material classification.*
