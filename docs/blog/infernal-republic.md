---
title: Infernal Republic
date: 2026-04-19
excerpt: A Roman Republic political simulation with a second layer laid over it, in which every actor is assigned a station in Dante's hell at every moment in time.
image: /images/2026/04/orcagna_inferno_ullstein_high_03075375_flex_gr_format_l-1.jpg
tags:
  - blog
category: blog
---

# Infernal Republic

This started as a straightforward political simulation and then acquired a second floor. The base model is Roman: a senate governs under ordinary conditions, and a crisis can activate an emergency autocrat. Underneath the constitutional switch sits the machinery that actually decides outcomes, which is patronage, propaganda, legislation that arrives late, factional conflict and informal influence. What I added on top is a moral layer. At every time step, every council member and the autocrat occupy a station in Dante's hell.

The upper circles cover the softer corruptions: lust, gluttony, greed, wrath, and what I treat as heresy, meaning the rejection of constitutional norms. Below that the stations get more specific. Violence splits three ways, against others, against self, and against God and nature. Fraud splits into the ten Malebolge classes, from panders and seducers down to the liars and falsifiers at the bottom. Treachery is reserved for betrayal of the republic itself.

None of this is a theological claim. It is a way of looking. Dante's geography happens to be an unusually well-specified vocabulary for political decay, and borrowing it means a person in the simulation does not only gain or lose power, they also move up or down through a landscape built out of coercion, deception, institutional betrayal and repair.

The interesting behaviour comes from the gap between the formal constitution and the real distribution of influence, because the two rarely agree. In peacetime the senate can dominate decisions even when the autocrat is ambitious. In a severe crisis the emergency authority surges. If law, transparency and resilience are weak at that moment, a temporary grant of power turns into permanent capture; if resilience holds, the republic absorbs the shock and recovers. The Dante layer is what makes those transitions legible. Early institutional decay shows up as heresy. Phases of manipulation and information control push actors into fraud. Acute emergencies push them into violence. When the crisis passes and the law comes back, some drift upward again and others stay exactly where they fell.

In the run I show here the republic survives a long deceptive phase, falls into a violent wartime episode, and partially recovers. The autocrat does not. He ends in treachery and stays there.

I find the combination useful because the quantitative output on its own is hard to read. The model produces effective power weights, faction support, legal barrier strength, crisis severity and long-run entrenchment, which is a lot of curves. The Inferno mapping turns those curves into something with a shape: not only who held power, but what kind of moral order that holding produced.

It also makes a point about how republics fail that I did not put in deliberately and now cannot unsee. Collapse is almost never a single event. Norms weaken first, quietly and without anyone objecting. Then the law starts bending to accommodate the practice. Then deception becomes routine, then violence becomes thinkable, and treachery only arrives at the end, when it is obvious and too late to be informative. Dante supplies the vocabulary for that descent. The simulation lets you watch it happen at a speed a human can follow.

![](/images/2026/04/dashboard-1.png)

The main dashboard. The upper left panel shows the effective power spectrum, where factional influence and autocratic concentration compete over time. The upper right panel tracks entrenched power, legal resistance, constitutional resilience, and social stress. The lower panels show factional support, barrier strength, and the centralisation pathway of policy decisions.

## Why combine Rome, Dante, and numerics?

The Roman dictatorship is a good constitutional archetype precisely because it draws a line between ordinary collegiate rule and exceptional concentration of power. It was an emergency magistracy, bounded by how it was appointed, what it was appointed for, and the expectation that the holder would step down, although what happened in practice varied a great deal across the Republic[2][3]. That gives a clean switch to model, with a historically attested failure mode attached to it.

Dante supplies the second structure, which is moral rather than institutional. The descent from appetite and vanity through deception and coercion to outright betrayal is a ready-made ordering of political pathologies, and a more discriminating one than any scale I could have invented[1]. The Roman layer decides who governs. The Dantean layer describes what sort of order that government produces. The aim is not to classify anybody metaphysically; it is to give institutional drift a geometry you can see.

## Model overview

The system tracks one autocrat and $N=100$ council members. Each member belongs to a faction with its own distribution of legalism, fear, susceptibility to manipulation, reform capacity, and security preference. The global state at time step $t$ is

$$ \mathbf{x}_t = \big(P_t, M_t, R_t, X_t, z_t, \mathbf{s}_t, \mathbf{b}_t\big), $$

where $P_t$ is entrenched autocrat power, $M_t$ is the manipulation apparatus, $R_t$ is constitutional resilience, $X_t$ is social stress, $z_t$ is the crisis state, $\mathbf{s}_t\in[0,1]^N$ is member support for the executive, and $\mathbf{b}_t\in[0,1]^N$ is member level barrier strength.

The design decision I care most about is that none of the internal rates are set by hand. Tuning several dozen unrelated coefficients produces a model that does whatever you want it to, which is worthless. Instead everything derives from five interpretable controls,

$$ (I, A, C, T, V) = \big(\text{institutional strength},\ \text{autocrat skill},\ \text{crisis proneness},\ \text{transparency},\ \text{social volatility}\big). $$

so there are five knobs to argue about rather than forty, and the dynamics stay rich enough to be worth running.

### Delayed perception and legislative latency

The senate does not see the executive in real time, which matters more than almost anything else in the model. Member $i$ reacts to a delayed and noisy signal,

$$ \tilde{P}_{i,t} = P_{t-\tau},\exp!\big[-\kappa M_{t-\tau}\eta_i\big] + 0.30,C_{t-\tau} + 0.12,X_{t-\tau} + \varepsilon_{i,t}, $$

where $\tau$ is legislative latency, $\kappa$ controls obfuscation, $\eta_i$ is factional bias, and $\varepsilon_{i,t}$ is observation noise. The stepping follows the usual logic for stochastic systems, though this model is discrete and interpretive rather than estimated from data[4].

### Member updates

Member support $s_{i,t}$ and member barrier $b_{i,t}$ evolve under patronage, conformity, fear, legalism, and perceived threat. In simplified form,

$$ s_{i,t+1} = \Pi_{[0,1]}\Big(s_{i,t} + \Delta t,[g_i(M_t,C_t,\bar{s}_{f(i),t}) - \ell_i(P_t,R_t,b_{i,t})]\Big), $$ $$ b_{i,t+1} = \Pi_{[0,1]}\Big(b_{i,t} + \Delta t,[r_i(\tilde{P}_{i,t},R_t) - c_i(M_t,P_t,C_t)]\Big). $$

The operator $\Pi_{[0,1]}$ clips values to the unit interval. The first update rewards order and patronage. The second punishes norm breaking, corruption, and fatigue.

### Macro updates

The macro variables are then updated from the member field,

$$ R_{t+1} = \Pi_{[0,1]}\Big(R_t + \Delta t,[\rho L_t(1-R_t) - \chi(P_t + 0.5M_t + 0.4X_t)R_t]\Big), $$ $$ X_{t+1} = \Pi_{[0,1]}\Big(X_t + \Delta t,[\sigma C_t(1-X_t) + \psi F_t(1-X_t) + \beta P_t(1-L_t)(1-X_t) - \omega(R_t+0.5L_t)X_t]\Big), $$ $$ M_{t+1} = \Pi_{[0,1]}\Big(M_t + \Delta t,[\mu P_t(1-M_t) + \nu \bar{s}_tP_t(1-M_t) + \zeta C_t(1-L_t)(1-M_t) - \lambda L_tM_t]\Big), $$ $$ P_{t+1} = \Pi_{[0,1]}\Big(P_t + \Delta t,[\alpha P_t(1-P_t) + \xi C_t(1-L_t)(1-P_t) + \phi \bar{s}_t(1-P_t) + \gamma M_t(1-P_t) - \delta L_tP_t - \rho_R R_t(1-\bar{s}_t)P_t]\Big). $$

