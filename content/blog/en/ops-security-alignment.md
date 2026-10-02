---
title: "Operations and security: when security becomes a cost for the team"
date: "2026-02-24"
locale: "en"
description: "Rules that slow delivery do not get remembered, they get worked around. How to make controls something the team accepts."
tags: ["Operations", "Security", "Delivery"]
author: "Riccardo Bozzato"
published: true
---
The most honest test I know of security applied to a delivery team is this: when a rule slows someone down, do they work around it or ask for help?

If they work around it, the rule is not a control. It is an obstacle, and obstacles get worked around.

## The invisible cost

No security department likes saying it, but a control that adds two steps to every deploy does not cost two steps. It costs the number of people who stop using the pipeline.

The team that bypasses the pipeline is not a team that ignores security. It is a team that found another way to deliver. And that other way is almost always worse for everyone: no trace, no audit, no rollback.

I have seen the exact moment it happens. It is not the first bypass: it is the third time somebody does it and nobody mentions it, because saying it means admitting the system does not work.

## The rule that goes first

A security rule enters a team only if it moves a number that team cares about.

That turns the conversation from "security asks you to slow down" into "security asks you to reduce time to restore". Technically identical requests, but the second one has a sponsor.

My test: for every control I want to introduce, I ask which number it improves. If there is no answer, I do not introduce it. Not because it is wrong: because it will be worked around, and a bypassed control is worse than no control, because it creates a false sense of safety.

## The order that has worked for me

In an operations department, in this order.

**Secrets first.** A secret scanner in CI. Costs minutes, removes no autonomy, and when it catches something the team is grateful, because it finds a problem they already had and did not know about.

**Then rollback.** A flag on every risky change, with instant rollback. This is not a security control: it is a delivery control, and no team works around it because it removes anxiety.

**Then observability.** Visible error budget, alerts that reach someone who can act rather than a shared inbox. An alert with no name and no action is noise, and noise is what makes people deaf to real alerts.

**Encryption and compliance come after, not because they matter less.** They come after because they are the ones a team cannot easily bypass, and therefore the ones you can negotiate on. If you lead with them, you hit a wall on day one and then have no credibility left to ask for the others.

## The mistake everyone makes

Alerting on everything. Thirty alerts a day, none of them priority.

The team stops reading, and when the one alert that mattered arrives, they do not read it. Not out of laziness: because the other twenty-nine taught them alerts are noise.

The rule I use: if there is no clear action, the alert does not exist. It is not an alarm. It is just a cost.

## Where it becomes a cultural problem

The signal that security has become a cost is not the incident count: it is the number of times somebody says "I cannot touch this because it is blocked", without knowing exactly why.

That "I cannot" is the moment the person has stopped asking and stopped reporting. At that point the system no longer protects you, because information about what is happening no longer comes from that person.

The safest system I have seen was also the least restrictive one. The least safe was full of controls, and its security depended on a single person who had not yet got tired of reporting violations.
