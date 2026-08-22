import { useState } from "react";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import HeroSection from "@/components/hero-section";
import LookingFor from "@/components/looking-for";
import HomeIndex from "@/components/home-index";

export default function Home() {
  // No overrides: index.html is authored with the homepage's own title and
  // description, and the hook falls back to them.
  useDocumentMeta({});

  /**
   * The tagline cue. The claim lives in the hero and its evidence lives in the
   * index below, so the state that links them belongs to the page that owns
   * both — not to either component, and not to a context for one boolean.
   */
  const [cued, setCued] = useState(false);

  return (
    // The widened rail is scoped here, not to the hero, and it is deliberately
    // the whole route rather than the one block that needs it. `--rail-w` is
    // read by every Block, so widening the hero alone would step its content
    // edge ~120px right of every section beneath it and break the single left
    // spine the rail system exists to draw. Every other page keeps 6rem.
    <div className="rail-home">
      <HeroSection onCue={setCued} />
      <HomeIndex cued={cued} />
      {/*
        Last, immediately above the footer: the availability note is the closing
        ask, not the opening one. It sat second, which put a request in front of
        any evidence for it.
      */}
      <LookingFor />
    </div>
  );
}
