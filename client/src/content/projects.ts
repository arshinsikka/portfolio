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
    title: "Building a drone assistant that can say no",
    role: "AI Engineer Intern, Garuda Robotics",
    dates: "Jul 2026 – Present",
    tier: "featured",
    group: "production",
    summary:
      "You can delete a bad answer. You can't un-fly a drone. That changes where the checks go.",
    body: [],
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          {
            text: "Drone pilots have to clear a lot before a single flight: is the airspace open, is the aircraft healthy, is the weather workable, does the flight plan conform. That information lives in five different places and none of them talk to each other. Approving one mission is a manual sweep, and it doesn't get faster as the fleet grows.",
          },
          {
            text: "I'm building a desktop app where a pilot asks the question in plain English and gets a real answer from the live flight platform. A small model runs on the pilot's own laptop. It knows nothing about airspace and is told never to answer from memory. Its only job is to work out which real system holds the answer, go and get it, and read it back.",
          },
        ],
      },
      {
        heading:
          "The part that made this different from anything I'd built before",
        paragraphs: [
          {
            text: "Every pilot is cleared for a specific area and a maximum altitude. Ask for something outside that and the system has to refuse.",
          },
          {
            text: "Everything I'd worked on before was reversible. A bad answer gets deleted, a bad write gets rolled back, so you design to catch mistakes after they happen. That doesn't work here. By the time anyone notices, the drone is in the air.",
          },
          {
            text: "The obvious approach is to tell the model what it isn't allowed to do. Models are good at declining. They get it right most of the time, and most of the time is a perfectly good standard for a chatbot. It isn't one for a flight.",
          },
          {
            text: "So the model doesn't get to make that call. Something further down the line does, somewhere the model can't reach, and what the pilot sees on screen comes from that decision rather than the model's description of it.",
          },
        ],
      },
      {
        heading: "Working out where that check goes",
        paragraphs: [
          {
            text: "Three candidate places, and only one of them survives.",
          },
          {
            text: "Not the pilot's own app. It runs on their machine, where anyone can open it up and delete the check. A limit enforced by the thing being limited isn't really a limit.",
          },
          {
            text: "Not the security layer that sits in front of everything, which is where I assumed it belonged. That layer knows who is asking, which sounds exactly right until you notice that being cleared for an area is a fact about numbers. To enforce it you have to be able to read the numbers in the request, and that layer can't. I only found this by testing it directly, and it turned out one of our own architecture diagrams had it wrong.",
          },
          {
            text: "That leaves the service at the far end, the one that actually receives the request and runs somewhere the pilot can't touch. First place that sees both the request and the rules.",
          },
        ],
      },
      {
        heading: "The thing I didn't see coming",
        paragraphs: [
          {
            text: "Once you lay it out, the security layer knows who is asking but not what they asked. The service that enforces the limits knows what was asked but not who asked it. Nothing in the chain knows both at once.",
          },
          {
            text: "Almost every unfinished thing in this project comes back to that one split. The approved limits are currently a single set applied to everyone, rather than per-pilot, because the part enforcing them has no idea whose limits to apply. The record of every decision has no name attached for the same reason. I could have put one in. A made-up name in a safety record is worse than an honest gap.",
          },
        ],
      },
      {
        heading: "Three answers a pilot must never confuse",
        paragraphs: [
          {
            text: "Restricted means we checked the airspace and you can't fly there.\nRefused means you're not cleared to ask, so nothing was checked.\nUnverified means the check itself failed and nobody knows either way.",
          },
          {
            text: "Giving these three different colours felt like fussing over the interface until I wrote them next to each other. Confusing the second for the first has a pilot believing a location was surveyed when it never was.",
          },
        ],
      },
      {
        heading: "A refusal that never happened",
        paragraphs: [
          {
            text: "I was testing with an old conversation still open, and asked something I'd asked earlier. The model answered from its own memory of the previous exchange instead of going and checking again.",
          },
          {
            text: "The answer was correct. Right limits, right conclusion, stated with total confidence. Nothing had actually been checked.",
          },
          {
            text: "The only clue was what wasn't there: no sign of the system having gone and looked. Absences are very easy to miss when you're glancing at a screen.",
          },
          {
            text: "That changed how I think about the interface. It isn't just displaying a result. An answer that came from a real check has to visibly look different from one that didn't, which makes that part of the screen a piece of the safety system rather than decoration.",
          },
        ],
      },
      {
        heading: "Where it actually is",
        paragraphs: [
          {
            text: "The whole path works on a laptop: the question, the check, the refusal, and a record of the decision written down before the pilot ever sees the answer.",
          },
          {
            text: "What isn't done: pilots don't log in yet, so the system can't tell them apart. The limits are shared rather than personal. Nothing runs anywhere but my machine. And the harder version, refusing a request that would change something rather than just refusing to look something up, is designed but not built.",
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
    title: "Six months making an AI assistant refuse the right things",
    role: "Data Science Intern, SP Digital",
    dates: "Jan 2026 – Jun 2026",
    tier: "standard",
    group: "production",
    summary:
      "My first system where someone was paid to break it. That changed how I build.",
    body: [],
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          {
            text: "A utility company built an internal assistant so staff could ask questions in plain English instead of digging through documentation. Two groups use it: engineers doing physical work on the electrical grid, and the admin staff who handle the paperwork behind switching equipment on and off. Same assistant, same underlying information, but one group is allowed to see things the other isn't.",
          },
          {
            text: "I spent six months there, almost all of it on the guardrails. That's the layer deciding what the system answers, what it declines, and how anyone can tell which just happened.",
          },
        ],
      },
      {
        heading: "Why this wasn't the same job as before",
        paragraphs: [
          {
            text: "Everything I'd built until then was mine. If someone hit an awkward edge they'd shrug and move on.",
          },
          {
            text: "Here the people asking questions are working on live electrical infrastructure, and the company pays an outside team to attack the system on purpose twice a year. That changes where the work actually is. I'd been thinking about AI applications as a pipeline: take an input, run a model, make the output good. In a company that size the pipeline is maybe a third of it. The rest is proving what the system is allowed to say, to whom, and knowing whether that's still true after the next change.",
          },
        ],
      },
      {
        heading: "What a guardrail actually has to do",
        paragraphs: [
          {
            text: "I'd assumed a guardrail was one thing, a filter you put somewhere. It's several things doing different jobs.",
          },
          {
            text: "Something has to decide whether a question should be answered at all, before anything runs. Something else has to check what's about to go out, because a perfectly reasonable question can pull back an answer containing something the person asking isn't cleared to see. The same question from two different people should sometimes get two different answers, which means permissions have to reach into the answer itself rather than just the front door.",
          },
          {
            text: "Then there's the category of attack where nobody is asking the assistant for information at all. They're asking it about itself: how it's configured, what it's connected to, what it was told not to do. That's a different failure. The system isn't leaking data, it's handing over the map.",
          },
          {
            text: "And none of it should rest on the model alone. The model has its own refusals and they're decent, but they're the same component being asked to police itself. I ran a separate classifier alongside it, trained for local context, so an unsafe request had to get past two things that could fail differently rather than one thing twice.",
          },
        ],
      },
      {
        heading: "The decision I'd defend",
        paragraphs: [
          {
            text: "Topic restriction started as keyword matching. It blocked things, so at a glance it worked.",
          },
          {
            text: "What it actually did was block the wrong things. An engineer asking a completely reasonable operational question that happened to contain a flagged word got refused, while anyone who phrased a request around the list got straight through.",
          },
          {
            text: "The problem is structural rather than a matter of tuning the list. Keyword matching can't tell the difference between asking about something and asking the system to do it. Those are usually the same words.",
          },
          {
            text: "So I replaced it with classification that reads what a request is for. It's slower than comparing strings, it isn't perfectly repeatable, and it puts another model call in front of every question. I took that trade because of which failure worried me more, which brings me to the thing I got wrong.",
          },
        ],
      },
      {
        heading: "The failure nobody reports",
        paragraphs: [
          {
            text: "I spent the first stretch calibrating toward strict, because strict felt safe. Tightening a guardrail felt like progress and had no cost I could see.",
          },
          {
            text: "The cost was blocked legitimate questions, and those are completely invisible. A leak gets noticed, escalated, written up. Someone who asks two reasonable questions, gets refused both times, and quietly decides the tool isn't worth the bother doesn't file anything. There's no error, no ticket, no signal at all. The system looks like it's working perfectly right up until nobody is using it.",
          },
          {
            text: "The fix was writing a set of questions a real engineer would actually ask, then treating a block on one of those as a defect worth exactly as much as a successful attack. Once both kinds of failure had numbers next to them, the trade-off was something I could look at instead of something I was feeling my way through.",
          },
        ],
      },
      {
        heading: "How I know any of it worked",
        paragraphs: [
          {
            text: "For a while I didn't. I'd try a bypass, watch it get blocked, feel good, move on. That's an anecdote, not evidence, and it doesn't survive the question \"is it better than last week\".",
          },
          {
            text: "So I built a test suite that runs attacks automatically: over 400 prompts across several sets, covering attempts to override the system's instructions, attempts to talk it into a different persona, and probes trying to get it to describe its own setup. Unsafe responses dropped by around 60%. I only know that number because there was something fixed to measure against.",
          },
          {
            text: "If I were starting again I'd build the measurement first. It feels like a detour when you want to be fixing things, and it's the only reason any later change means anything.",
          },
        ],
      },
      {
        heading: "The part I didn't grade myself",
        paragraphs: [
          {
            text: "An external security team tested the system and I closed what they found. It's the only assessment of this work I didn't write, which makes it the only one I'd quote without qualifying it.",
          },
        ],
      },
      {
        heading: "A second strand: proving the redaction worked",
        paragraphs: [
          {
            text: "Separately I evaluated the system that strips personal information out of customer call transcripts before anything else touches them.",
          },
          {
            text: "Most of the work wasn't the scoring. It was deciding what counts. Is a receipt number personal information? A partial email address? A street name with no number? Those had to be written down as rules and applied consistently across a manually reviewed set before any score meant anything, because a number measured against inconsistent labels is worse than no number.",
          },
          {
            text: "The one genuinely interesting choice was the metric. The standard measure treats a miss and a false alarm as equally bad. Here they obviously aren't. Redacting something harmless is an inconvenience. Missing an actual phone number is the thing you built the system to prevent. So I weighted the score toward catching everything, and said so explicitly rather than reaching for the default.",
          },
        ],
      },
      {
        heading: "What I took from it",
        paragraphs: [
          {
            text: "I went in thinking the job was getting a model to behave. I came out thinking the job is making its behaviour provable, to someone who wasn't there and doesn't take your word for it.",
          },
          {
            text: "Everything I've built since starts with how I'm going to test it.",
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
    title: "Testing whether a known market signal actually makes money",
    role: "Independent study",
    dates: "Aug 2026",
    tier: "featured",
    group: "research",
    summary:
      "I wrote down the method before I looked at any data. Halfway through I found what I was testing for, then worked out the maths was producing it, not the market.",
    body: [],
    sections: [
      {
        heading: "The question",
        paragraphs: [
          {
            text: "There's a well-known pattern in financial markets. If there are more buy orders than sell orders sitting on an exchange at a given moment, the price tends to tick up over the next few seconds. That much is settled and has been for years.",
          },
          {
            text: "Whether it predicts well enough to be worth trading on is a different question, because trading isn't free. Every trade pays a fee and gives up a little on the gap between what buyers offer and what sellers ask. So the real question isn't \"does this predict\", it's \"does it predict by more than it costs to act on\".",
          },
          {
            text: "I tested it on ten days of order book data from one cryptocurrency market. The answer is no.",
          },
        ],
      },
      {
        heading: "Writing the method down before looking at anything",
        paragraphs: [
          {
            text: "Financial data will hand you a profitable-looking result if you keep asking. Try enough time horizons, enough ways of slicing the market, enough assumptions about cost, and something eventually clears. Every choice you make after seeing the data is a chance to nudge things toward what you were hoping for, usually without noticing you're doing it.",
          },
          {
            text: "So the first thing I wrote wasn't code. It was the method: which horizons I'd test, how I'd define different market conditions, how I'd calculate costs, what would count as the signal being worth trading, and how I'd test whether any result was real rather than noise. I committed that as the very first thing in the project, before any analysis existed, so the order is checkable by anyone who looks.",
          },
          {
            text: "I also wrote down all four possible outcomes in advance and said each was a valid finding, including \"no effect\" and \"not enough data to tell\". That's the part that matters. Committing to a method only counts if you've committed to publishing whatever it produces.",
          },
        ],
      },
      {
        heading: "Rebuilding the data, then checking it against myself",
        paragraphs: [
          {
            text: "The exchange doesn't publish what its order book looked like at any given moment. It publishes one snapshot and then a continuous stream of changes, so the actual state at any point in time exists nowhere in the file. You have to rebuild it by replaying every update in order.",
          },
          {
            text: "One misapplied update silently corrupts everything after it, and there's no correct answer anywhere to compare against. So I wrote a second, completely separate version of the rebuild and checked the two against each other at sampled points. Writing the same thing twice feels like wasted effort right up until it's the only way to know you got it right.",
          },
          {
            text: "That produced 8.5 million rows from about seven gigabytes of raw feed.",
          },
        ],
      },
      {
        heading: "Assuming the worst about costs",
        paragraphs: [
          {
            text: "I gave myself no favourable treatment anywhere. I assumed I'd always pay the full gap between buy and sell prices, on both entry and exit, and get no priority in the queue. Then I ran the entire analysis across four different fee levels rather than picking one, because picking one makes the answer a consequence of that choice.",
          },
        ],
      },
      {
        heading: "The result that wasn't real",
        paragraphs: [
          {
            text: "Partway through, I found exactly what I'd set out to look for. In about a third of the cases I tested, the signal appeared to be profitable in some market conditions and not others. That was the whole point of the study, sitting right there.",
          },
          {
            text: "Then I looked at why.",
          },
          {
            text: "The measure I was ranking things by is roughly average profit, minus cost, divided by how volatile the market was. At realistic fees the cost is far larger than the profit, and the cost barely changes between one market condition and another. So the top of that fraction was essentially the same number everywhere, and what I was actually ranking was volatility. Nothing to do with profitability at all.",
          },
          {
            text: "The giveaway is that the whole effect disappears if you set fees to zero, where the cost term nearly vanishes.",
          },
          {
            text: "I wrote it up as an artefact rather than a finding. It would have been the most impressive-looking thing in the study.",
          },
        ],
      },
      {
        heading: "What I actually found",
        paragraphs: [
          {
            text: "The signal predicts. That part holds up cleanly, and its power fades the further ahead you look, which is what the theory says should happen.",
          },
          {
            text: "It isn't tradable. The largest edge the model predicts anywhere in the held-back data is smaller than the cheapest realistic cost of making the trade. The rule I'd committed to in advance, trade only when expected profit exceeds cost, never fired once at any real fee level. That isn't a near miss where a better model closes the gap. The two distributions don't overlap.",
          },
          {
            text: "The economics also came out backwards. The standard theory says this signal should work best in thin, jumpy markets where individual orders move the price more. Measured, it works worst there. Two separate parts of the analysis found that independently, which is the main reason I believe it.",
          },
          {
            text: "I also tested a more sophisticated version using more layers of the order book. It lost to the simple one at every horizon, so it stayed out.",
          },
        ],
      },
      {
        heading: "What this doesn't show",
        paragraphs: [
          {
            text: "Ten days, one asset, in a fairly calm stretch of market. Nothing here says anything about stressed conditions or other instruments.",
          },
          {
            text: "The data is snapshots roughly ten times a second rather than every individual event, so this is a medium-speed study and I've drawn no high-frequency conclusions from it.",
          },
          {
            text: "And the market conditions I defined turned out to flip every few seconds, which makes them a short-lived state rather than a regime in the sense my own framing implied. That gap is real and I haven't resolved it.",
          },
        ],
      },
      {
        heading: "Where it landed",
        paragraphs: [
          {
            text: "A negative result, a contradicted theory, and the most interesting thing I found turning out to be an artefact of my own arithmetic. None of that is what I was hoping for.",
          },
          {
            text: "The useful part is the order I did things in. The method existed before the data, so when the exciting result appeared I had no room to talk myself into it. I don't think I'd have caught it otherwise.",
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
    slug: "oulad-early-warning",
    title: "Predicting who drops out, and the metric that couldn't tell",
    role: "Independent study",
    dates: "Aug 2026",
    tier: "featured",
    group: "research",
    summary:
      "I picked the numbers that decided half my results after I'd already seen the results. The only reason I noticed is that I'd written down what I was going to do first.",
    body: [],
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          {
            text: "A third of the students on a typical distance-learning course don't finish it. Some fail, more just stop showing up. Universities know this happens and mostly find out too late to do anything, because by the time the marks come in the person has been gone for months.",
          },
          {
            text: "So the obvious thing to build is something that spots them early. Score every student a few weeks into the course using only what's known by then, flag the ones heading for trouble, and hand that list to whoever does the reaching out.",
          },
          {
            text: "I built it on thirty thousand students from the Open University, and it works. It also turned out to be worth almost nothing, for a reason that had nothing to do with the model.",
          },
        ],
      },
      {
        heading: "Deciding everything before looking at anything",
        paragraphs: [
          {
            text: "The first thing in the repository isn't code. It's the method: which features, which weeks I'd score at, how I'd split the data, which metrics counted, what an intervention costs against what a lost student costs, and nine possible outcomes I committed to reporting whichever one turned up.",
          },
          {
            text: "I did this on a previous project and it's the only reason I trusted that result, so it's now how I start. The commit history proves the order, which is the whole point. You can't quietly move the goalposts if they're timestamped.",
          },
          {
            text: "Seven amendments follow it, each recording something I got wrong. That's the part I didn't expect to be the most useful thing in the repository.",
          },
        ],
      },
      {
        heading: "The result, and the metric that couldn't see it",
        paragraphs: [
          {
            text: "The model separates people well. Take the top five percent of the cohort by risk score and you've caught about ninety-three percent of everyone that budget could possibly catch. A tutor working from that list would spend almost none of their time on people who were fine.",
          },
          {
            text: "Now the metric I'd committed to. It weighs a missed student ten times heavier than a false alarm, and it says the model beats a policy of flagging literally every student on the course by under one percent. The simpler baseline, plain logistic regression, actually does slightly worse than flagging everyone.",
          },
          {
            text: "Both of those are true at once. The model ranks well and the metric can't see it.",
          },
          {
            text: "The reason is that four in ten students don't finish. When the thing you're predicting is that common and missing it is that expensive, alerting on everybody is nearly free and almost optimal, so the arithmetic stops caring how good your ranking is. Ten to one is a sensible ratio for fraud or credit, where these events happen to one person in fifty. Here it was the wrong number, and I'd fixed it in writing before I saw any data, so it stayed.",
          },
        ],
      },
      {
        heading: "Marking my own homework",
        paragraphs: [
          {
            text: "The nine outcomes I'd declared in advance turned out to be worded like \"substantially worse\" and \"materially worse\", with nothing anywhere saying what those meant.",
          },
          {
            text: "When I first read the results I filled the gaps: a ten percent drop here, fifteen percent there. It took me longer than it should have to notice all three numbers were chosen after I could see which side of them the answer fell on, and all three happened to land conveniently. So I withdrew them, and four of the six outcomes are now reported as undetermined with the raw figures printed and no verdict at all.",
          },
          {
            text: "Committing to a question in advance does nothing if you haven't also committed to what the answer looks like. I thought I'd already learned this lesson. Apparently only half of it.",
          },
        ],
      },
      {
        heading: "The monitor that would have missed it",
        paragraphs: [
          {
            text: "The model got worse between one year's cohort and the next, losing about a seventh of its discriminating power.",
          },
          {
            text: "The standard way to catch this in production is to watch each input for drift, checking whether the distribution of a feature has shifted since training. So I ran that.",
          },
          {
            text: "The features that moved are not the features the model uses. The single thing it leans on hardest, a count of assignments due but not handed in, is among the most stable measurements in the whole study. The third most important feature is the second most stable of all of them. Only one of the top five drifting features appears anywhere near the top of what the model actually cares about.",
          },
          {
            text: "Drift monitoring watches each input on its own. What went wrong was the relationship between the inputs and the outcome, and nothing that watches inputs in isolation can see that. The alarm most teams have wired up would have stayed silent through the entire decline.",
          },
          {
            text: "One thing I'd written down as a worry turned out not to be true. Students can take more than one course, so some of the people the model was tested on had appeared in its training data, and I'd flagged in advance that it might simply be remembering them. It isn't. Measured against their own rates, it ranks the returning students worse than the ones it had never seen.",
          },
        ],
      },
      {
        heading: "Asking whether any of it helps",
        paragraphs: [
          {
            text: "Ranking people by risk says nothing about whether contacting them changes the ending. That's a different question and a model can't answer it.",
          },
          {
            text: "There's no intervention recorded anywhere in this data, so the only honest way at it is to find something that behaves like an accident. Assignments are marked out of a hundred and pass at forty. Someone who scores thirty-nine and someone who scores forty-one are, on average, the same student having a slightly different day, and they get told different things about themselves. If that changes outcomes, the difference should show up as a step at exactly forty.",
          },
          {
            text: "It doesn't, because the mark isn't an accident. There's a pile-up of scores sitting right at the pass line, more above it than below, which is what happens when markers nudge borderline work over. That invalidates the whole approach.",
          },
          {
            text: "I'd written down in advance that a failed check here means the design is dead, which was useful, because scores heap at every round number and forty isn't even the worst one. There was a real argument for carrying on. Making it after seeing the check fail would have been choosing the rule to fit the answer.",
          },
          {
            text: "What survives is the sample size calculation, which says a proper trial would need about fourteen hundred students per group to detect a five point effect. That number is more useful than a result I couldn't have believed.",
          },
        ],
      },
      {
        heading: "The students it can't see",
        paragraphs: [
          {
            text: "The pass-mark analysis only covers people who handed in the first assignment. The early warning model covers everyone still enrolled.",
          },
          {
            text: "Fourteen percent of the students the model scores never submitted anything, and around five in six of them don't finish the course. They are, by a distance, the group most worth reaching.",
          },
          {
            text: "They're also invisible to the only part of this study that could have said whether reaching them works. I flagged that mismatch in the protocol as a possibility before I started. Seeing the size of it was worse than I'd expected and I haven't fixed it.",
          },
        ],
      },
      {
        heading: "Where it landed",
        paragraphs: [
          {
            text: "A model that ranks well, a headline metric that can't tell, three thresholds I invented to flatter myself, a drift monitor that would have slept through the failure, and a causal design that died on its own pre-registered check.",
          },
          {
            text: "I'd have preferred a clean number. What I have instead is a fairly complete map of the ways this kind of project can look like it's working when it isn't, and I only have that because I wrote down what I was going to do before I did it.",
          },
        ],
      },
    ],
    tags: [
      "Machine Learning",
      "Evaluation",
      "Pre-registration",
      "Causal Inference",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/arshinsikka/oulad-early-warning",
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
            text: "Deadlines pulled out separately. Students kept describing the same failure: an assignment deadline mentioned once, forty minutes in, missed entirely. So dates got their own section instead of in the summary where they'd be technically present and functionally invisible.",
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
    role: "Personal project",
    dates: "Mar 2026",
    tier: "standard",
    group: "production",
    summary:
      "A tool for deciding whether to use prompting, retrieval, or fine-tuning for a given job. Most teams pick by instinct or by whatever they read about last. But the costs are all knowable, so I built something that works it out: it scores each option against your budget and latency limits, runs a thousand simulations with the numbers nudged around, and tells you where the answer flips from one to another.",
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
    role: "Developer, NUS Faculty of Dentistry × School of Computing",
    dates: "2026 – Present",
    tier: "standard",
    group: "production",
    summary:
      "A collaboration between the NUS Faculty of Dentistry and the School of Computing. It's an AI tutor for dental students that's built to refuse to answer. The subject is orthodontic clinical reasoning, where being handed the answer defeats the point, so the system asks questions back instead. That constraint drives everything: a multi-stage pipeline that decides what to ask next, retrieval over the faculty's own teaching material rather than the open web, and a review step where a clinician signs off on content before a student ever sees it. Currently in development.",
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
      "Echolens strips personal information out of customer call transcripts. I built the evaluation pipeline that measures how well it does that. Most of the work wasn't the measurement, it was deciding what counts: a receipt number isn't personal information, a partial email address probably isn't either, and those rules have to be written down and applied consistently before any score means anything. I scored it so that missing something counts as worse than being over-cautious, because those two errors aren't equally bad here.",
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
      "Contributions to MarkBind, an open-source documentation site generator maintained at NUS. I was picked for it off the back of the software engineering course. It was the first time I'd worked in a codebase I hadn't written any of, with a review process I had to satisfy.",
    body: [],
    tags: ["Open Source", "Java", "Documentation Tooling"],
    links: [],
    hasDetailPage: false,
  },
  {
    slug: "singapore-society-simulation",
    title: "Singapore Society Simulation",
    role: "Researcher, NUS Odyssey",
    dates: "2026",
    tier: "standard",
    group: "research",
    summary:
      "Can AI agents stand in for real people when you want to know how a population thinks about something? I gave each agent a demographic profile and had them argue a policy question, then compared what they concluded against what real people had said online. They came out quite different. Changing who was in the simulation also moved the answer a long way, which means you'd be measuring your own choice of participants as much as anything else.",
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
      "A card game my friends and I have played for years, which existed only as a physical deck, so it needed everyone in the same room. I built the online version. It then spread by word of mouth to friends of friends I've never met, who kept playing it. Nothing about it was technically hard, and it's still the first thing I built that reached people I didn't tell about it.",
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
      "A cricket draft game we used to run over WhatsApp, badly. Group chats are a terrible place to hold a game with rules. Someone always has to arbitrate, someone always misses a turn, and the state of play lives in whoever scrolled back furthest. So I moved it somewhere that actually holds the rules and keeps everyone in sync.",
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
      "This started with me giving away things from my own house to local NGOs during the pandemic. It worked, and it obviously didn't scale, because the bottleneck was one person with a car and a limited amount of stuff. So we built a platform connecting donors with communities that needed things, working through established NGOs and logistics partners rather than moving goods ourselves. The hard part was never the donating. It was that nobody could find each other.",
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