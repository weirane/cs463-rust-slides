import { chromium } from 'playwright-chromium';

// Preload before Slidev's CLI to seed Playground preferences in its exporter.
const launch = chromium.launch.bind(chromium);
chromium.launch = async (...args) => {
  const browser = await launch(...args);
  const newContext = browser.newContext.bind(browser);
  browser.newContext = async (...contextArgs) => {
    const context = await newContext(...contextArgs);
    await context.addInitScript(() => {
      if (location.origin !== 'https://play.rust-lang.org') return;
      const state = JSON.parse(localStorage.getItem('redux') || '{"version":2}');
      state.notifications = { ...state.notifications, seenMultipleFiles: true };
      localStorage.setItem('redux', JSON.stringify(state));
    });
    return context;
  };
  return browser;
};
