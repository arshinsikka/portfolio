import type { Project } from "./types";

/**
 * Canonical project records.
 *
 * `<` characters below were written as `&lt;` in the original JSX. As plain
 * strings React escapes them on output, so the rendered text is unchanged.
 */
export const projects: Project[] = [
  {
    slug: "garuda-refusal-layer",
    title: "The Refusal Layer — When AI Controls Hardware",
    role: "AI Engineer Intern, Garuda Robotics",
    dates: "Jul 2026 – Present",
    tier: "featured",
    group: "production",
    summary:
      "You can delete a bad answer. You can't un-fly a drone. That changes where the checks go.",
    body: [],
    sections: [
      {
        heading: "The constraint",
        paragraphs: [
          {
            text: "Before this, everything I built could be undone. A bad answer gets deleted. A bad write gets rolled back. So you design for catching mistakes after they happen.",
          },
          {
            text: "Now I'm building a tool for drone pilots. They ask for a flight in plain English. The system either runs it or refuses.",
          },
          {
            text: "Catching mistakes afterwards doesn't help here. By the time you notice, the drone is already flying. You have to stop it before it starts.",
          },
        ],
      },
      {
        heading: "Why asking the model nicely isn't enough",
        paragraphs: [
          {
            text: "The easy approach is to tell the model what it can't do. Models are good at saying no. They get it right most of the time.",
          },
          {
            text: "Most of the time is fine if the mistake is a bad paragraph. It isn't fine if the mistake is in the air.",
          },
          {
            text: "So the model doesn't get to make that call. Something else does. And what the pilot sees has to come from that check, not from the model's summary of it.",
          },
        ],
      },
      {
        heading: "Where the check goes",
        paragraphs: [
          {
            text: "Not on the pilot's laptop. Anyone can edit an app on their own machine. A limit you can delete isn't a limit.",
          },
          {
            text: "Not at the login layer either. That part knows who's asking. It doesn't see the numbers in the request. And the approval limit is all about numbers. Is this location inside the area you're cleared for? You need to see the coordinates to answer that.",
          },
          {
            text: "That leaves one place. The first point that sees the real numbers and sits outside the pilot's control.",
          },
          {
            text: "There's nothing clever about the answer. The work was ruling out everywhere else.",
          },
        ],
      },
      {
        heading: "A failure I didn't expect",
        paragraphs: [
          {
            text: "I was testing with an old chat still open. I asked something I'd asked earlier. The model answered from its own history instead of running the check.",
          },
          {
            text: "The answer was right. Correct limits, correct conclusion, stated with confidence. Nothing had actually been checked.",
          },
          {
            text: "The only clue was what wasn't there. No check appeared on screen. Missing things are easy to miss.",
          },
          {
            text: "That changed how I think about the interface. It isn't just showing the result. An answer that came from a real check has to look different from one that didn't. That's part of the safety system, not decoration.",
          },
        ],
      },
    ],
    tags: ["Agentic AI", "LLM Safety", "Systems Design", "Drones"],
    links: [],
    hasDetailPage: true,
  },
  {
    slug: "sara-guardrails",
    title: "SARA — Guardrails for a Production LLM Assistant",
    role: "Data Science Intern, SP Digital",
    dates: "Jan 2026 – Jun 2026",
    tier: "standard",
    group: "production",
    summary:
      "My first system where someone was paid to break it. That changed how I build.",
    body: [],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          {
            text: "SARA is an internal assistant at a Singapore utility. Two groups use it: fieldworkers doing physical work on the grid, and operations admins handling the paperwork behind energising and de-energising equipment. Same assistant, different permissions, and one group can see things the other shouldn't.",
          },
          {
            text: "I spent six months there, almost all of it on the guardrails layer. That's the part deciding what the system answers, what it declines, and how you know either way.",
          },
        ],
      },
      {
        heading: "What made this different",
        paragraphs: [
          {
            text: "Everything I'd built before belonged to me. If a user hit an edge case they'd shrug and move on.",
          },
          {
            text: "Here the users are working on live electrical infrastructure, and the company pays an external team to attack the system on purpose. That shifts where the work is. I'd been treating AI applications as pipelines: input, model, output, make the output good. In an enterprise the pipeline is maybe a third of it. The rest is governance, meaning what the system is allowed to say, to whom, how you demonstrate that, and how you know it's still true after the next change.",
          },
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          {
            text: "Input controls that decide whether a request should be answered at all. Output controls that catch what shouldn't leave. A local safety classifier layered alongside the model's own refusals. An adversarial evaluation pipeline to test all of it. I also closed the findings from a third-party penetration test, which is the only assessment of this work I didn't write myself.",
          },
        ],
      },
      {
        heading: "The decision I'd defend",
        paragraphs: [
          {
            text: "Topic restriction started as keyword matching. It blocked things, so at a glance it worked. What it actually did was block the wrong things. A fieldworker asking a reasonable operational question that happened to contain a flagged word got refused, while anyone who phrased a request around the keyword list got through.",
          },
          {
            text: "The problem is structural. Keyword matching can't tell asking about a system from asking a system to do something. Those are often the same words.",
          },
          {
            text: "So I replaced it with classification that reads what the request is for. It's slower than a string comparison, it's non-deterministic, and it puts a model call in front of every request. I took that trade because of which failure worried me more. A leak gets noticed and escalated. A fieldworker who gets refused twice and stops opening the tool is a failure nobody files.",
          },
        ],
      },
      {
        heading: "Measuring it",
        paragraphs: [
          {
            text: "I spent my first stretch making guardrails better without being able to say whether they were better. I'd try a bypass, watch it get blocked, and move on. That's an anecdote.",
          },
          {
            text: "So I built an adversarial evaluation pipeline in Langfuse: over 400 prompts across several regression sets, covering injection attempts, persona-bypass jailbreaks, and probes trying to get the system to describe its own configuration. Unsafe responses dropped roughly 60%. I only know that because there was something to measure against.",
          },
          {
            text: "If I were starting again I'd build the evaluation first. It feels like a detour when you want to be fixing things, and it's what makes every later change legible.",
          },
        ],
      },
      {
        heading: "What I got wrong",
        paragraphs: [
          {
            text: "I calibrated toward strict, because strict felt safe. Tightening a guardrail felt like progress and had no cost I could see.",
          },
          {
            text: "The cost was false positives, and those are invisible. A blocked legitimate question doesn't raise an error or a ticket. It just makes someone decide the tool isn't worth the trouble.",
          },
          {
            text: "The fix was writing a set of probes for questions a real fieldworker would ask, then treating a block on one of those as a defect worth the same as a successful attack. Once both failure modes had numbers, the tradeoff was something I could look at rather than a feeling.",
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
            text: "I went in thinking the job was making a model behave. I came out thinking it's making the model's behaviour provable. Everything I've built since starts with how I'm going to test it.",
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
      "I wrote down the method before I looked at any data. Halfway through I found what I was testing for, then worked out the maths was producing it, not the market.",
    body: [],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          {
            text: "There's a known signal in financial markets. If there are more buy orders than sell orders sitting on an exchange right now, the price tends to tick up over the next few seconds. That much is settled. Whether it predicts well enough to make money after you pay to trade on it is a different question.",
          },
          {
            text: "I tested it on ten days of order book data from one cryptocurrency market. The answer is no. The signal is real and it doesn't survive the cost of acting on it.",
          },
        ],
      },
      {
        heading: "Writing the method down first",
        paragraphs: [
          {
            text: "Financial data will hand you a profitable-looking result if you keep asking. Try enough time horizons, enough ways of slicing the market, enough cost assumptions, and something eventually clears. Every choice you make after seeing the data is a chance to nudge the result toward what you were hoping for.",
          },
          {
            text: "So the first thing I wrote wasn't code. It was the protocol: which horizons I'd test, how I'd define market conditions, how I'd calculate costs, what would count as the signal being tradable, and how I'd test whether any result was real. I committed that as the first thing in the repository, before any analysis existed, so the order is checkable.",
          },
          {
            text: 'I also wrote down all four possible outcomes in advance and said each was valid, including "no effect" and "not enough data to tell". Committing to a method only counts if you\'ve committed to publishing whatever it produces.',
          },
        ],
      },
      {
        heading: "Decisions I'd defend",
        paragraphs: [
          {
            text: "Rebuilding the data and checking it against myself. The exchange doesn't publish the state of the order book. It publishes one snapshot and then a stream of changes, so you have to rebuild the state by replaying every update in order. One misapplied update quietly corrupts everything after it, and there's no correct answer anywhere to compare against. So I wrote a second, independent version of the rebuild and checked the two against each other at sampled points.",
          },
          {
            text: "Reading the final test data once. The dataset was split into a portion for building, a portion for tuning, and a portion held back. The held-back portion was opened once, at the end, and every parameter applied to it was checked to be identical to values frozen beforehand.",
          },
          {
            text: "Assuming the worst about costs. I assumed I'd pay the full gap between buy and sell prices on both entry and exit, with no favourable treatment on order queues, and ran the whole analysis across four fee levels rather than picking one.",
          },
          {
            text: "Keeping the simpler model. I tested a more sophisticated version using more layers of the order book. It lost to the simple one at every horizon, so it stayed out.",
          },
        ],
      },
      {
        heading: "The result that wasn't real",
        paragraphs: [
          {
            text: "Partway through, I found what I'd set out to look for. In about a third of the tested cases, the signal's profitability appeared to differ depending on market conditions. That was the whole point of the study, sitting right there.",
          },
          {
            text: "Then I looked at why. The measure I was ranking by is average profit minus cost, divided by volatility. At real fees the cost is far larger than the profit, and the cost barely moves between conditions. So the top of that fraction was roughly the same number everywhere, and I was really just ranking conditions by how volatile they were. Nothing to do with profitability at all.",
          },
          {
            text: "The giveaway is that the effect disappears at a hypothetical zero-fee level, where the cost term nearly vanishes.",
          },
          {
            text: "I wrote it up as an artifact rather than a finding. It would have been the most impressive-looking thing in the study.",
          },
        ],
      },
      {
        heading: "What I actually found",
        paragraphs: [
          {
            text: "The signal predicts. That part holds up, and it fades as you look further ahead, which is what you'd expect.",
          },
          {
            text: "It isn't tradable. The largest profit the model predicts anywhere in the held-out data is smaller than the cheapest realistic cost of making the trade. The rule I'd committed to, trade only when expected profit exceeds cost, never fired once at any real fee level. That isn't a near miss where a better model closes the gap.",
          },
          {
            text: "The economic theory also came out backwards. The standard model says this signal should work best in thin, jumpy markets. Measured, it works worst there. Two separate parts of the analysis found that independently, which is why I believe it.",
          },
        ],
      },
      {
        heading: "What this doesn't prove",
        paragraphs: [
          {
            text: "Ten days, one asset, in a fairly quiet stretch of market. Nothing here says anything about stressed markets or other instruments.",
          },
          {
            text: "The data is snapshots roughly ten times a second rather than every individual event, so this is a medium-frequency study and I've drawn no high-frequency conclusions from it.",
          },
          {
            text: "The market conditions I defined turned out to flip every few seconds, which makes them a short-lived state rather than a regime in the sense my own framing implied. That gap is real and I haven't resolved it.",
          },
        ],
      },
      {
        heading: "Where it landed",
        paragraphs: [
          {
            text: "A negative result, a contradicted hypothesis, and an interesting finding I had to throw away. None of that is what I hoped for.",
          },
          {
            text: "The useful part is the order I did things in. The method existed before the data, so when the exciting result showed up I had no room to talk myself into it. I don't think I'd have caught it otherwise.",
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
    slug: "lecture-ai",
    title: "Lecture AI",
    role: "Co-Founder",
    dates: "Jul 2025 – Mar 2026",
    tier: "featured",
    group: "ventures",
    accolades: [{ text: "BLOCK71-backed" }, { text: "VIP@SoC Finalist" }],
    summary:
      "We surveyed 500 students, found a gap nobody was serving, and built it. What stopped us had nothing to do with the product.",
    body: [],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          {
            text: "Lecture AI turned recorded lectures into structured study notes, in two languages, for under a dollar a lecture. I co-founded it in July 2025. We shipped it, got into an incubation programme, reached the finals of a university venture competition, and stopped in March 2026.",
          },
          {
            text: "It started with a survey rather than an idea. My co-founder ran it: 500 students, two numbers that mattered. Most rewatched recordings because they'd missed something. And a couple of hundred wanted study material in Mandarin, which basically didn't exist.",
          },
          {
            text: "The second number was the interesting one. Everyone building here was serving students who study in English. Nobody was serving students who follow the lecture fine but revise in a different language.",
          },
        ],
      },
      {
        heading: "Who did what",
        paragraphs: [
          {
            text: "I designed and built the whole technical pipeline, and did the market research and go-to-market work. My co-founder ran the student survey and handled conversations with potential customers, including the university's teaching technology team.",
          },
        ],
      },
      {
        heading: "Why the obvious build doesn't work",
        paragraphs: [
          {
            text: "Record, transcribe, summarise, ship. That's the obvious version, and for technical subjects it produces something worse than nothing.",
          },
          {
            text: "Speech recognition handles ordinary conversation well and mangles technical vocabulary. A tool name comes out as two unrelated English words. That would be a minor annoyance if the transcript were the product. It isn't. The transcript feeds the summariser, and a summariser given a corrupted transcript produces a clean, well-organised summary of the wrong thing.",
          },
          {
            text: "So the real problem isn't that transcription is imperfect. It's that every later stage inherits the earlier mistakes and hides them.",
          },
        ],
      },
      {
        heading: "Decisions I'd defend",
        paragraphs: [
          {
            text: "Two passes instead of one. I split the model work into a correction step and a summarising step. The correction step gets the raw transcript plus the lecturer's own slides, so it has something authoritative to check terminology against. Only then does the summarising happen.",
          },
          {
            text: "Doing both at once is cheaper and it's what most tools do. It also means the model is guessing at what was said and deciding what mattered in the same breath, with no way to flag which parts it guessed. Separating them is what made the output usable.",
          },
          {
            text: "No search index. The correction step needs the slides as a reference, which is exactly what search infrastructure exists for, and I didn't build any. A lecture's slides fit into what the model can read at once. Adding a search layer would have meant an indexing step, a storage layer, and a week of work, for no accuracy gain on a set of documents small enough to just hand over.",
          },
          {
            text: "Technical terms stay in English inside the Chinese notes. Translating a term like backpropagation into Mandarin gives you something technically correct and useless, because the student can't then match it to the English textbook, slides, or exam. So the notes aren't a translation. The explanation is in one language and the vocabulary stays in the other. That came out of the survey, not out of me thinking about it.",
          },
          {
            text: "Organised by topic, not in order. The natural structure is the order the lecture happened in, because that's the order the audio arrives. Students don't revise that way. They jump to the thing they don't understand.",
          },
          {
            text: "Deadlines pulled out separately. Students kept describing the same failure: an assignment deadline mentioned once, forty minutes in, missed entirely. So dates got their own section instead of sitting in the summary where they'd be technically present and functionally invisible.",
          },
        ],
      },
      {
        heading: "What we got wrong",
        paragraphs: [
          {
            text: "We built it for students first. That was the wrong call, though it isn't what stopped us.",
          },
          {
            text: "Students don't control access to lecture recordings. The university and the lecturer do. So every user had to get hold of their own recording before the product could do anything, which meant the first step depended on something outside our control and theirs. Signing up students one at a time is also a distribution problem with no leverage.",
          },
          {
            text: "Switching to lecturers fixed both. A lecturer already has the recording, and one lecturer produces notes for a whole cohort. It also fixed a trust problem we hadn't named, since notes released by the lecturer have someone in the loop who is already the authority on the subject.",
          },
          {
            text: "Then we hit the thing that ended it. A lecture recording has students' voices in it. In Singapore that makes it personal data, with rules about consent and who is allowed to hold it. Every conversation started running into some version of that. Nobody said no. They just didn't want to be the person who signed off on it, and I don't blame them.",
          },
          {
            text: "At that point we didn't have a technical problem. We had a product nobody could adopt without starting a legal conversation they had no reason to start.",
          },
        ],
      },
      {
        heading: "Where it landed",
        paragraphs: [
          {
            text: "We shipped it, got into an incubation programme, and reached a competition final. Cost stayed under a dollar per lecture. We never got meaningful adoption and we stopped in March 2026.",
          },
          {
            text: "What I took from it is that I'd spent almost all my thinking on whether we could build the thing and almost none on how it would reach anybody. Distribution isn't the part you work out once the product is good enough. Here it was the whole problem, and it was knowable before we wrote a line of code.",
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
  {
    slug: "socratic-digital-twin",
    title: "Socratic Digital Twin",
    role: "Developer",
    dates: "2026 – Present",
    tier: "standard",
    group: "production",
    summary:
      "An AI tutor for dental students that is built to refuse to answer. It's for orthodontic clinical reasoning, where being handed the answer defeats the point, so the system asks questions back instead. That constraint drives everything: a multi-stage pipeline that decides what to ask next, retrieval over the faculty's own teaching material rather than the open web, and a review step where a clinician signs off on content before a student ever sees it. Paid work for a university dental faculty, currently in development.",
    body: [],
    tags: ["LangGraph", "RAG", "Postgres", "Clinical AI"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "echolens-pii",
    title: "Echolens — PII Redaction Evaluation",
    role: "Data Science Intern, SP Digital",
    dates: "2026",
    tier: "standard",
    group: "production",
    summary:
      "Echolens is a product that strips personal information out of customer call transcripts. I built the evaluation pipeline that measures how well it does that. Most of the work wasn't the measurement, it was deciding what counts: a receipt number isn't personal information, a partial email address probably isn't either, and those rules have to be written down and applied consistently before any score means anything. I scored it in a way that treats missing something as worse than being over-cautious, because those two errors are not equally bad here.",
    body: [],
    tags: ["PII", "Evaluation", "NLP"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "llm-evaluation-framework",
    title: "LLM Evaluation Framework",
    role: "Personal project",
    dates: "2026",
    tier: "standard",
    group: "production",
    summary:
      "A tool for comparing language models on the same task and seeing what each one actually costs you in quality, money and speed. I ran it across three different kinds of work: summarising lectures, reasoning through business decisions, and ranking documents by relevance. The most useful thing it turned up was a measurement problem. The standard ways of scoring text similarity rate one model far worse than another purely because it wraps its answer in formatting, when both are ranking the documents equally well. For anything where the output has a structure, those metrics quietly mislead you, and you need one that measures the thing you actually care about.",
    body: [],
    tags: ["Evaluation", "Python", "Benchmarking"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/arshinsikka/llm-evaluation-framework",
        kind: "github",
      },
    ],
    hasDetailPage: false,
  },
  {
    slug: "markbind",
    title: "MarkBind — Open Source Contributions",
    role: "Contributor",
    dates: "2025",
    tier: "minor",
    group: "production",
    summary:
      "Contributions to MarkBind, an open-source documentation site generator maintained at NUS. I was selected for this on the strength of my performance in the software engineering course, and it was the first time I'd worked inside a codebase with an established review culture that I hadn't written any of.",
    body: [],
    tags: ["Open Source", "Java", "Documentation Tooling"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "singapore-society-simulation",
    title: "Singapore Society Simulation",
    role: "Researcher",
    dates: "2026",
    tier: "standard",
    group: "research",
    summary:
      "Can AI agents grounded in real demographic data predict how a population reasons about a policy question? I built a simulation where each agent holds a demographic profile and argues from it, then compared what the group concluded against what real people said in public discussion. They diverged, substantially, and the more interesting result was that changing the demographic mix of the agents shifted the collective conclusion by a large margin. That means results from this kind of simulation depend heavily on who you put in the room, which is a caution for anyone treating synthetic populations as a substitute for asking people.",
    body: [],
    tags: ["LLM Agents", "Social Simulation", "Research"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "fnb-trend-intelligence",
    title: "Trend Intelligence for Singapore F&B",
    role: "Co-founder",
    dates: "2026 – Present",
    tier: "standard",
    group: "ventures",
    summary:
      "We started building a trend tracker for people deciding where to eat, and stopped when it became clear that consumers won't pay for that and Google already owns food discovery. So we moved to the other side of the counter, where the pain is sharper and there's an actual budget: restaurant operators trying to work out what to put on a menu. The idea is still unproven and I'd rather say so than pretend otherwise. We're running customer interviews now, and one objection has already killed a business model we liked, which is that you can't sell a monthly subscription into an industry where most operators never turn a profit.",
    body: [],
    tags: ["Market Research", "F&B", "Product Discovery"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "knocks",
    title: "Knocks",
    role: "Solo build",
    dates: "2025",
    tier: "standard",
    group: "ventures",
    summary:
      "A card game my friends and I have played for years, which existed only as a physical deck, so it needed everyone in the same room. I built the online version. What I didn't expect was what happened afterwards: it spread by word of mouth to friends of friends I'd never met, and people kept playing it. Nothing about that was technically hard. It was the first time something I built reached people I hadn't told about it, and it's a very different feeling from a project that works on my laptop.",
    body: [],
    tags: ["Real-time", "Multiplayer", "WebSockets"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "sixer",
    title: "Sixer",
    role: "Solo build",
    dates: "2025",
    tier: "standard",
    group: "ventures",
    summary:
      "A cricket draft game we used to run over WhatsApp, badly. Group chats are a terrible place to hold a game with rules, because someone always has to arbitrate, someone always misses a turn, and the state of play lives in whoever scrolled back furthest. So I moved it into something that actually holds the rules and keeps everyone in sync. Same lesson as Knocks, in a different shape: the interesting problem wasn't the game, it was that the medium people were using couldn't do the job.",
    body: [],
    tags: ["Real-time", "Multiplayer", "WebSockets"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "trackup",
    title: "TrackUp",
    role: "Team project",
    dates: "2025",
    tier: "minor",
    group: "production",
    summary:
      "A desktop contact and event manager for founders and small business owners, built as a team software engineering project. The deliberate choice in it is that everything is driven by typed commands with a graphical view alongside, rather than the other way round. That's the opposite of what most contact tools do, and it's right for the specific person who lives in a terminal and finds clicking through forms slower than typing what they want.",
    body: [],
    tags: ["Java", "JavaFX", "CLI"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "chessphere",
    title: "ChessPhere",
    role: "Co-founder",
    dates: "2020 – 2022",
    tier: "minor",
    group: "earlier",
    summary:
      "I've played competitive chess since I was young, and when the pandemic shut down every over-the-board tournament, the thing that disappeared wasn't the game. Online chess was fine. What disappeared was the community around it. So a few friends and I started running virtual tournaments and workshops, and we were drawing over a hundred players to each one. It never made money and it was never going to. What it taught me is that a small niche can matter enormously to the people inside it, and that's a reasonable thing to build for.",
    body: [],
    tags: ["Community", "Events", "Chess"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "donation-nation",
    title: "Donation Nation",
    role: "Co-founder",
    dates: "2020 – 2022",
    tier: "minor",
    group: "earlier",
    summary:
      "This started with me giving away things from my own house to local NGOs during the pandemic. It worked, and it obviously didn't scale, because the bottleneck was one person with a car and a limited amount of stuff. So we built a platform to connect donors with communities that needed things, working through established NGOs and logistics partners rather than trying to move goods ourselves. The lesson I took from it is that the useful thing technology did here wasn't the donating, it was removing the coordination problem that made donating hard.",
    body: [],
    tags: ["Social Impact", "Platform", "NGO Partnerships"],
    links: [],
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
export const projectGroups = (
  ["production", "research", "ventures", "earlier"] as const
)
  .map((group) => ({
    group,
    projects: projects.filter((p) => p.group === group),
  }))
  .filter((g) => g.projects.length > 0);

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
