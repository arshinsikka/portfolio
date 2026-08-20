import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// The browser restores the previous scroll offset on back/forward *after* the
// popstate event, which lands after React has re-rendered and ScrollToTop has
// already fired. Left on "auto" the browser wins that race and you arrive
// halfway down the page. "manual" removes the browser from the contest, so
// ScrollToTop is the only thing that ever sets scroll position.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const root = document.getElementById("root")!;

// The production build prerenders real markup into #root, which must be
// hydrated — createRoot would throw it away and re-render, losing the whole
// point and flashing. `npm run dev` serves an empty root, so it still mounts
// the ordinary way.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
