import { createRoot } from "react-dom/client";
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

createRoot(document.getElementById("root")!).render(<App />);
