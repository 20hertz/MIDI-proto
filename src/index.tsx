// Must be the first import
if (process.env.NODE_ENV === "development") {
  // Must use require here as import statements are only allowed
  // to exist at top-level.
  require("preact/debug");
}
import { h, render } from "preact";
import App from "./App";

// TODO:  Only create AudioContext when user has interacted with the domain (click, tap, etc.),
//        or else it will be created in the "suspended" state
export const audioCtx = new AudioContext();

const mountNode = document.getElementById("root");

render(<App />, mountNode);