Here $L_t$ is effective legal strength aggregated from barriers and $F_t$ is factional fragmentation.

### Formal and informal power

A crisis does not hand the autocrat total control automatically. Emergency power is activated through a sigmoid transfer,

$$ \alpha_t = \sigma!\Big(k,[C_t + 0.25M_t + 0.15\bar{s}_t - 0.55L_t - \theta]\Big), $$ $$ w^{\mathrm{formal}}_{a,t} = P_t + (1-P_t)\alpha_t. $$

which is the Roman arrangement written down: constitutional emergency can shift power very fast without that shift becoming permanent.

Formal rules are not the whole story, though, and in most runs they are not even the larger part of it. The council also forms an informal influence network $K_t$ whose edges depend on factional similarity, ideological proximity, susceptibility, and executive pull. The stationary distribution of $K_t$ serves as a compact measure of long-run centrality, in the standard way[5]. The final effective weight is a convex blend of the two,

$$ \mathbf{w}^{\mathrm{eff}}_t = (1-\chi_t),\mathbf{w}^{\mathrm{formal}}_t + \chi_t,\boldsymbol{\pi}(K_t), $$

with the capture weight $\chi_t$ rising when manipulation, crisis, fragmentation and support for the executive increase together. That co-occurrence is the dangerous combination, and the model is built so that no single one of them is enough on its own.

## The Dante layer

The moral layer assigns every person to one station at every time step. The upper circles hold the lighter political corruptions: vanity, appetite, greed, wrath and constitutional heresy. Below them sit the harder pathologies.

- **Violence** is split into three stations: against others, against self, and against God or nature.
- **Fraud** is split into ten stations in the spirit of the _Malebolge_ : panders and seducers, flatterers, simoniacs, sorcerers, barrators, hypocrites, thieves, fraudulent counselors, sowers of discord, and liars or falsifiers.
- **Treachery** marks deep betrayal of faction, republic, or constitutional order.

For each actor $i$ and station $m$, the code computes an interpretive score

$$ q_{i,m,t} = h_m\big(P_t,M_t,R_t,X_t,C_t,L_t,s_{i,t},b_{i,t},\tilde{P}_{i,t},\bar{s}_{f(i),t}\big), $$

and then assigns the deepest active station whose score clears a threshold, with precedence rules for Treachery, Fraud and the Violence subrings so that an actor who qualifies for several does not end up filed under the mildest.

## How to read the figures

The dashboard above carries the institutional story: power spectrum, state variables, faction support, faction barriers, decision path. The figures below carry the moral one, first per actor, then aggregated, then placed back onto the funnel itself.

![](/images/2026/04/inferno_heatmap-1.png)The Inferno heat map. Each horizontal track is one actor. Time runs left to right. Color encodes the Dante station occupied at that moment. This figure makes moral descent legible as a collective process rather than a single moment of collapse.![](/images/2026/04/station_counts.png)

Final placement of all simulated actors on the Inferno map. The autocrat is marked separately. This figure turns the final moral state of the republic into a visual population map.

![](/images/2026/04/selected_trajectories.png)

Selected trajectories. These tracks show that actors do not all descend together. Some oscillate between milder and harsher stations. Others remain trapped in one basin of moral behavior for decades.

![](/images/2026/04/inferno_people_overlay.png)

Final placement of all simulated actors on the Inferno map. The autocrat is marked separately. This figure turns the final moral state of the republic into a visual population map.

![](/images/2026/04/inferno_overlay_counts.png)

Final station counts placed directly on the Inferno diagram. This is the cleanest summary of the simulation’s terminal moral distribution.

## What happens in the default run

The republic takes a strong authoritarian surge early, then partially recovers as the legal barrier rebuilds, which is the kind of result the institutional variables alone would have told me.

The moral layer says more. Decay appears first as constitutional heresy, before anything illegal has happened. That is followed by a long stretch dominated by the fraud stations, mostly the deceptive classes, and then a wartime shock drives a large part of the council into violence against others. The later decades cool, and some members climb back towards the lighter stations. The autocrat does not move. He is in treachery for the whole second half of the run, which is the detail I keep coming back to: the institution recovered and the person who broke it did not.

The equations are here because the mechanics do not make sense without them, the figures because the argument is visual, and the full source is folded away at the bottom for anyone who wants to run it with different numbers. I would be curious what a historian makes of the station assignments, which are the part I am least confident in.

## References

1. Dante Alighieri. _The Divine Comedy of Dante Alighieri. Volume 1: Inferno_. Translated by Robert M. Durling. Oxford University Press, New York, 1996.
2. Gregory K. Golden. _Crisis Management during the Roman Republic: The Role of Political Institutions in Emergencies_. Cambridge University Press, Cambridge, 2013.
3. Frederik Juliaan Vervaet. “Dictator.” _Oxford Classical Dictionary_ , 2022. DOI: 10.1093/acrefore/9780199381135.013.2151.
4. Peter E. Kloeden and Eckhard Platen. _Numerical Solution of Stochastic Differential Equations_. Springer, Berlin and Heidelberg, 1992. DOI: 10.1007/978-3-662-12616-5.
5. Mark Newman. _Networks: An Introduction_. Oxford University Press, Oxford, 2010. DOI: 10.1093/acprof:oso/9780199206650.001.0001.

## Full Code Block

::: details Show the full source code

