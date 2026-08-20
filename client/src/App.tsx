import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import Home from "@/pages/home";
import Work from "@/pages/work";
import ProjectsPage from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Research from "@/pages/research";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

/**
 * Puts every route change back at the top of the page.
 *
 * Without this a visitor who scrolls to the bottom of /projects and clicks
 * "About" lands halfway down the About page, because the browser keeps the
 * scroll offset when only the DOM under it is swapped.
 *
 * `behavior: "instant"` is explicit so this never inherits a smooth
 * scroll-behavior from CSS and animates the jump.
 */
function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/projects/:slug" component={ProjectDetail} />
      <Route path="/research" component={Research} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        {/*
          The navbar is fixed, so it is out of flow and would otherwise sit on
          top of whatever each route renders first. Reserving its height here
          means every route clears it by construction, instead of each section
          happening to have enough padding of its own.
        */}
        <main className="pt-[var(--nav-h)]">
          <Router />
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </TooltipProvider>
  );
}

export default App;
