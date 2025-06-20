# EarTab

**EarTab** is a minimal browser extension for Firefox that trains your ear by playing a musical interval every time you open a new tab. 

## Features

- Plays two-note intervals using synthesized tones (Web Audio API)
- Prompts you to identify the interval from a small set of choices
- Clean, responsive, text-based interface
- Manual control: replay current interval or generate a new one

## Getting Started

To install manually for development:

1. Clone or download this repository.
2. Open `about:debugging` in Firefox.
3. Click **"This Firefox"** → **"Load Temporary Add-on..."**
4. Select `manifest.json` from the folder.

The extension will override new tabs with EarTab.