```python
import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap, BoundaryNorm
from dataclasses import dataclass


STATION_NAMES = [
    "Limbo",
    "Lust",
    "Gluttony",
    "Greed",
    "Wrath",
    "Heresy",
    "Violence against Others",
    "Violence against Self",
    "Violence against God and Nature",
    "Fraud - Panders and Seducers",
    "Fraud - Flatterers",
    "Fraud - Simoniacs",
    "Fraud - Sorcerers",
    "Fraud - Barrators",
    "Fraud - Hypocrites",
    "Fraud - Thieves",
    "Fraud - Fraudulent Counselors",
    "Fraud - Sowers of Discord",
    "Fraud - Liars and Falsifiers",
    "Treachery",
]

STATION_COLORS = [
    "#d7e4f2",
    "#f2d7d5",
    "#efc8a4",
    "#d99c5c",
    "#c65a5a",
    "#9f7ad1",
    "#ea4335",
    "#b03030",
    "#7f1d1d",
    "#8c8c8c",
    "#808080",
    "#747474",
    "#686868",
    "#5c5c5c",
    "#505050",
    "#444444",
    "#383838",
    "#2c2c2c",
    "#202020",
    "#0b0b0b",
]

STATION_POSITIONS = {
    0: (0.50, 0.955, 0.40),
    1: (0.50, 0.885, 0.34),
    2: (0.50, 0.825, 0.30),
    3: (0.50, 0.765, 0.27),
    4: (0.50, 0.705, 0.24),
    5: (0.50, 0.595, 0.20),
    6: (0.43, 0.535, 0.14),
    7: (0.50, 0.505, 0.10),
    8: (0.57, 0.475, 0.14),
    9: (0.58, 0.435, 0.12),
    10: (0.60, 0.410, 0.11),
    11: (0.60, 0.385, 0.11),
    12: (0.59, 0.360, 0.11),
    13: (0.58, 0.335, 0.10),
    14: (0.57, 0.310, 0.10),
    15: (0.56, 0.285, 0.10),
    16: (0.45, 0.225, 0.11),
    17: (0.56, 0.205, 0.10),
    18: (0.57, 0.170, 0.11),
    19: (0.50, 0.090, 0.09),
}


@dataclass
class MetaConfig:
    years: float = 100.0
    dt: float = 1.0 / 12.0
    council_size: int = 100
    n_factions: int = 4
    seed: int = 42

    institutional_strength: float = 0.65
    autocrat_skill: float = 0.55
    crisis_proneness: float = 0.40
    information_transparency: float = 0.60
    social_volatility: float = 0.45


@dataclass
class InternalParams:
    latency_years: float
    observation_noise: float
    obfuscation: float
    ambition: float
    crisis_capture: float
    legal_drag: float
    reform_capacity: float
    propaganda: float
    patronage_feedback: float
    censorship: float
    oversight: float
    restoration: float
    stress_from_crisis: float
    repression_backlash: float
    polarisation: float
    stabilisation: float
    support_gain: float
    support_order: float
    support_loss: float
    support_norm: float
    support_barrier: float
    conformity: float
    barrier_corruption: float
    barrier_fear: float
    barrier_fatigue: float
    barrier_restoration: float
    apparatus_feedback: float
    capture_mix: float
    crisis_threshold: float
    crisis_steepness: float


def clip01(x):
    return np.clip(x, 0.001, 0.999)


def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-x))


def safe_scalar(x, fallback=0.0):
    return float(np.nan_to_num(x, nan=fallback, posinf=fallback, neginf=fallback))


def safe_array(x, fallback=0.0):
    return np.nan_to_num(np.asarray(x, dtype=float), nan=fallback, posinf=fallback, neginf=fallback)


def safe_mean_from_mask(arr, mask, fallback=0.0):
    if mask.sum() == 0:
        return fallback
    return safe_scalar(arr[mask].mean(), fallback=fallback)


def rolling_mean(x, window):
    if window <= 1:
        return x.copy()
    kernel = np.ones(window) / window
    left = window // 2
    right = window - 1 - left
    padded = np.pad(x, (left, right), mode="edge")
    return np.convolve(padded, kernel, mode="valid")


def stationary_distribution(K, n_iter=40):
    n = K.shape[0]
    pi = np.full(n, 1.0 / n)
    for _ in range(n_iter):
        pi = safe_array(pi @ K, fallback=1.0 / n)
        s = pi.sum()
        if s <= 0 or not np.isfinite(s):
            pi = np.full(n, 1.0 / n)
        else:
            pi = pi / s
    return pi


def mode_int(x, n):
    counts = np.bincount(np.asarray(x, dtype=int), minlength=n)
    return int(np.argmax(counts))


def person_names(n):
    return [f"Council_{i+1:03d}" for i in range(n)] + ["Autocrat"]


def station_counts_over_time(stations):
    t_steps = stations.shape[0]
    counts = np.zeros((t_steps, len(STATION_NAMES)), dtype=int)
    for t in range(t_steps):
        counts[t] = np.bincount(stations[t], minlength=len(STATION_NAMES))
    return counts


def dominant_stations(stations):
    start = stations.shape[0] // 2
    trailing = stations[start:]
    n_people = stations.shape[1]
    dom = np.zeros(n_people, dtype=int)
    for i in range(n_people):
        dom[i] = mode_int(trailing[:, i], len(STATION_NAMES))
    return dom


def derive_internal_params(cfg: MetaConfig) -> InternalParams:
    I = cfg.institutional_strength
    A = cfg.autocrat_skill
    C = cfg.crisis_proneness
    T = cfg.information_transparency
    V = cfg.social_volatility

    return InternalParams(
        latency_years=1.0 + 4.0 * (1.0 - T) + 1.0 * V,
        observation_noise=0.01 + 0.05 * V * (1.0 - T),
        obfuscation=0.20 + 1.80 * A * (1.0 - T),
        ambition=0.04 + 0.18 * A,
        crisis_capture=0.08 + 0.60 * A * C,
        legal_drag=0.10 + 0.60 * I,
        reform_capacity=0.04 + 0.32 * I,
        propaganda=0.03 + 0.22 * A * (1.0 - T),
        patronage_feedback=0.04 + 0.16 * A,
        censorship=0.03 + 0.20 * A * C,
        oversight=0.08 + 0.36 * I * T,
        restoration=0.03 + 0.15 * I,
        stress_from_crisis=0.08 + 0.24 * C,
        repression_backlash=0.06 + 0.18 * V,
        polarisation=0.05 + 0.22 * V,
        stabilisation=0.10 + 0.38 * I,
        support_gain=0.04 + 0.18 * A,
        support_order=0.04 + 0.14 * C,
        support_loss=0.05 + 0.22 * I,
        support_norm=0.05 + 0.18 * I,
        support_barrier=0.03 + 0.14 * I,
        conformity=0.04 + 0.14 * V,
        barrier_corruption=0.04 + 0.22 * A,
        barrier_fear=0.04 + 0.18 * C,
        barrier_fatigue=0.03 + 0.14 * V,
        barrier_restoration=0.04 + 0.18 * I,
        apparatus_feedback=0.04 + 0.15 * A,
        capture_mix=0.20 + 0.50 * A * (1.0 - I),
        crisis_threshold=0.55 + 0.15 * I - 0.20 * C,
        crisis_steepness=8.0 + 8.0 * A,
    )


def build_random_factions(cfg: MetaConfig, rng):
    N = cfg.council_size
    F = cfg.n_factions
    I = cfg.institutional_strength
    A = cfg.autocrat_skill
    T = cfg.information_transparency
    V = cfg.social_volatility

    if N < F:
        raise ValueError("council_size must be at least as large as n_factions")

    sizes = np.ones(F, dtype=int)
    remaining = N - F
    if remaining > 0:
        sizes += rng.multinomial(remaining, np.full(F, 1.0 / F))

    faction_id = np.empty(N, dtype=int)

    arrays = {
        "bias": np.empty(N),
        "susceptibility": np.empty(N),
        "reaction": np.empty(N),
        "legalism": np.empty(N),
        "fear": np.empty(N),
        "reform": np.empty(N),
        "patronage": np.empty(N),
        "security": np.empty(N),
    }

    start = 0
    for k in range(F):
        size = int(sizes[k])
        stop = start + size
        faction_id[start:stop] = k

        shift = rng.normal(0.0, 0.15)

        arrays["bias"][start:stop] = np.clip(
            rng.normal(1.0 + 0.6 * (1.0 - T) * shift, 0.10, size), 0.5, 1.7
        )
        arrays["susceptibility"][start:stop] = np.clip(
            rng.normal(0.35 + 0.45 * A + 0.20 * V + 0.10 * shift, 0.10, size), 0.05, 1.3
        )
        arrays["reaction"][start:stop] = np.clip(
            rng.normal(0.08 + 0.20 * I - 0.04 * shift, 0.03, size), 0.02, 0.50
        )
        arrays["legalism"][start:stop] = np.clip(
            rng.normal(0.25 + 0.65 * I - 0.10 * shift, 0.08, size), 0.05, 1.0
        )
        arrays["fear"][start:stop] = np.clip(
            rng.normal(0.20 + 0.50 * cfg.crisis_proneness + 0.12 * shift, 0.07, size), 0.05, 1.0
        )
        arrays["reform"][start:stop] = np.clip(
            rng.normal(0.20 + 0.60 * I - 0.10 * A, 0.07, size), 0.05, 1.0
        )
        arrays["patronage"][start:stop] = np.clip(
            rng.normal(0.15 + 0.60 * A + 0.10 * shift, 0.08, size), 0.02, 1.2
        )
        arrays["security"][start:stop] = np.clip(
            rng.normal(0.20 + 0.50 * cfg.crisis_proneness + 0.10 * shift, 0.08, size), 0.05, 1.0
        )

        start = stop

    masks = np.array([faction_id == k for k in range(F)])
    same = (faction_id[:, None] == faction_id[None, :]).astype(float)

    arrays.update({
        "sizes": sizes,
        "faction_id": faction_id,
        "masks": masks,
        "same": same,
    })

    return arrays


def sample_crisis_state(current_state, stress, resilience, entrenched_power, cfg, rng):
    stress = safe_scalar(stress, 0.2)
    resilience = safe_scalar(resilience, 0.5)
    entrenched_power = safe_scalar(entrenched_power, 0.1)
    base = safe_scalar(cfg.crisis_proneness, 0.4)

    p = np.zeros(4, dtype=float)

    if current_state == 0:
        p[0] = 0.82 - 0.25 * stress + 0.10 * resilience - 0.10 * base
        p[1] = 0.10 + 0.18 * stress + 0.10 * base
        p[2] = 0.04 + 0.10 * base
        p[3] = 0.04 + 0.12 * stress + 0.05 * entrenched_power
    elif current_state == 1:
        p[0] = 0.22 + 0.16 * resilience
        p[1] = 0.44 - 0.06 * resilience
        p[2] = 0.16 + 0.12 * base
        p[3] = 0.18 + 0.12 * stress + 0.06 * entrenched_power
    elif current_state == 2:
        p[0] = 0.14 + 0.10 * resilience
        p[1] = 0.14 + 0.05 * stress
        p[2] = 0.60 - 0.08 * resilience + 0.10 * base
        p[3] = 0.12 + 0.10 * stress + 0.05 * entrenched_power
    else:
        p[0] = 0.10 + 0.10 * resilience
        p[1] = 0.15 + 0.08 * resilience
        p[2] = 0.10 + 0.06 * base
        p[3] = 0.65 - 0.08 * resilience + 0.10 * entrenched_power + 0.08 * stress

    p = safe_array(p, fallback=0.25)
    p = np.clip(p, 1e-6, None)
    s = p.sum()

    if (not np.isfinite(s)) or s <= 0:
        p = np.array([0.70, 0.15, 0.10, 0.05], dtype=float)
    else:
        p = p / s

    return rng.choice(4, p=p)


def issue_preferences(issue_type, P, M, R, X, C, support, barrier, security, legalism, rng):
    noise = rng.normal(0.0, 0.05, size=support.shape[0])

    if issue_type == 0:
        council = 0.10 + 0.55 * C + 0.22 * security + 0.10 * support - 0.16 * barrier - 0.10 * R + noise
        leader = clip01(0.72 + 0.22 * C + 0.05 * M)
    elif issue_type == 1:
        council = 0.05 + 0.28 * support + 0.18 * M + 0.10 * C - 0.40 * barrier - 0.18 * legalism - 0.16 * R + noise
        leader = clip01(0.92 + 0.04 * M)
    else:
        council = 0.12 + 0.15 * support + 0.16 * X + 0.10 * C + 0.10 * security - 0.18 * barrier - 0.08 * legalism + noise
        leader = clip01(0.65 + 0.10 * X + 0.08 * M)

    return clip01(council), float(leader)


def inferno_station_scores(
    P, M, R, X, C, law_strength,
    support, barrier, perceived, faction_mean_support, faction
):
    N = support.shape[0]
    scores = np.zeros((N + 1, len(STATION_NAMES)), dtype=float)

    deviation = np.abs(support - faction_mean_support)
    legal_break = (1.0 - faction["legalism"]) * support
    corruption = faction["patronage"] * M
    coercion = faction["security"] * C + faction["fear"] * (P + 0.4 * C)
    deceit = M * faction["susceptibility"] + 0.4 * perceived

    scores[:N, 1] = clip01(0.20 * support + 0.20 * faction["security"] + 0.12 * C + 0.10 * M + 0.16 * (1.0 - barrier))
    scores[:N, 2] = clip01(0.36 * corruption + 0.18 * support + 0.18 * X + 0.10 * (1.0 - barrier))
    scores[:N, 3] = clip01(0.40 * corruption + 0.14 * support + 0.16 * (1.0 - R) + 0.12 * (1.0 - law_strength))
    scores[:N, 4] = clip01(0.26 * coercion + 0.24 * X + 0.10 * support + 0.12 * (1.0 - barrier) + 0.10 * deviation)
    scores[:N, 5] = clip01(0.42 * legal_break + 0.12 * M + 0.18 * (1.0 - R) + 0.12 * (1.0 - law_strength))

    scores[:N, 6] = clip01(0.34 * coercion + 0.18 * P + 0.10 * (1.0 - barrier) + 0.08 * support + 0.16 * (1.0 - law_strength))
    scores[:N, 7] = clip01(0.14 * X + 0.12 * deviation + 0.10 * (1.0 - support) + 0.08 * (1.0 - barrier) + 0.06 * faction["fear"])
    scores[:N, 8] = clip01(0.24 * legal_break + 0.16 * X + 0.16 * (1.0 - R) + 0.12 * (1.0 - law_strength) + 0.08 * deviation)

    scores[:N, 9] = clip01(0.34 * deceit + 0.14 * support + 0.10 * corruption + 0.10 * (1.0 - barrier))
    scores[:N, 10] = clip01(0.36 * deceit + 0.12 * support + 0.12 * (1.0 - barrier) + 0.10 * X)
    scores[:N, 11] = clip01(0.40 * corruption + 0.16 * legal_break + 0.16 * (1.0 - R) + 0.08 * (1.0 - law_strength))
    scores[:N, 12] = clip01(0.38 * deceit + 0.12 * perceived + 0.10 * (1.0 - barrier) + 0.08 * (1.0 - R))
    scores[:N, 13] = clip01(0.42 * corruption + 0.12 * support + 0.16 * (1.0 - law_strength) + 0.08 * deviation)
    scores[:N, 14] = clip01(0.30 * support + 0.16 * barrier * (1.0 - faction["legalism"]) + 0.14 * deceit + 0.12 * deviation + 0.08 * (1.0 - R))
    scores[:N, 15] = clip01(0.32 * deceit + 0.12 * corruption + 0.16 * deviation + 0.12 * (1.0 - barrier) + 0.06 * (1.0 - R))
    scores[:N, 16] = clip01(0.34 * deceit + 0.12 * support + 0.16 * legal_break + 0.08 * X + 0.06 * (1.0 - R))
    scores[:N, 17] = clip01(0.30 * deviation + 0.22 * support * (1.0 - barrier) + 0.16 * deceit + 0.16 * X)
    scores[:N, 18] = clip01(0.36 * deceit + 0.12 * deviation + 0.10 * (1.0 - barrier) + 0.10 * X + 0.08 * (1.0 - R))
    scores[:N, 19] = clip01(0.30 * deviation + 0.18 * support * (1.0 - barrier) + 0.18 * M * faction["susceptibility"] + 0.10 * (1.0 - R) + 0.08 * (1.0 - law_strength))

    scores[N, 1] = clip01(0.18 + 0.14 * M + 0.12 * P + 0.12 * X + 0.08 * C)
    scores[N, 2] = clip01(0.18 + 0.24 * M + 0.18 * P + 0.12 * X + 0.08 * C)
    scores[N, 3] = clip01(0.22 + 0.32 * P + 0.16 * M + 0.10 * (1.0 - R) + 0.08 * (1.0 - law_strength))
    scores[N, 4] = clip01(0.16 + 0.24 * C + 0.20 * X + 0.12 * P + 0.08 * (1.0 - law_strength))
    scores[N, 5] = clip01(0.16 + 0.36 * (1.0 - R) + 0.16 * M + 0.12 * P)
    scores[N, 6] = clip01(0.16 + 0.30 * C + 0.18 * P + 0.08 * X + 0.10 * (1.0 - law_strength))
    scores[N, 7] = clip01(0.10 + 0.18 * X + 0.14 * P + 0.12 * (1.0 - law_strength) + 0.08 * M)
    scores[N, 8] = clip01(0.16 + 0.22 * (1.0 - R) + 0.14 * X + 0.14 * P + 0.10 * (1.0 - law_strength))
    scores[N, 9] = clip01(0.18 + 0.36 * M + 0.12 * P + 0.10 * (1.0 - R))
    scores[N, 10] = clip01(0.18 + 0.38 * M + 0.12 * X + 0.08 * (1.0 - law_strength))
    scores[N, 11] = clip01(0.20 + 0.38 * P + 0.14 * M + 0.10 * (1.0 - R))
    scores[N, 12] = clip01(0.16 + 0.34 * M + 0.12 * (1.0 - R) + 0.10 * X)
    scores[N, 13] = clip01(0.18 + 0.36 * P + 0.16 * M + 0.08 * (1.0 - law_strength))
    scores[N, 14] = clip01(0.18 + 0.32 * M + 0.16 * P + 0.10 * (1.0 - R))
    scores[N, 15] = clip01(0.18 + 0.34 * M + 0.12 * P + 0.10 * X)
    scores[N, 16] = clip01(0.20 + 0.38 * M + 0.14 * P + 0.10 * (1.0 - R))
    scores[N, 17] = clip01(0.20 + 0.30 * P + 0.16 * M + 0.14 * X)
    scores[N, 18] = clip01(0.20 + 0.38 * M + 0.12 * P + 0.08 * (1.0 - R))
    scores[N, 19] = clip01(0.24 + 0.30 * P + 0.16 * M + 0.08 * (1.0 - R) + 0.08 * (1.0 - law_strength))

    return scores


def assign_inferno_stations(scores):
    macro = np.zeros((scores.shape[0], 9), dtype=float)

    macro[:, 1] = 1.05 * scores[:, 1]
    macro[:, 2] = 1.00 * scores[:, 2]
    macro[:, 3] = 1.05 * scores[:, 3]
    macro[:, 4] = 1.00 * scores[:, 4]
    macro[:, 5] = 1.10 * scores[:, 5]
    macro[:, 6] = 1.00 * scores[:, 6:9].max(axis=1)
    macro[:, 7] = 1.15 * scores[:, 9:19].max(axis=1)
    macro[:, 8] = 1.12 * scores[:, 19]

    out = np.zeros(scores.shape[0], dtype=int)

    for i in range(scores.shape[0]):
        mx = macro[i, 1:].max()

        if mx < 0.17:
            out[i] = 0
            continue

        if scores[i, 19] > 0.62:
            out[i] = 19
            continue

        fraud_peak = scores[i, 9:19].max()
        violence_peak = scores[i, 6:9].max()

        if fraud_peak > 0.50 and fraud_peak >= 0.95 * violence_peak:
            out[i] = 9 + int(np.argmax(scores[i, 9:19]))
            continue

        if violence_peak > 0.50:
            out[i] = 6 + int(np.argmax(scores[i, 6:9]))
            continue

        g = int(np.argmax(macro[i, 1:]) + 1)

        if g == 6:
            out[i] = 6 + int(np.argmax(scores[i, 6:9]))
        elif g == 7:
            out[i] = 9 + int(np.argmax(scores[i, 9:19]))
        elif g == 8:
            out[i] = 19
        else:
            out[i] = g

    return out


def simulate_inferno_republic(cfg: MetaConfig, seed=None):
    seed = cfg.seed if seed is None else seed
    rng = np.random.default_rng(seed)
    ip = derive_internal_params(cfg)
    faction = build_random_factions(cfg, rng)

    N = cfg.council_size
    F = cfg.n_factions
    steps = int(round(cfg.years / cfg.dt)) + 1
    lag = max(1, int(round(ip.latency_years / cfg.dt)))
    t = np.linspace(0.0, cfg.years, steps)
    crisis_levels = np.array([0.0, 0.35, 0.75, 1.0])

    P = np.zeros(steps)
    M = np.zeros(steps)
    R = np.zeros(steps)
    X = np.zeros(steps)
    crisis_state = np.zeros(steps, dtype=int)
    crisis_severity = np.zeros(steps)

    support = np.zeros((steps, N))
    barrier = np.zeros((steps, N))
    perceived = np.zeros((steps, N))

    faction_support = np.zeros((steps, F))
    faction_barrier = np.zeros((steps, F))
    legal_effective = np.zeros(steps)
    fragmentation = np.zeros(steps)

    alpha = np.zeros(steps)
    formal_autocrat_weight = np.zeros(steps)
    effective_autocrat_weight = np.zeros(steps)

    group_weight = np.zeros((steps, F + 1))
    decisions = np.zeros(steps)
    issue_type = np.zeros(steps, dtype=int)

    station = np.zeros((steps, N + 1), dtype=int)

    masks = faction["masks"]
    same = faction["same"]

    P[:lag] = 0.05
    M[:lag] = 0.08
    R[:lag] = 0.70
    X[:lag] = 0.18

    for k in range(F):
        idx = masks[k]
        support[:lag, idx] = np.clip(rng.normal(0.25, 0.05, (lag, idx.sum())), 0.02, 0.98)
        barrier[:lag, idx] = np.clip(rng.normal(0.60, 0.06, (lag, idx.sum())), 0.02, 0.98)

    def aggregate(s, b):
        fs = np.array([safe_mean_from_mask(s, m, 0.0) for m in masks])
        fb = np.array([safe_mean_from_mask(b, m, 0.0) for m in masks])

        weights = np.array([m.mean() for m in masks], dtype=float)
        weights = safe_array(weights, 0.0)
        ws = weights.sum()
        if ws <= 0:
            weights = np.full_like(weights, 1.0 / len(weights))
        else:
            weights = weights / ws

        center = np.sum(weights * fs)
        frag = np.sqrt(np.sum(weights * (fs - center) ** 2))
        law = np.sum(weights * fb) * (1.0 - 0.75 * frag)

        return fs, fb, clip01(law), clip01(frag)

    for q in range(lag):
        fs, fb, law, frag = aggregate(support[q], barrier[q])
        faction_support[q] = fs
        faction_barrier[q] = fb
        legal_effective[q] = law
        fragmentation[q] = frag
        formal_autocrat_weight[q] = P[q]
        effective_autocrat_weight[q] = P[q]

        for j in range(F):
            group_weight[q, j] = (1.0 - P[q]) * masks[j].sum() / N
        group_weight[q, -1] = P[q]

        scores = inferno_station_scores(
            P[q], M[q], R[q], X[q], 0.0, law,
            support[q], barrier[q], np.full(N, 0.1),
            fs[faction["faction_id"]], faction
        )
        station[q] = assign_inferno_stations(scores)

    for k in range(lag, steps - 1):
        crisis_state[k] = sample_crisis_state(
            crisis_state[k - 1], X[k - 1], R[k - 1], P[k - 1], cfg, rng
        )
        crisis_severity[k] = crisis_levels[crisis_state[k]]
        delayed = k - lag

        s_now = support[k].copy()
        b_now = barrier[k].copy()

        fs, fb, law_now, frag_now = aggregate(s_now, b_now)
        faction_support[k] = fs
        faction_barrier[k] = fb
        legal_effective[k] = law_now
        fragmentation[k] = frag_now

        faction_mean_support = fs[faction["faction_id"]]

        perceived_threat = (
            P[delayed] * np.exp(-ip.obfuscation * M[delayed] * faction["bias"])
                        + 0.30 * crisis_severity[delayed]
                        + 0.12 * X[delayed]
                        + rng.normal(0.0, ip.observation_noise, size=N)
        )
        perceived_threat = clip01(safe_array(perceived_threat, 0.2))
        perceived[k] = perceived_threat

        ds = (
            ip.support_gain * faction["patronage"] * M[k] * (1.0 - s_now)
                        + ip.support_order * faction["security"] * crisis_severity[k] * (1.0 - s_now)
                        + ip.conformity * (faction_mean_support - s_now)
                        - ip.support_loss * faction["legalism"] * P[k] * (1.0 - law_now) * s_now
                        - ip.support_norm * faction["legalism"] * R[k] * s_now
                        - ip.support_barrier * b_now * s_now
        )

        db = (
            faction["reaction"] * perceived_threat * (1.0 - b_now)
                        + ip.barrier_restoration * faction["reform"] * R[k] * (1.0 - P[k]) * (1.0 - b_now)
                        - ip.barrier_corruption * faction["susceptibility"] * M[k] * s_now * b_now
                        - ip.barrier_fear * faction["fear"] * (P[k] + 0.5 * crisis_severity[k]) * b_now
                        - ip.barrier_fatigue * crisis_severity[k] * b_now
        )

        s_new = clip01(s_now + cfg.dt * safe_array(ds, 0.0))
        b_new = clip01(b_now + cfg.dt * safe_array(db, 0.0))

        support[k + 1] = s_new
        barrier[k + 1] = b_new

        fs_new, fb_new, law_new, frag_new = aggregate(s_new, b_new)
        faction_support[k + 1] = fs_new
        faction_barrier[k + 1] = fb_new
        legal_effective[k + 1] = law_new
        fragmentation[k + 1] = frag_new

        mean_support = safe_scalar(s_new.mean(), 0.25)

        dR = ip.reform_capacity * law_new * (1.0 - R[k]) - (0.08 + 0.20 * cfg.autocrat_skill) * (P[k] + 0.5 * M[k] + 0.4 * X[k]) * R[k]
        dX = ip.stress_from_crisis * crisis_severity[k] * (1.0 - X[k]) + ip.polarisation * frag_new * (1.0 - X[k]) + ip.repression_backlash * P[k] * (1.0 - law_new) * (1.0 - X[k]) - ip.stabilisation * (R[k] + 0.5 * law_new) * X[k]
        dM = ip.propaganda * P[k] * (1.0 - M[k]) + ip.patronage_feedback * mean_support * P[k] * (1.0 - M[k]) + ip.censorship * crisis_severity[k] * (1.0 - law_new) * (1.0 - M[k]) - ip.oversight * law_new * M[k] - 0.04 * X[k] * M[k]
        dP = ip.ambition * P[k] * (1.0 - P[k]) + ip.crisis_capture * crisis_severity[k] * (1.0 - law_new) * (1.0 - P[k]) + 0.10 * mean_support * (1.0 - P[k]) + ip.apparatus_feedback * M[k] * (1.0 - P[k]) - ip.legal_drag * law_new * P[k] - ip.restoration * R[k] * (1.0 - mean_support) * P[k]

        R[k + 1] = clip01(R[k] + cfg.dt * safe_scalar(dR, 0.0))
        X[k + 1] = clip01(X[k] + cfg.dt * safe_scalar(dX, 0.0))
        M[k + 1] = clip01(M[k] + cfg.dt * safe_scalar(dM, 0.0))
        P[k + 1] = clip01(P[k] + cfg.dt * safe_scalar(dP, 0.0))

        z = crisis_severity[k] + 0.25 * M[k] + 0.15 * mean_support - 0.55 * law_new - ip.crisis_threshold
        alpha[k] = sigmoid(ip.crisis_steepness * z)
        formal_autocrat_weight[k] = clip01(P[k] + (1.0 - P[k]) * alpha[k])

        sim = 1.0 - np.abs(s_new[:, None] - s_new[None, :])
        council_raw = (0.25 + 0.65 * same) * (0.20 + 0.80 * sim)
        np.fill_diagonal(council_raw, 0.35)

        autocrat_pull = clip01(
                        0.03
                        + 0.50 * M[k]
                        + 0.15 * crisis_severity[k]
                        + 0.12 * s_new
                        + 0.10 * faction["susceptibility"]
        )

        row_sums = council_raw.sum(axis=1, keepdims=True)
        row_sums[row_sums <= 0] = 1.0
        council_raw = council_raw / row_sums
        council_block = council_raw * (1.0 - autocrat_pull[:, None])

        K = np.zeros((N + 1, N + 1))
        K[:N, :N] = council_block
        K[:N, N] = autocrat_pull

        allies = clip01(0.04 + 0.10 * s_new + 0.05 * faction["susceptibility"] - 0.06 * b_new)
        total_allies = allies.sum()
        if total_allies > 0:
            K[N, :N] = allies / total_allies * (0.10 + 0.08 * (1.0 - law_new))
        else:
            K[N, :N] = 1.0 / N * 0.10

        K[N, N] = 1.0 - K[N, :N].sum()
        K = safe_array(K, 0.0)

        row_sums = K.sum(axis=1, keepdims=True)
        row_sums[row_sums <= 0] = 1.0
        K = K / row_sums

        centrality = stationary_distribution(K)

        capture = clip01(
            ip.capture_mix * (
                M[k] * (1.0 - law_new)
                                + 0.30 * frag_new
                                + 0.20 * crisis_severity[k]
                                + 0.15 * mean_support
            )
        )

        w_formal = np.full(N + 1, (1.0 - formal_autocrat_weight[k]) / N)
        w_formal[-1] = formal_autocrat_weight[k]

        w_eff = safe_array((1.0 - capture) * w_formal + capture * centrality, fallback=1.0 / (N + 1))
        s = w_eff.sum()
        if s <= 0:
            w_eff = np.full(N + 1, 1.0 / (N + 1))
        else:
            w_eff = w_eff / s

        effective_autocrat_weight[k] = w_eff[-1]

        for j in range(F):
            group_weight[k, j] = w_eff[:N][masks[j]].sum()
        group_weight[k, -1] = w_eff[-1]

        if crisis_severity[k] > 0.50:
            current_issue = rng.choice([0, 1, 2], p=[0.60, 0.25, 0.15])
        elif X[k] > 0.45:
            current_issue = rng.choice([0, 1, 2], p=[0.20, 0.20, 0.60])
        else:
            current_issue = rng.choice([0, 1, 2], p=[0.25, 0.35, 0.40])

        issue_type[k] = current_issue

        council_votes, leader_vote = issue_preferences(
            current_issue, P[k], M[k], R[k], X[k], crisis_severity[k],
            s_new, b_new, faction["security"], faction["legalism"], rng
        )
        votes = np.concatenate([council_votes, [leader_vote]])
        decisions[k] = float(np.dot(w_eff, votes))

        scores = inferno_station_scores(
            P[k], M[k], R[k], X[k], crisis_severity[k], law_new,
            s_new, b_new, perceived_threat, fs_new[faction["faction_id"]], faction
        )
        station[k] = assign_inferno_stations(scores)

    crisis_state[-1] = crisis_state[-2]
    crisis_severity[-1] = crisis_severity[-2]
    alpha[-1] = alpha[-2]
    formal_autocrat_weight[-1] = formal_autocrat_weight[-2]
    effective_autocrat_weight[-1] = effective_autocrat_weight[-2]
    decisions[-1] = decisions[-2]
    group_weight[-1] = group_weight[-2]
    faction_support[-1] = faction_support[-2]
    faction_barrier[-1] = faction_barrier[-2]
    legal_effective[-1] = legal_effective[-2]
    fragmentation[-1] = fragmentation[-2]
    issue_type[-1] = issue_type[-2]
    station[-1] = station[-2]
    P[-1] = P[-2]
    M[-1] = M[-2]
    R[-1] = R[-2]
    X[-1] = X[-2]

    return {
        "time": t,
        "P": P,
        "M": M,
        "R": R,
        "X": X,
        "support": support,
        "barrier": barrier,
        "perceived": perceived,
        "faction_support": faction_support,
        "faction_barrier": faction_barrier,
        "legal_effective": legal_effective,
        "fragmentation": fragmentation,
        "alpha": alpha,
        "formal_autocrat_weight": formal_autocrat_weight,
        "effective_autocrat_weight": effective_autocrat_weight,
        "group_weight": group_weight,
        "decisions": decisions,
        "issue_type": issue_type,
        "crisis_state": crisis_state,
        "crisis_severity": crisis_severity,
        "station": station,
        "station_counts": station_counts_over_time(station),
        "final_station": station[-1].copy(),
        "dominant_station": dominant_stations(station),
        "faction": faction,
        "internal": ip,
        "names": person_names(cfg.council_size),
    }


def set_style():
    plt.rcParams.update({
        "figure.facecolor": "#f7f3ed",
        "axes.facecolor": "#fbf8f3",
        "savefig.facecolor": "#f7f3ed",
        "font.family": "DejaVu Serif",
        "axes.edgecolor": "#3d322c",
        "axes.labelcolor": "#3d322c",
        "text.color": "#2f241f",
        "xtick.color": "#3d322c",
        "ytick.color": "#3d322c",
        "grid.color": "#c9b9a6",
        "grid.alpha": 0.25,
        "axes.titleweight": "bold",
        "axes.titlesize": 14,
        "axes.labelsize": 11,
    })


def plot_main_dashboard(res, cfg):
    set_style()
    t = res["time"]
    F = cfg.n_factions

    fig = plt.figure(figsize=(16, 12))
    gs = fig.add_gridspec(3, 2, height_ratios=[1.1, 1.0, 1.0])

    faction_cols = ["#6d597a", "#8ab17d", "#e9c46a", "#457b9d"][:F]

    ax1 = fig.add_subplot(gs[0, 0])
    stack = [res["group_weight"][:, i] for i in range(F)] + [res["effective_autocrat_weight"]]
    labels = [f"Faction {i+1}" for i in range(F)] + ["Autocrat"]
    cols = faction_cols + ["#9b2226"]
    ax1.stackplot(t, *stack, labels=labels, colors=cols, alpha=0.92)
    ax1.set_ylim(0, 1)
    ax1.set_title("Power spectrum")
    ax1.set_ylabel("Effective decision weight")
    ax1.legend(loc="upper left", ncol=2, frameon=False)

    ax2 = fig.add_subplot(gs[0, 1], sharex=ax1)
    ax2.plot(t, res["P"], lw=2.2, label="Entrenched power", color="#9b2226")
    ax2.plot(t, res["legal_effective"], lw=2.2, label="Legal barrier", color="#386641")
    ax2.plot(t, res["R"], lw=1.8, label="Constitutional resilience", color="#1d3557")
    ax2.plot(t, res["X"], lw=1.8, label="Social stress", color="#7f5539")
    ax2.fill_between(t, 0, res["crisis_severity"], color="#b56576", alpha=0.10, label="Crisis field")
    ax2.set_ylim(0, 1)
    ax2.set_title("State variables")
    ax2.legend(loc="upper left", ncol=2, frameon=False)

    ax3 = fig.add_subplot(gs[1, 0], sharex=ax1)
    for i in range(F):
        ax3.plot(t, res["faction_support"][:, i], lw=1.8, label=f"Faction {i+1} support", color=faction_cols[i])
    ax3.plot(t, res["fragmentation"], lw=2.2, color="#3a3a3a", label="Fragmentation")
    ax3.set_ylim(0, 1)
    ax3.set_title("Faction support and fragmentation")
    ax3.legend(loc="upper left", ncol=2, frameon=False)

    ax4 = fig.add_subplot(gs[1, 1], sharex=ax1)
    for i in range(F):
        ax4.plot(t, res["faction_barrier"][:, i], lw=1.8, label=f"Faction {i+1} barrier", color=faction_cols[i])
    ax4.set_ylim(0, 1)
    ax4.set_title("Faction barrier strength")
    ax4.legend(loc="upper left", ncol=2, frameon=False)

    ax5 = fig.add_subplot(gs[2, 0], sharex=ax1)
    ax5.plot(t, res["decisions"], color="#a44a3f", lw=1.6, label="Decision centralisation")
    ax5.plot(t, rolling_mean(res["decisions"], max(3, int(round(1 / cfg.dt)))), color="#2a9d8f", lw=2.4, label="One year rolling mean")
    ax5.set_ylim(0, 1)
    ax5.set_title("Decision pathway")
    ax5.set_xlabel("Years")
    ax5.legend(loc="upper left", frameon=False)

    ax6 = fig.add_subplot(gs[2, 1])
    heat = res["group_weight"].T
    im = ax6.imshow(heat, aspect="auto", origin="lower", extent=[t[0], t[-1], 0, F + 1], cmap="magma")
    ax6.set_yticks(np.arange(F + 1) + 0.5)
    ax6.set_yticklabels([f"Faction {i+1}" for i in range(F)] + ["Autocrat"])
    ax6.set_xlabel("Years")
    ax6.set_title("Weight heat map")
    fig.colorbar(im, ax=ax6, fraction=0.046, pad=0.04)

    fig.tight_layout()
    return fig


def plot_inferno_heatmap(res, cfg):
    set_style()
    t = res["time"]

    cmap = ListedColormap(STATION_COLORS)
    norm = BoundaryNorm(np.arange(-0.5, len(STATION_NAMES) + 0.5, 1), cmap.N)

    fig, ax = plt.subplots(figsize=(16, 8))
    im = ax.imshow(
        res["station"].T,
        aspect="auto",
        origin="lower",
        cmap=cmap,
        norm=norm,
        extent=[t[0], t[-1], 0, cfg.council_size + 1]
    )

    ax.set_title("Dante station of every person through time")
    ax.set_xlabel("Years")
    ax.set_ylabel("Person")
    ax.set_yticks([0, cfg.council_size / 2, cfg.council_size, cfg.council_size + 1])
    ax.set_yticklabels(["Council 1", f"Council {cfg.council_size // 2}", f"Council {cfg.council_size}", "Autocrat"])

    cbar = fig.colorbar(im, ax=ax, ticks=np.arange(len(STATION_NAMES)), fraction=0.02, pad=0.02)
    cbar.ax.set_yticklabels([n.replace("Fraud - ", "") for n in STATION_NAMES])

    fig.tight_layout()
    return fig


def plot_station_counts(res):
    set_style()
    t = res["time"]
    counts = res["station_counts"]

    fig, ax = plt.subplots(figsize=(16, 7))
    ax.stackplot(
        t,
        [counts[:, i] for i in range(len(STATION_NAMES))],
        labels=STATION_NAMES,
        colors=STATION_COLORS,
        alpha=0.95,
    )
    ax.set_title("Population of each Inferno station over time")
    ax.set_xlabel("Years")
    ax.set_ylabel("Number of people")
    ax.legend(loc="upper left", ncol=4, frameon=False, fontsize=8)

    fig.tight_layout()
    return fig


def plot_selected_trajectories(res, cfg):
    set_style()
    t = res["time"]

    indices = [0, cfg.council_size // 3, 2 * cfg.council_size // 3, cfg.council_size - 1, cfg.council_size]
    labels = [res["names"][i] for i in indices]

    cmap = ListedColormap(STATION_COLORS)
    norm = BoundaryNorm(np.arange(-0.5, len(STATION_NAMES) + 0.5, 1), cmap.N)

    fig, ax = plt.subplots(figsize=(16, 3.8))
    data = res["station"][:, indices].T
    im = ax.imshow(data, aspect="auto", origin="lower", cmap=cmap, norm=norm, extent=[t[0], t[-1], 0, len(indices)])

    ax.set_yticks(np.arange(len(indices)) + 0.5)
    ax.set_yticklabels(labels)
    ax.set_xlabel("Years")
    ax.set_title("Selected moral trajectories")

    fig.colorbar(im, ax=ax, ticks=np.arange(len(STATION_NAMES)), fraction=0.025, pad=0.02)
    fig.tight_layout()
    return fig


def plot_overlay_counts(res, image_path):
    img = plt.imread(image_path)
    counts = np.bincount(res["final_station"], minlength=len(STATION_NAMES))

    set_style()
    fig, ax = plt.subplots(figsize=(8, 12))
    ax.imshow(img)
    ax.axis("off")
    ax.set_title("Final Inferno counts over Dante's map")

    for i, _ in enumerate(STATION_NAMES):
        x, y, _ = STATION_POSITIONS[i]
        txt = str(counts[i])
        text_color = "white" if i >= 9 or i == 19 or i in [7, 8] else "black"
        ax.text(
            x, y, txt,
            transform=ax.transAxes,
            ha="center",
            va="center",
            fontsize=12,
            color=text_color,
            bbox=dict(facecolor=STATION_COLORS[i], edgecolor="black", boxstyle="round,pad=0.22", alpha=0.92)
        )

    fig.tight_layout()
    return fig


def plot_people_overlay(res, image_path, seed=123):
    img = plt.imread(image_path)
    rng = np.random.default_rng(seed)
    stations = res["final_station"]

    set_style()
    fig, ax = plt.subplots(figsize=(8, 12))
    ax.imshow(img)
    ax.axis("off")
    ax.set_title("Final placement of every person on Dante's Inferno")

    for i, c in enumerate(stations):
        cx, cy, hw = STATION_POSITIONS[int(c)]
        x = np.clip(cx + rng.uniform(-0.9 * hw, 0.9 * hw), 0.08, 0.92)
        y = np.clip(cy + rng.normal(0.0, 0.009 if c < 6 else 0.007), 0.02, 0.98)

        if i == len(stations) - 1:
            ax.scatter([x], [y], transform=ax.transAxes, s=180, marker="*", color="gold", edgecolor="black", linewidth=0.8, zorder=5)
        else:
            ax.scatter([x], [y], transform=ax.transAxes, s=25, color="#0f4c81", edgecolor="white", linewidth=0.3, alpha=0.92, zorder=4)

    fig.tight_layout()
    return fig


def print_summary(cfg, res):
    print("=" * 76)
    print("Top level controls")
    print(f"Institutional strength      {cfg.institutional_strength:.3f}")
    print(f"Autocrat skill              {cfg.autocrat_skill:.3f}")
    print(f"Crisis proneness            {cfg.crisis_proneness:.3f}")
    print(f"Information transparency    {cfg.information_transparency:.3f}")
    print(f"Social volatility           {cfg.social_volatility:.3f}")
    print("-" * 76)
    print("Final state")
    print(f"Entrenched autocrat power   {res['P'][-1]:.3f}")
    print(f"Effective autocrat weight   {res['effective_autocrat_weight'][-1]:.3f}")
    print(f"Legal barrier               {res['legal_effective'][-1]:.3f}")
    print(f"Constitutional resilience   {res['R'][-1]:.3f}")
    print(f"Social stress               {res['X'][-1]:.3f}")
    print("=" * 76)


def print_people_table(res, n=20):
    names = res["names"]
    final_station = res["final_station"]
    dominant_station = res["dominant_station"]

    print("=" * 96)
    print(f"{'Person':<16} {'Final station':<34} {'Dominant station in second half':<34}")
    print("-" * 96)

    limit = min(n, len(names))
    for i in range(limit):
        print(f"{names[i]:<16} {STATION_NAMES[final_station[i]]:<34} {STATION_NAMES[dominant_station[i]]:<34}")

    print(f"{names[-1]:<16} {STATION_NAMES[final_station[-1]]:<34} {STATION_NAMES[dominant_station[-1]]:<34}")
    print("=" * 96)


if __name__ == "__main__":
    cfg = MetaConfig(
        years=100.0,
        dt=1.0 / 12.0,
        council_size=100,
        n_factions=4,
        seed=42,
        institutional_strength=0.65,
        autocrat_skill=0.55,
        crisis_proneness=0.40,
        information_transparency=0.60,
        social_volatility=0.45,
    )

    inferno_image_path = "/mnt/data/58d5ae81-d00d-4b12-9cbb-2fddf958598b.png"
    output_dir = "./inferno_outputs"
    os.makedirs(output_dir, exist_ok=True)

    res = simulate_inferno_republic(cfg, seed=cfg.seed)

    print_summary(cfg, res)
    print_people_table(res, n=20)

    fig1 = plot_main_dashboard(res, cfg)
    fig1.savefig(os.path.join(output_dir, "dashboard.png"), dpi=200, bbox_inches="tight")

    fig2 = plot_inferno_heatmap(res, cfg)
    fig2.savefig(os.path.join(output_dir, "inferno_heatmap.png"), dpi=200, bbox_inches="tight")

    fig3 = plot_station_counts(res)
    fig3.savefig(os.path.join(output_dir, "station_counts.png"), dpi=200, bbox_inches="tight")

    fig4 = plot_selected_trajectories(res, cfg)
    fig4.savefig(os.path.join(output_dir, "selected_trajectories.png"), dpi=200, bbox_inches="tight")

    if os.path.exists(inferno_image_path):
        fig5 = plot_overlay_counts(res, inferno_image_path)
        fig5.savefig(os.path.join(output_dir, "inferno_overlay_counts.png"), dpi=200, bbox_inches="tight")

        fig6 = plot_people_overlay(res, inferno_image_path, seed=cfg.seed)
        fig6.savefig(os.path.join(output_dir, "inferno_people_overlay.png"), dpi=200, bbox_inches="tight")

    plt.show()
```

:::
