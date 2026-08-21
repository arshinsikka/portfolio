import { useDocumentMeta } from "@/hooks/use-document-meta";
import HeroSection from "@/components/hero-section";
import LookingFor from "@/components/looking-for";
import HomeIndex from "@/components/home-index";

export default function Home() {
  // No overrides: index.html is authored with the homepage's own title and
  // description, and the hook falls back to them.
  useDocumentMeta({});

  return (
    <>
      <HeroSection />
      <HomeIndex />
      {/*
        Last, immediately above the footer: the availability note is the closing
        ask, not the opening one. It sat second, which put a request in front of
        any evidence for it.
      */}
      <LookingFor />
    </>
  );
}
