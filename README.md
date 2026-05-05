# Aspire Platform

**Rafay Ashraf, ACCA** — Risk, GRC & Finance Professional Development Platform

A gamified SaaS learning platform for accounting, audit, risk, and finance professionals.

## Features

- **AI Prompt Library** — 18 consulting-grade prompts with anti-hallucination constraints
- **Study System** — ACCA exam tracker with progress bars, checklists, and cheatsheets
- **Risk & Audit Toolkit** — 8 KPMG-methodology-aligned templates
- **Simulation Lab** — 3 professional decision scenarios with feedback and XP rewards
- **Gamification** — XP system, levels, and progress tracking
- **Light/Dark mode** — Toggle between themes

## Setup

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Deploy

Upload the `build/` folder to Netlify, Vercel, or any static host.

### Netlify (easiest)
1. Push to GitHub
2. Connect repo at netlify.com
3. Build command: `npm run build`
4. Publish directory: `build`

### Vercel
1. Push to GitHub
2. Import at vercel.com
3. Framework: Create React App
4. Deploy automatically

## Project Structure

```
src/
  data/
    theme.js          # Colors, levels, tooltips
    prompts.js        # 18 AI prompts with full text
    papers.js         # ACCA papers, checklist, cheatsheets
    simulations.js    # 3 scenarios + risk toolkit data
  components/
    Navbar.js         # Sticky navigation with theme toggle
    Dashboard.js      # Home page with XP and stats
    PromptLibrary.js  # Filterable prompt cards with copy
    StudySystem.js    # ACCA tracker with expandable papers
    RiskToolkit.js    # Template catalog with tier badges
    SimulationLab.js  # Decision scenarios with tooltips
    Pricing.js        # 3-tier pricing comparison
  App.js              # Root component and state management
  index.js            # Entry point
```

## Tech Stack

- React 18
- Google Fonts (Space Grotesk + JetBrains Mono)
- No external UI libraries (pure CSS-in-JS)

## License

All content is proprietary. See terms on platform entry.
