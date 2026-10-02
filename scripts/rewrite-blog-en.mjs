/**
 * Writes the 8 English versions of the blog posts.
 * Run: bun scripts/rewrite-blog-en.mjs
 *
 * EN must not fall behind IT: next-intl has hreflang alternates on every post,
 * and the English audience is the one with the higher EPC. These are full
 * translations in the same voice, not machine summaries.
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "content", "blog", "en");
mkdirSync(DIR, { recursive: true });

const posts = [
  {
    slug: "diagnose-operational-chaos",
    date: "2026-07-17",
    title: "Where the lost time actually hides",
    description:
      "Waiting time does not come from a bottleneck. It comes from four causes, and people always look for them in the wrong order.",
    tags: ["Operations", "Process", "Diagnosis"],
    body: `No organisation I have joined had a productivity problem. They had a waiting problem. Those are different things, and confusing them costs you six months.

## The symptom I see in every audit

The team is not working little. They work a lot, arrive late, and the result does not depend on the hours they put in but on how many times the work stopped to wait.

When you ask "how long does it take?", the answer is always a number from memory, always lower than reality. Nobody tracks how long an item sits still moving between three colleagues before someone signs it.

The first job is not to improve anything. It is to measure.

## The four causes, in order

I have solved this in retail, in B2B e-commerce and in consulting. Waiting time almost always reduces to four causes, and they are always the same ones.

**1. Waiting on a person.** One approver for a process twenty people use. Approvals that bounce back with nobody having written why. Whoever decides is not in the same working hours as whoever works.

**2. Waiting on information.** The data exists, but it sits somewhere nobody looks. Two versions of the same file in circulation. Asking a person every time when you could ask the system.

**3. Waiting on a decision.** Whoever has to choose has no time to choose. The options were never narrowed to two. The decision criteria were never written down, so every decision is redone from scratch.

**4. Waiting on an outside answer.** Suppliers and customers with no expected response time. Requests that arrive without context and therefore bounce back. Nothing nudges when the deadline passes in silence.

## The trap in almost every company

The first board that fills up is "add a person".

It fixes nothing. It adds a handoff, and that handoff comes back as coordination cost. I have watched whole quarters go this way: the bottleneck moves two metres and total time does not drop.

The sequence that works is always the same: remove a step first, then move a decision further up the flow, and only then consider adding people.

## Where to start, concretely

Pick one process. Not the easiest one to measure: that is almost always the least problematic, so you will learn very little. Pick the one that makes you miss promises most often.

Write it in one sentence: when X happens, someone does Y, and the result is Z. If you cannot, the process is not defined, and that is already your first finding.

Then count only three things: how many times the work changes hands, how many tools touch it, how many approvals it must clear. If you find four or more handoffs on a process that should be simple, you have found the problem and you need nothing else for the first week.

## One rule that saves time

Measure the same processes again after a month. If waiting time has not dropped, the problem was not the process you changed: it was one of its neighbours.

That is the mistake I see most often. You optimise a process, declare victory, and total company time does not move. Because the bottleneck was elsewhere, and what you touched was simply where the pain was loudest.`,
  },
  {
    slug: "my-setup-as-head-of-operations",
    date: "2026-06-10",
    title: "My setup as Head of Operations",
    description:
      "What I keep open every working day and why. Not dashboards: seven numbers I look at every Monday.",
    tags: ["Operations", "KPI", "Method"],
    body: `People often ask what tools I work with. The interesting answer is not the list of tools: it is which seven numbers are in front of my eyes, and in what order I read them.

## Seven numbers, not a dashboard

A dashboard with thirty metrics is a dashboard you never look at. I have tried. It works for two weeks and then becomes wallpaper.

Mine are seven, and they answer three questions: are we late, are we inefficient, or are we simply stuck.

- **Deliveries on time**, as a share of the commitment made. Not of the sprint: of the commitment.
- **Cycle time**, median, from request to delivery. Median, not mean, because one enormous project drags the mean.
- **Change failure rate**, the share of deliveries that come back. Above fifteen percent, the flow is the problem, not the people.
- **Time to restore**, in hours. How long we take when something breaks.
- **Hours of waiting per person**, not hours worked. This is the metric that has changed the most decisions in my career.
- **Processes with a single approver.** A rising number is a risk nobody is watching.
- **Decisions open more than a week.** My favourite metric: if it rises, today you made one fewer decision. That happens more often than it looks.

## The order I read them in

Monday morning I look at two numbers only: deliveries on time and time to restore. Ten minutes.

If deliveries are fine and time to restore is climbing, nothing else interests me: that is the quarter. Every other number is noise next to that one.

Then I look at open decisions. It is the only number I look at daily, and it is not a KPI: it is a list. A number up by one means you made one fewer decision today.

## The three questions I ask every Monday

After the numbers, three questions, always in this order.

**What happened last week that was not planned?** Not "what went wrong": what happened. A supply problem, someone ill, a supplier. Almost everything that costs you a quarter is something unforeseen, and it is in no report.

**How many times did we wait for someone?** Not worked. Waited. If last week you spent more time waiting than working, your problem is not productivity.

**What would you do differently starting over?** I use that one to work out what I am tolerating out of habit.

## Why seven and not five

I have tried five, and ten. Five was too few: there was always a number that explained the anomaly, and I ended up asking someone for data every Monday.

Ten was too many: I started interpreting them in order of importance instead of order of urgency, and by the end of the month I no longer knew which of the two I had used to decide.

Seven is the number where I can hold all of it in my head and ask nobody anything. If it holds for four straight weeks without you ever needing to look up a number that is not there, you have found yours.

One honest note: these numbers work for a company that delivers something. If your output has no delivery date, you cannot measure cycle time, and the problem is upstream of you.`,
  },
  {
    slug: "how-to-hire-delivery-manager",
    date: "2026-05-28",
    title: "How to hire a Delivery Manager (without trusting the CV)",
    description:
      "The interview question that separates people who delivered from people who chaired meetings. With follow-ups, and how to read the answers.",
    tags: ["Hiring", "Delivery", "Operations"],
    body: `I have interviewed for delivery and operations roles for years, and I have hired them for three companies. The CV does one job: getting you to the interview. Everything else you learn in the room.

## The question that separates everything

Ask: **"describe a project that went wrong. What did you do?"**

Not "what happened". What did you do.

Someone who has delivered starts with something concrete: the client refused the date, or accepted it because they had no alternative. They describe the moment, and then what they did in the twenty-four hours after it.

Someone who has chaired meetings starts with a theory. "We did a root cause analysis." "We set up a crisis committee." Both sentences are compatible with having not been watching at the time.

## The three follow-ups

After the answer, three questions. If the interview ends there, you already have your information.

**"Who made the final call, and when?"** If the answer is "the team" or "we decided together", ask who sent the email with the date. A delivery manager who does not know who decided is not managing deliveries.

**"What did you trade away?"** The question almost nobody asks. Every time you saved a date you gave something up: margin, scope, another client. If the answer is "nothing", they have never managed a hard delivery, because it is not possible.

**"What number did you look at every week?"** If the answer is "the burndown" without you having to specify it, they are good. If they have to search for the word, they do not have their own measurement system.

## The signals worth more than the CV

**They can say no with a reason.** In an interview, "I can do it, it's a commitment" is a weak answer. "I can do it if you drop Monday" is a strong one. The best delivery manager I have worked with said no to half of what was asked, and that is the only reason I trusted him.

**They have a number that embarrasses them.** The best professional can tell you their worst result and why it happened. If the interview ends only with wins, either the work was easy or they were not there.

**They talk about their mistakes before you find them.** If they say "let me tell you about the mistake that cost me a client", you believe them. If they only admit it when you ask, they have already forgotten it.

## The final question, the one nobody asks

Close with this: **"on day one, what do you look at?"**

Answers that impressed me: "the previous project's documents, to see whether they were current". "the decision log, if one exists". "I ask the three people who hold the project memory whether it is still valid."

Answers that killed it: "the backlog". "the team, to see how they work". "the environment, so I'm operational".

The first person arrives looking for the why. The second arrives looking for the what. The why is what saves you the first month.

## A note on the Italian market

On this market I see a problem I did not see in London: people are almost always hired on cost, and the best-looking CV wins among equals. The result is that you pay the wrong person for two years before you notice.

One approach that has worked for me: two interviews, with two different people, and the same question to both. Answers that do not line up are the most informative signal I have ever collected. It does not necessarily mean there is a problem: it means the company does not know what this person does, and you would find that out eventually anyway.`,
  },
  {
    slug: "hidden-cost-tribal-knowledge",
    date: "2026-04-22",
    title: "The hidden cost of tribal knowledge",
    description:
      "When the only person who knows how it works leaves, the cost is not their salary. It is everybody else's time.",
    tags: ["Operations", "Knowledge", "Risk"],
    body: `I have watched companies lose customers for the wrong reason three times in my career. None of them was pricing, product or competition. Each was one person leaving.

## The mechanism

When the knowledge of a process lives in one person's head, you do not have a documentation problem. You have a process that depends on a person, and people leave.

You find out at the worst possible moment: a campaign, a client scaling up, or a seasonal peak. The person is not there, nobody knows why it worked that way, and the thing that worked for three years stops working.

Reconstructing it almost always takes far longer than writing it down would have.

## Why it does not happen

It is not lack of will. It is three concrete reasons.

**Tacit knowledge is easier to use than to write down.** For someone who has the process in their head, explaining it to a colleague costs time they do not have today. Writing it down costs time they do not have. The list of reasons it did not happen is full of people who never had two free hours in three months.

**There is never a good moment.** The right moment was three months ago. Today there is a campaign, tomorrow there is a client. So it does not happen.

**Nobody warns you.** The file was never written, so nobody notices it is missing. The only time you find out is when you need it.

## What actually works

I have tried three approaches. Only one held.

**The wrong format is the main cause.** I have watched documentation attempts fail because they asked people to "write the procedures manual". Nobody writes a procedures manual, not out of laziness: because a manual is an enormous job and it tells nobody what to do on Monday morning.

What worked was the opposite: **a sheet, one row per decision, not one page per process.** Column A: what we do. Column B: why. Column C: who decides. Column D: when we last changed it. Four columns, one row each.

Four columns, and column B is the one that matters. A process without a "why" is a process somebody will redo differently the moment that person is gone.

**Do not delegate the writing to someone who does not know the process.** The writer has always been someone who already knew. The real cost is not writing: it is explaining, and explaining needs protected time, not "if there's time".

**Let it happen as a side effect.** The opposite of what I expected worked: documentation grew when we started recording meetings and putting the decisions made inside them. Not because anyone became more disciplined, but because that was already the moment when we were talking.

## The metric I use

One thing only: how many decisions from the last six months cannot be found anywhere.

Not how many procedures are written: how many decisions are traceable. Once measured, the number is always higher than the company thought, and that finding is usually enough to decide to intervene.

The second metric is more uncomfortable: how many times in the last three months someone asked a person "how did we used to do this?". Those questions are the signatures of knowledge about to walk out.`,
  },
  {
    slug: "builder-mindset-operations-leaders",
    date: "2026-03-18",
    title: "The builder mindset, applied to operations",
    description:
      "Moving from product manager to operations manager is not a change of industry. It is a change in what you consider a bug.",
    tags: ["Operations", "Culture", "Builder"],
    body: `I moved from product management into operations without changing company. The hardest shift was not learning a new industry: it was working out what counts as a bug.

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

Third, patience for boredom. The real work of an operations manager is tidying things that do not look important for six months, and then ending up with a department that holds when everyone else's collapses. It is the least visible work there is, and the only kind you can actually see afterwards.`,
  },
  {
    slug: "ops-security-alignment",
    date: "2026-02-24",
    title: "Operations and security: when security becomes a cost for the team",
    description:
      "Rules that slow delivery do not get remembered, they get worked around. How to make controls something the team accepts.",
    tags: ["Operations", "Security", "Delivery"],
    body: `The most honest test I know of security applied to a delivery team is this: when a rule slows someone down, do they work around it or ask for help?

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

The safest system I have seen was also the least restrictive one. The least safe was full of controls, and its security depended on a single person who had not yet got tired of reporting violations.`,
  },
  {
    slug: "eight-weeks-head-of-ops-ai-startup",
    date: "2026-01-29",
    title: "Eight weeks at an AI startup, as Head of Ops",
    description:
      "Nine people, a product that did not exist, and an operations function to build from scratch. What I did and what I would do differently.",
    tags: ["Operations", "Startup", "Scale-up"],
    body: `I was Head of Operations for eight weeks at an AI startup going from eleven to forty people. I am writing down what I found, what I did, and what I would do differently.

Two reasons. First, the kind of startup I describe moves very fast and almost every operations function is born in worse conditions. Second, eight weeks is too small a sample to draw conclusions from, and saying so is part of the story.

## What I found

Nine people in the company, none in operations. In other words: the functions existed, but nobody was looking at them. Every operational decision went up to the founder and came back out as a decision.

The thing that struck me, and which I have found in every startup since: people were more capable than the organisation admitted. The work was there, and it was good. What was missing was the layer above.

The risk in a situation like that is not that things go badly. It is that they go well for as long as the right person is there, and nobody finds out in time.

## What I did in the first two weeks

**I wrote down who decided what.** One page, not a process. For each recurring decision: who makes it, within what time, and what happens if it never arrives. It came to twelve rows and removed half the escalations.

**I measured two numbers.** Cycle time from request to delivery, and time to restore when something broke. They had never measured either, so they had never improved either. The second was worse than they feared.

**I removed a meeting.** The weekly alignment, which had become the place where things already written got repeated. I replaced it with a written update. Nobody complained, and the time went back to whoever should have had it.

## The four weeks in the middle

These were the hard ones, because the organisation was changing faster than the process was.

Four things I learned, which I would expect anyone in this position to see.

**New people have no process to follow.** They arrive and work out what to do from whoever sits near them. In a startup growing by ten people a month, for some weeks you have more new people than procedures. That is normal and it needs managing; it is not a failure.

**The bottleneck moves every week.** I cleared the code review queue and two weeks later it had moved to the staging environments. You do not "solve the problem": you manage the current one, and accept that the next one will be different.

**Every decision you do not write down is a decision that will be made again.** That is the hidden cost of growth, and nobody sees it until it happens twice.

**The founder stops being the bottleneck only if you tell him.** The moment decisions route through him stops being normal and becomes the bottleneck. If nobody says it, the bottleneck stays and shows up as "we do not have time".

## What I would do differently

Three things, in order of impact.

**I would write the numbers down before I arrived.** I wasted two weeks measuring, and those two weeks were spent doing work I could have delegated. I could have asked three people for three data points and started with the baseline already done.

**I would have spoken to the non-founders first.** I spent my first week with the people who decide, which is the wrong half of the organisation. The people who knew where things jammed were the others.

**I would have written less.** I produced four process documents that nobody opened. What worked was the one-row-per-decision sheet. Four pages of procedure, zero readers. A table of twelve rows, two meetings saved a week.

## On the sample size

Eight weeks is not enough to judge an organisation, and it is certainly not enough to judge a person who in those weeks did work nobody had done before in that company.

What stays with me: in a department that does not exist, the first job is not to build processes. It is to stop the founder being the pass-through for every decision, and then to measure two numbers. The rest is execution, and anyone can execute, well or badly.

What cannot be delegated, and in those eight weeks made the difference, is saying the uncomfortable thing in the right meeting.`,
  },
  {
    slug: "saas-boilerplate-lessons",
    date: "2025-12-15",
    title: "Six lessons from shipping a SaaS product",
    description:
      "Not a commercial case study. The decisions I got right and the ones I got wrong, with the number that told me.",
    tags: ["Operations", "Product", "Delivery"],
    body: `I built a SaaS boilerplate and sold it. The interesting part is not the product: it is the six decisions I took, two of which were wrong, and the numbers that told me.

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

What I did learn is to notice the difference between things that work because I did them well and things that work because somebody asked for them twice. The second kind is worth more, almost always, and much easier to find: keep a log of the questions.`,
  },
];

for (const p of posts) {
  const fm = [
    "---",
    `title: "${p.title}"`,
    `date: "${p.date}"`,
    `locale: "en"`,
    `description: "${p.description.replace(/"/g, '\\"')}"`,
    `tags: [${p.tags.map((t) => `"${t}"`).join(", ")}]`,
    `author: "Riccardo Bozzato"`,
    "published: true",
    "---",
    "",
  ].join("\n");
  writeFileSync(join(DIR, `${p.slug}.md`), fm + p.body + "\n", "utf8");
}

console.log(`en: ${posts.length} articoli scritti`);
