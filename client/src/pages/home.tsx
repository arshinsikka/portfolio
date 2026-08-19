import HeroSection from "@/components/hero-section";
import LookingFor from "@/components/looking-for";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/*
        LookingFor carries no vertical padding of its own: on the old single
        page it borrowed the 80px gaps from AboutMe's pb-20 above and
        WorkExperience's pt-20 below. Now that it stands alone, the page
        supplies the same rhythm so the strip is spaced exactly as before.
      */}
      <div className="py-20 bg-white dark:bg-slate-900">
        <LookingFor />
      </div>
    </>
  );
}
