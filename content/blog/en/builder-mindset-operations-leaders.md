---
title: "The builder mindset, applied to operations"
date: "2026-03-18"
locale: "en"
description: "Moving from product manager to operations manager is not a change of industry. It is a change in what you consider a bug."
tags: ["Operations", "Culture", "Builder"]
author: "Riccardo Bozzato"
published: true
---
I moved from product management into operations without changing company. The hardest shift was not learning a new industry: it was working out what counts as a bug.

## A bug is a process that repeats

Someone coming from product looks for the bug in the software. That works fine until they meet the module that only works because of the override someone made by hand three months ago.

A process that works because everyone puts a piece of it in is not a process. It is a process with a bug inside, and the bug is the undocumented exception.

The builder question, applied to operations, is one: **if this step had to be redone tomorrow by someone who has never seen this process, would it work?**

If not, you do not have a documentation problem. You have a process standing on one person's memory.

## The three symptoms I learned to look for

**The exception with a name.** When a process only works because Marianna knows not to do a certain thing, the process has an implicit owner. When Marianna goes on holiday, the process stops. That is not a process, it is a person with an unwritten role.

**The fix nobody can repeat.** A ticket closed that works and nobody can explain. It is the most insidious form of tribal knowledge: the result is there, the cause is not. Six months later it does not reproduce and nobody knows why.

**The process that works "despite" the tools.** If your people keep control sheets because the system does not say what they need, that is not a discipline problem: it is a process that was never redesigned around how people actually work.

## What I actually do

Not document. Design.

When a process leaks, my first move is not to write down how it works: it is to work out which step is unnecessary. Nine times out of ten, the step was added for a reason nobody remembers.

That is the most useful thing I took from the builder side: **the first move is not to add a test, it is to delete dead code.** In a process, dead code is the step nobody can explain and everybody avoids. It costs no time, breaks nothing, and only takes up space in the head of whoever meets it.

Then, and only then, I write. And when I write, I write the why.

## The difference that stays comfortable

Coming from product, you are used to measuring with one metric. The classic mistake is looking for a single one for operations, not finding it, and concluding the work is unmeasurable.

Not true. Operations does have measures, but they are almost always pairs: waiting time and working time. Efficiency, which is the first divided by the second. Neither half says anything on its own.

A delivery manager at 95% efficiency and a colleague at 40% can have the same cycle time, or different ones depending on how much work sits underneath. Look at only one of the two and you will make wrong decisions with complete confidence.

## What I bring from the builder side

Three things that made me useful in a department I did not know.

First, the diff: when something breaks, I ask "what changed?". It is the question that avoids half the arguments, because it puts a finger on the cause without accusing anyone.

Second, the small reversible change. Facing a problem, the first move is not the transformation plan: it is the smallest thing I can change today and undo tomorrow if I am wrong. In processes this matters more than in software, because the cost of an irreversible change in an operations department is invisible to engineers and very visible to customers.

Third, patience for boredom. The real work of an operations manager is tidying things that do not look important for six months, and then ending up with a department that holds when everyone else's collapses. It is the least visible work there is, and the only kind you can actually see afterwards.
