---
title: "Six lessons from shipping a SaaS product"
date: "2025-12-15"
locale: "en"
description: "Not a commercial case study. The decisions I got right and the ones I got wrong, with the number that told me."
tags: ["Operations", "Product", "Delivery"]
author: "Riccardo Bozzato"
published: true
---
I built a SaaS boilerplate and sold it. The interesting part is not the product: it is the six decisions I took, two of which were wrong, and the numbers that told me.

## Lesson 1 — the ideal scope goes in a document, not in your head

I spent four months on a project that could do thirty things. It did six. The part that saved me was trivial: in week three I wrote down the list of things the product would never do.

It was not a document for other people. It was a document for me, because the me of month four no longer remembered why each choice in month one had been made.

It is now the first thing I write on every project, before any code. Not because it is complete: because when, in month six, the good idea appears, I have something to hold it against.

## Lesson 2 — "quick" is not a requirement, it is an excuse

For six months I called "simple" everything I had not designed. Then a customer asked why something I had said was trivial took three weeks.

They were right. It was not trivial: it was undesigned, and "trivial" was how I had found not to design it yet.

The practical consequence: the time you lose calling an undesigned thing trivial is lost twice. Once building it, once rebuilding it.

## Lesson 3 — the first version of an integration is almost always useless

I built a complete payments integration: webhooks, idempotency, failed payment handling, reconciliation. Tested, documented, shipped.

The first customer used it in a way the code did not anticipate, and wrote to say it was easier for them to do by hand. They were right: at their volume, automation did not pay for itself.

That integration cost me five weeks on a use case the second customer repeated at ten times the volume. The lesson is not "do not build integrations": it is that the right integration is defined by the second customer, and the first customer is never big enough to need it.

What I do now: build the manual path first, and automate on the second occurrence of the same action. It costs some repeated effort up front and saves you from automating something that never recurs.

## Lesson 4 — documentation is a deliverable, not an extra

I shipped a product with documentation written for me. Four pages, written in three days, full of assumptions only I held.

Two customers asked me the same question in the same week. The same one. I rewrote that page and the questions stopped. Not because the documentation was badly written: because it was written in the order I built the product, not the order people use it.

The rule I keep: **when someone asks a question, the answer goes into the documentation before it goes into an email.** If you have only written it once, the second person to ask is a cost you already paid once.

## Lesson 5 — sell before the third feature

I held a "coming soon" price for six weeks. The reasoning was sound: if somebody buys it, the product is real.

Nobody bought. I kept building, fixing, refining, and the next six months did not change one person's demand. Price was not the problem. The problem was that I was asking someone to pay before giving them a reason, and that reason was a third feature that mattered to me.

That lesson cost me six months I would not spend that way again.

## Lesson 6 — support tells you what the product should do

I kept a log of every question customers asked. Not bugs: questions.

Six months of questions, twenty-three entries. Fifteen were the same question in different words. And seven pointed at things the product did not have, which nobody had explicitly requested.

The seven went into the product. The fifteen went into a page called "this is already how it works". The second is the one that produced most value, because it added nothing: it removed a question that arrived every week.

## What I did not learn

I did not learn to predict what would work. I did not figure that out and I do not think you can.

What I did learn is to notice the difference between things that work because I did them well and things that work because somebody asked for them twice. The second kind is worth more, almost always, and much easier to find: keep a log of the questions.
