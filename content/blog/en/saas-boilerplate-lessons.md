---
title: "5 Operations Lessons from Building and Shipping a Product"
date: "2026-06-28"
locale: "en"
description: "What building Trova (a SaaS boilerplate) taught me about delivery, scope, and why the last 10% takes 50% of the time."
tags: ["Delivery", "Product", "Lessons", "Scoping"]
author: "Riccardo Bozzato"
published: true
---

I've built the same auth system five times. Magic links, OAuth, 2FA, session management — every time a new project, every time from scratch. The fifth time, I stopped and asked: why isn't there a production-ready boilerplate that just works?

So I built Trova. It's a Next.js 16 SaaS boilerplate with Better Auth, Drizzle ORM, Resend, Stripe billing, i18n, and shadcn/ui. But this isn't a post about the product — it's about what building it taught me about delivery, scope, and operations.

**1. The last 10% takes 50% of the time.** Every time. The auth system worked on day 3. The edge cases (session rotation, provider unlinking, race conditions) took two more weeks. I've seen this pattern in every project I've managed, from e-commerce platforms to enterprise integrations. The 90% milestone is a mirage. Plan for it.

**2. Scope is a negotiation, not a specification.** I started with a clear feature list. Halfway through, I found myself building a demo generator, a license key system, and a changelog page. None of these were in the original plan. Every feature had a reasonable justification. The aggregate cost was two extra months. Saying "no" to a good feature is harder than saying "no" to a bad one — and more important.

**3. Tools are multipliers, not solutions.** I chose each tool carefully: Better Auth for auth, Resend for email, Stripe for billing. Each saved me weeks. But the integration cost between them — data synchronization, error handling, idempotency — was higher than any individual tool's overhead. This is exactly the pattern I see in operations: buying best-in-class tools for each function, then suffering the integration tax. The toolchain is only as strong as its weakest interface.

**4. Documentation is delivery.** I wrote comprehensive setup guides, API references, and migration documents. Not because users asked for them, but because good documentation is the difference between a product that ships and one that sits on a shelf. In operations, the same applies: a well-documented process is one that can be executed, audited, and improved. An undocumented process is tribal knowledge with a single point of failure.

**5. You can't optimize what you don't measure.** I tracked every build time, every deploy cycle, every customer issue. The data showed patterns I wouldn't have noticed otherwise — like the fact that Stripe webhook failures clustered around Monday mornings (a caching issue with the idempotency layer). In operations, this is the whole game. If you don't have metrics, you're navigating by anecdote.

Building Trova took four months longer than I expected. But the operational lessons I learned from that process have saved me years of mistakes in every project since.
