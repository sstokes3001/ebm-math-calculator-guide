# EBM Math Calculator Guide — Agent Rules

Cross-tool agent rules (read by Google Antigravity and other AGENTS.md-aware tools). Claude Code reads CLAUDE.md instead; if rules conflict, CLAUDE.md is canonical for Claude Code and this file is canonical for Antigravity. Keep the two in sync when conventions change.

## Purpose
Evidence-Based Medicine interactive calculator app for medical students and researchers — risk (RR/ARR/NNT), odds ratio, diagnostic testing (sensitivity/specificity/PPV/NPV/LR), confidence-interval interpretation, and clinical-significance concepts.

## Environment & commands
React 19 + TypeScript, Vite, Tailwind CSS via CDN, Lucide React icons, html2canvas + jsPDF. No Python/venv — npm only.

```
npm install          # first time only
npm run dev           # dev server at http://localhost:3000
npm run build          # runs typecheck then vite build
npm run preview         # preview production build
npm run typecheck        # TypeScript errors only
npm test                 # vitest run
```

Real-consumer verification:
```
npm run build && npm run preview
```
Then work one calculator with numbers whose correct answer you already know (a worked 2x2 with known RR/ARR/NNT is fastest) and confirm the displayed result by hand. Compiling is not computing.

## Testing policy
Shipped web app: Vitest tests render each calculator, drive its inputs, click Calculate, and assert the DISPLAYED numbers against hand-worked textbook examples — one test file per calculator, next to its component (`components/calculators/*.test.tsx`). If you change any formula or displayed number, update the matching worked example by hand from the formula reference in CLAUDE.md — never paste the app's own new output into the test as the expected value.

## Rules
- Deploys automatically on push to main via Vercel — students access the app via the Vercel URL, so treat main as production.
- No student data or FERPA considerations — this is a public educational tool, not tied to a specific cohort.
- No emojis anywhere. Conventional commits (`type: description`). Feature branch before changes. Never push unless asked.
- STATUS.md is the only resume file — max ~60 lines, rewritten each time, never appended to.

## Note for maintainers
CLAUDE.md for this project includes a "Claude Code Workflows" table referencing Claude Code slash commands (`/commit`, `/commit-push-pr`) that are specific to that tool and have no equivalent here — use your own commit/PR workflow instead.
