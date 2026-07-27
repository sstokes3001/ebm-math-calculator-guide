# ebm-math-calculator-guide — STATUS

## Resume here

**State (2026-07-27):** Shipped React/Vite EBM calculator site (Vercel), in
maintenance. **Vitest layer added 2026-07-27** (IMPROVEMENT_PLAN Session 3b, approved
2026-07-27): 17 tests across 4 files — one per calculator (CI, risk, odds, diagnostic
testing), each driving the real component with hand-worked textbook examples.
Live-verified 2026-07-27: `npm test` 17 pass; `npm run build` passes; mutation check
(transposed RR numerator) turned 4 tests red, then reverted green.

**Next task:** none scheduled. Session 3b work here is done; the branch
`feat/vitest-unit-layer` merges to main at wrapup.

**Model/effort:** Sonnet is fine for UI/copy work. Escalate to Opus for anything that
changes a displayed NUMBER — the arithmetic is the product. If a formula changes,
recompute the test's worked example BY HAND — never paste the app's own output.

**Launch command:**
```
cd ~/code_projects/ebm-math-calculator-guide && npm install && npm run dev
```

**Real-consumer verification:**
```
npm test && npm run build && npm run preview
```
Then hand-work one calculator with a 2x2 whose RR/ARR/NNT you already know and confirm
the displayed result. Compiling is not computing.

---

## Open findings

1. **No `vercel.json`** — deploy and cache behaviour are entirely platform defaults
   (PROJECT_STANDARDS.md 3 wants a deliberate choice). Not in Session 3b scope (only
   the study-guides site got cache headers); decide when next touching deploy config.
2. **Stale-tool caveat retired 2026-07-27** — the "no tests at all" finding from the
   2026-07-27 Session 2b sweep is resolved by the Vitest layer above.
