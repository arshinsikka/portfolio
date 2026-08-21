import type { Project } from "./types";

/**
 * Canonical project records.
 *
 * `<` characters below were written as `&lt;` in the original JSX. As plain
 * strings React escapes them on output, so the rendered text is unchanged.
 */
export const projects: Project[] = [
  {
    slug: "lecture-ai",
    title: "Lecture AI",
    role: "Co-Founder",
    dates: "Jul 2025 – Mar 2026",
    tier: "featured",
    group: "ventures",
    accolades: [
      { text: "BLOCK71-backed" },
      { text: "VIP@SoC Finalist" },
    ],
    summary:
      "We surveyed 500 students, found a gap nobody was serving, built for it, and then discovered we'd picked the wrong customer entirely.",
    body: [],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          {
            text: "Lecture AI turned recorded lectures into structured study notes, in two languages, for under a dollar a lecture. I co-founded it in July 2025. We shipped a working product, got into an incubation programme, reached the finals of a university venture competition, and stopped in March 2026 without meaningful adoption.",
          },
          {
            text: "It started with a survey rather than an idea, which I still think was the right way round. My co-founder ran it: 500 students, and two numbers came back that mattered. Most of them rewatched recorded lectures because they'd missed something the first time. And a couple of hundred wanted study material in Mandarin, which essentially didn't exist.",
          },
          {
            text: "The second number was the interesting one. Everyone building in this space was serving students who study in English. Nobody was serving students who follow the lecture fine but revise in a different language.",
          },
        ],
      },
      {
        heading: "Who did what",
        paragraphs: [
          {
            text: "I designed and built the whole technical pipeline, and I did the market research and go-to-market work. My co-founder ran the student survey and handled conversations with potential customers, including the university's teaching technology team.",
          },
        ],
      },
      {
        heading: "The problem with the obvious build",
        paragraphs: [
          {
            text: "Record, transcribe, summarise, ship. That's the obvious version, and for technical subjects it produces something worse than nothing.",
          },
          {
            text: "Speech recognition handles ordinary conversation well and mangles technical vocabulary. A specific tool name comes out as two unrelated English words. A standard term in machine learning comes back as something unrecognisable. That would be a minor annoyance if the transcript were the product, but it isn't. The transcript feeds the summariser, and a summariser handed a corrupted transcript will confidently produce a clean, well-organised summary of the wrong thing.",
          },
          {
            text: "That's the actual problem, and it took me a while to see it clearly. It isn't that transcription is imperfect. It's that every later stage inherits the earlier mistakes and hides them, so the output looks more trustworthy the further it gets from the error.",
          },
        ],
      },
      {
        heading: "The decisions I'd defend",
        paragraphs: [
          {
            text: "Two passes instead of one. I split the language model work into a correction step and a summarisation step, and ran them separately. The correction step gets the raw transcript along with the lecturer's own slides, so the model has something authoritative to check the terminology against, and fixes the transcript before anything else touches it. Only then does the summarising happen.",
          },
          {
            text: "Doing both at once is cheaper and simpler and it's what most tools do. It also means the model is guessing at what was said and deciding what mattered in the same breath, with no way to signal which parts it guessed at. Separating them is the single thing that made the output usable.",
          },
          {
            text: "No search index. The correction step needs the slides as a reference, which is exactly the problem that search infrastructure exists to solve, and I didn't build any. At the scale we were running, a lecture's slides fit comfortably into what the model can read at once. Adding a search layer would have meant an indexing step, a storage layer, and a week of work, for no accuracy gain against a set of documents small enough to just hand over. I'd revisit that at thousands of lectures. At ours, it saved weeks.",
          },
          {
            text: "Technical terms stay in English inside the Chinese notes. Translating a term like backpropagation into Mandarin produces something technically correct and practically useless, because the student then can't match it to the English textbook, the English slides, or the English exam. So the notes aren't a translation. The explanation is in one language and the vocabulary stays in the other. That came out of the survey, not out of me thinking about it.",
          },
          {
            text: "Organised by topic, not in order. The natural structure is the order the lecture happened in, because that's the order the audio arrives. Students don't revise that way. They jump to the thing they don't understand. Restructuring by concept meant the notes stopped mirroring the recording and started mirroring how they'd actually be used.",
          },
          {
            text: "Deadlines pulled out separately. Students kept describing the same failure: an assignment deadline mentioned once, forty minutes into a lecture, missed entirely. So announcements and dates got their own section instead of sitting in the summary where they'd be technically present and functionally invisible.",
          },
        ],
      },
      {
        heading: "What we got wrong",
        paragraphs: [
          {
            text: "We built it for students, and that was the mistake.",
          },
          {
            text: "Students don't control access to lecture recordings. The university and the lecturer do. So every single user had to get hold of their own recording before our product could do anything at all, which meant the very first step depended on something outside both our control and theirs. On top of that, signing up students one at a time is a distribution problem with no leverage. Five hundred users means five hundred separate conversations.",
          },
          {
            text: "Switching the customer to lecturers fixed both at once. A lecturer already has the recording, and one lecturer produces notes for an entire cohort, so a single conversion serves a hundred students instead of one.",
          },
          {
            text: "The part I didn't see coming is that it also fixed a trust problem we hadn't properly named. Notes generated by AI and handed straight to students are unverified material in a setting where being wrong has consequences. The same notes reviewed and released by the lecturer have a person in the loop who is already the authority on the subject. One decision changed how we reached people and whether they should believe us.",
          },
        ],
      },
      {
        heading: "Where it landed",
        paragraphs: [
          {
            text: "We shipped it. We got into an incubation programme and reached a competition final. Cost stayed under a dollar per lecture.",
          },
          {
            text: "We never got meaningful adoption, and we stopped in March 2026.",
          },
          {
            text: "I'd rather write that plainly than dress it up, because the outcome isn't the useful part of this. The useful part is that a survey of five hundred people gave us a real insight, and then actual usage overturned the business we'd built on top of it, and we changed instead of defending it. Building the thing was the easy half.",
          },
        ],
      },
    ],
    tags: ["Python", "FastAPI", "Whisper", "Gemini", "RAG", "NLP"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/arshinsikka/lectureai-mvp",
        kind: "github",
      },
      { label: "Website", url: "https://lectureai.co", kind: "website" },
    ],
    hasDetailPage: true,
  },
  {
    slug: "sara-guardrails",
    title: "SARA — Guardrails for a Production LLM Assistant",
    role: "Data Science Intern, SP Digital",
    dates: "Jan 2026 – Jun 2026",
    tier: "featured",
    group: "production",
    summary:
      "Before this I'd built AI apps that worked. This was the first one where someone was paid to break it, and it changed what I think the job is.",
    body: [],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          {
            text: "SARA is an internal assistant at a Singapore utility. Two groups use it: fieldworkers doing physical work on the grid, and operations admins handling the paperwork behind energising and de-energising equipment. Same assistant, different permissions, and one group can see things the other shouldn't.",
          },
          {
            text: "I spent six months there, almost all of it on the guardrails layer. That's the part deciding what the system will answer, what it won't, and how you know either way.",
          },
        ],
      },
      {
        heading: "What made this different",
        paragraphs: [
          {
            text: "Everything I'd built before belonged to me. Lecture AI, coursework, side projects. If someone found a weird edge case they'd shrug and move on. If the model said something strange, that was a bug for next week.",
          },
          {
            text: "Here the users are working on live electrical infrastructure, and the company pays an external team to attack the system on purpose.",
          },
          {
            text: "That reframed the whole thing for me. I'd been treating AI applications as pipelines. Input, model, output, make the output good. What I hadn't understood is that in an enterprise the pipeline is maybe a third of the work. The rest is governance: what this system is allowed to say, to whom, how you demonstrate that, and how you know it's still true after the next change. I'd assumed that part was paperwork someone else did. It isn't. It's the actual engineering, and it's the difference between something that demos well and something you can put in front of a hundred people who have real jobs.",
          },
        ],
      },
      {
        heading: "What I actually built",
        paragraphs: [
          {
            text: "Input controls that decide whether a request should be answered at all. Output controls that catch what shouldn't leave. A local safety classifier layered in alongside the model's own refusals. An adversarial evaluation pipeline to test all of it. And I closed the findings from a third-party penetration test, which is the only assessment of this work I didn't write myself.",
          },
        ],
      },
      {
        heading: "The decision I keep coming back to",
        paragraphs: [
          {
            text: "Topic restriction started as keyword matching. It blocked things, so at a glance it worked. What it actually did was block the wrong things. A fieldworker asking a reasonable operational question that happened to contain a flagged word got refused. Anyone who phrased a request around the keyword list got straight through.",
          },
          {
            text: "The problem is structural. Keyword matching can't tell asking about a system from asking a system to do something. Those are often the same words.",
          },
          {
            text: "So I replaced it with classification that reads what the request is for. That costs something real: it's slower than a string comparison, it's non-deterministic, and it puts a model call in front of every request. I took the trade because of which failure worried me more. A leak is loud. Someone notices, it gets escalated, it gets fixed. A fieldworker who asks two reasonable questions, gets refused twice, and quietly stops opening the tool is a failure nobody ever files. That one shows up months later as an adoption number nobody can explain.",
          },
        ],
      },
      {
        heading: "Measuring it",
        paragraphs: [
          {
            text: "I spent my first stretch making guardrails better without being able to tell you whether they were better. I'd try a bypass, watch it get blocked, and feel good. That's an anecdote.",
          },
          {
            text: "So I built an adversarial evaluation pipeline in Langfuse: over 400 prompts across several regression sets, covering injection attempts, persona-bypass jailbreaks, and probes trying to get the system to describe its own configuration. Unsafe responses dropped roughly 60% across internal deployments. I only know that number because there was something to measure against.",
          },
          {
            text: "If I could tell myself one thing at the start, it would be to build the evaluation first. It feels like a detour when you want to be fixing things. It's what makes every later change legible.",
          },
        ],
      },
      {
        heading: "What I got wrong",
        paragraphs: [
          {
            text: "I calibrated toward strict, because strict felt safe. Every guardrail I tightened felt like progress and had no cost I could see.",
          },
          {
            text: "The cost was false positives, and they're invisible by nature. A blocked legitimate question doesn't raise an error or a ticket. It just makes someone decide the tool isn't worth the trouble.",
          },
          {
            text: "What fixed it was writing a set of probes for questions a real fieldworker would genuinely ask, then treating a block on one of those as a defect worth the same as a successful attack. Once both failure modes had numbers, the tradeoff stopped being a feeling and became something I could look at.",
          },
          {
            text: "I don't think I'd have got there from first principles. It came from watching what the keyword filter had actually been doing to people.",
          },
        ],
      },
      {
        heading: "Where it landed",
        paragraphs: [
          {
            text: "Roughly 60% fewer unsafe responses, measured against a fixed suite rather than my own judgement. Penetration test findings closed. A topic restriction that reads intent rather than vocabulary, which cut refusals of legitimate questions substantially.",
          },
          {
            text: "The number isn't the part I'd talk about in an interview. I went in thinking my job was to make a model behave. I came out thinking the job is making a system's behaviour provable. Everything I've built since starts with how I'm going to test it.",
          },
        ],
      },
    ],
    tags: ["LLM Safety", "Guardrails", "Evaluation", "Langfuse", "LangGraph"],
    links: [],
    hasDetailPage: true,
  },
  {
    slug: "ofi-regime-tradability",
    title: "Does a Known Market Signal Survive the Cost of Trading It?",
    role: "Independent study",
    dates: "Aug 2026",
    tier: "featured",
    group: "research",
    summary:
      "I wrote down what I was going to do before I looked at any data. That's the only reason I caught the most interesting result I found being an illusion.",
    body: [],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          {
            text: "There's a well-known signal in financial markets: if there are more buy orders than sell orders sitting on an exchange right now, the price tends to tick up in the next few seconds. That it predicts is settled. Whether it predicts well enough to make money after you pay to trade on it is a different question, and I wanted to test it properly.",
          },
          {
            text: "I ran the study on ten days of order book data from one cryptocurrency market. The answer is no. The signal is real and it does not survive the cost of acting on it.",
          },
          {
            text: "That's a boring headline. The interesting part is what happened in the middle.",
          },
        ],
      },
      {
        heading: "Why this kind of work is easy to get wrong",
        paragraphs: [
          {
            text: "Financial data will hand you a profitable-looking result if you keep asking. Try enough time horizons, enough ways of slicing the market into conditions, enough assumptions about trading costs, and eventually something clears. Every choice you make after seeing the data is a chance to nudge the result in the direction you were hoping for, usually without noticing you're doing it.",
          },
          {
            text: "I find this genuinely difficult to guard against, because it doesn't feel like cheating. It feels like exploring.",
          },
          {
            text: "So the first thing I wrote wasn't code. It was the protocol: which time horizons I'd test, how I'd define market conditions, how I'd calculate trading costs, exactly what would count as the signal being tradable, and how I'd test whether any result was statistically real. I committed that document as the very first thing in the repository, before a single line of analysis existed, so every later piece of work sits underneath it in the history and anyone can check the order.",
          },
          {
            text: "The part that actually matters: I wrote down all four possible outcomes in advance and declared each of them valid, including \"there's no effect here\" and \"there isn't enough data to tell.\" Committing to a method only works if you've committed to publishing whatever it produces.",
          },
        ],
      },
      {
        heading: "Decisions I'd defend",
        paragraphs: [
          {
            text: "Rebuilding the data, then checking it against myself. The exchange doesn't publish the state of the order book. It publishes one snapshot and then a continuous stream of changes, so the actual state at any moment has to be rebuilt by replaying every update in order. One misapplied update silently corrupts everything after it, and there's no correct answer sitting anywhere to compare against. So I wrote a second, independent version of the rebuild and checked the two against each other at sampled points. Reimplementing something you've already built feels like wasted effort right up until it disagrees with itself.",
          },
          {
            text: "Reading the final test data exactly once. The dataset was split into a portion for building, a portion for tuning, and a portion held back. That last portion was opened once, at the end, and every parameter applied to it was checked to be identical to values frozen before it was touched. Not \"I was careful about it.\" Verified.",
          },
          {
            text: "Assuming the worst about costs. I assumed I'd pay the full gap between buy and sell prices on both entry and exit, with no favourable treatment on order queues, and I ran the whole analysis across four different fee levels rather than picking one. Picking a single fee would have made the conclusion an artifact of that choice.",
          },
          {
            text: "Keeping the simpler model. I tested a more sophisticated version that uses more layers of the order book. It lost to the simple one at every horizon. The protocol said the simpler model stays unless the complex one beats it, so it stayed, and the fancier version is recorded as decorative.",
          },
        ],
      },
      {
        heading: "The result that wasn't real",
        paragraphs: [
          {
            text: "Partway through, I found what I'd set out to look for. In about a third of the tested cases, the signal's profitability appeared to diverge depending on market conditions. That's the whole thesis of the study, sitting right there.",
          },
          {
            text: "I went looking for the mechanism, expecting to explain something about how markets work. What I found was arithmetic.",
          },
          {
            text: "The measure I was ranking by is roughly the average profit minus the cost, divided by how volatile that period was. On this instrument the buy-sell gap is the smallest possible increment almost all of the time, so cost barely changes between conditions. And at real fees, that cost is between eighty and thirteen hundred times larger than the average profit. When you subtract a large near-constant number from a tiny one, the top of that fraction is nearly the same everywhere, and what you're left with is a ranking by volatility wearing the costume of a ranking by profitability.",
          },
          {
            text: "The giveaway is that the whole effect disappears at a hypothetical zero-fee level, where the cost term nearly vanishes.",
          },
          {
            text: "I recorded it as an artifact rather than a finding. It would have been the most impressive-looking thing in the study, and it would have been wrong.",
          },
        ],
      },
      {
        heading: "What I actually found",
        paragraphs: [
          {
            text: "The signal predicts. That part holds up cleanly, and the strength of it fades as you look further ahead, exactly as you'd expect.",
          },
          {
            text: "It isn't tradable. The largest profit the model predicts anywhere in the held-out data is smaller than the cheapest realistic cost of making the trade. The rule I'd committed to, which was to trade only when expected profit exceeds cost, never fired once at any real fee level. This isn't a near miss where a better model closes the gap. The two distributions don't overlap.",
          },
          {
            text: "The economic theory came out backwards. The standard model says this signal should work best in thin, jumpy markets. Measured, it works worst there, ranking last of four conditions at every horizon. Two separate parts of my analysis agreed on this independently, which is the only reason I trust it.",
          },
        ],
      },
      {
        heading: "What this doesn't prove",
        paragraphs: [
          {
            text: "Ten days, one asset, in a fairly quiet stretch of market. Nothing here says anything about stressed markets, other instruments, or other venues.",
          },
          {
            text: "The data is snapshots roughly ten times a second, not every individual event, so this is a medium-frequency study and I've drawn no high-frequency conclusions from it.",
          },
          {
            text: "The market conditions I defined turned out to flip every few seconds, which makes them a short-lived state rather than a regime in the economic sense my own framing implied. That gap between what I measured and what I said I was measuring is real and I haven't resolved it.",
          },
          {
            text: "I wrote all of that into the repository myself. A study that only lists what it proves is doing half the job, and the limitations section took longer to write than most of the analysis.",
          },
        ],
      },
      {
        heading: "Where it landed",
        paragraphs: [
          {
            text: "A negative result, a contradicted hypothesis, and a striking finding I had to throw away. None of that is what I hoped for when I started.",
          },
          {
            text: "What I'd point at is the order of operations. The protocol existed before the data did, which meant when the exciting result showed up I had no room to talk myself into it. I don't think I'd have caught it otherwise. It looked exactly like what I wanted to see.",
          },
        ],
      },
    ],
    tags: ["Market Microstructure", "Pre-registration", "Statistics", "Python"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/arshinsikka/ofi-regime-tradability",
        kind: "github",
      },
    ],
    hasDetailPage: true,
  },
  {
    slug: "ai-architecture-strategy-engine",
    title: "AI Architecture Strategy Engine",
    role: "Developer",
    dates: "Mar 2026",
    tier: "standard",
    group: "production",
    summary:
      "Multi-agent system that helps teams choose between AI architectures (prompting, RAG, fine-tuning) under real constraints like budget, latency, and quality. Implements structured decision frameworks for AI product teams.",
    body: [],
    tags: ["Python", "Multi-Agent", "LLMs", "System Design"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/arshinsikka/ai-architecture-strategy-engine",
        kind: "github",
      },
    ],
    hasDetailPage: false,
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const standardProjects = projects.filter((p) => p.tier === "standard");

/**
 * The project index, in group order. A group with no records is dropped here
 * rather than filtered in the component, so "an empty group renders nothing at
 * all" is a property of the content model rather than of one page. Heading
 * copy lives in `sectionCopy.projects.groups`, with every other heading.
 */
export const projectGroups = (["production", "research", "ventures"] as const)
  .map((group) => ({ group, projects: projects.filter((p) => p.group === group) }))
  .filter((g) => g.projects.length > 0);

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
