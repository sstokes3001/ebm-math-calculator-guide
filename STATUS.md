# ebm-math-calculator-guide — STATUS

## Resume here

**State (2026-07-27):** Shipped React/Vite EBM calculator site (Vercel). Stable and
untouched since 2026-02-08 — this is a finished tool in maintenance, not active work.
`npm run build` (tsc && vite build) passes, live-verified 2026-07-27. Calculators:
confidence intervals, risk (RR/ARR/NNT), odds ratio, diagnostic testing
(sens/spec/PPV/NPV/LR).

**Next task:** add the Vitest unit layer — **APPROVED by Samantha 2026-07-27**,
scheduled as IMPROVEMENT_PLAN Session 3b. Declare and install vitest +
@testing-library/react, one test file per calculator with 2-3 independently-known
worked examples, add `npm test` to package.json scripts and to the CLAUDE.md gate.

**Model/effort:** Sonnet is fine for UI/copy work. Escalate to Opus for anything that
changes a displayed NUMBER — the arithmetic is the product.

**Launch command:**
```
cd ~/code_projects/ebm-math-calculator-guide && npm install && npm run dev
```

**Real-consumer verification:**
```
npm run build && npm run preview
```
Then hand-work one calculator with a 2x2 whose RR/ARR/NNT you already know and confirm
the displayed result. Compiling is not computing.

---

## Open findings (IMPROVEMENT_PLAN Session 2b sweep, 2026-07-27)

Gate verdict: **compiles, but nothing checks the math.**

1. **No tests at all — DECIDED 2026-07-27: Samantha APPROVED the Vitest layer**
   (IMPROVEMENT_PLAN Session 3b). The finding below is kept for its rationale; the
   scope question it raised is settled. No test runner is declared
   or installed (devDependencies are `@types/node`, `@vitejs/plugin-react`, `typescript`,
   `vite` only). PROJECT_STANDARDS.md 2 wants TDD + 80% coverage + E2E for a shipped web
   app. The risk is specific, not theoretical: every calculator is arithmetic that
   clinicians and students read as authoritative, and a swapped numerator/denominator
   would compile and typecheck perfectly clean. The cheap version is a Vitest unit file
   per calculator with 2-3 worked examples each — a few hours, and it would catch the
   only failure mode that actually matters here. Deferred to Samantha because adding a
   test stack to a finished, stable tool is a scope call, not a defect fix — and
   that call has now been made: yes, build it (Session 3b).
2. **No `vercel.json`** — deploy and cache behaviour are entirely platform defaults
   (PROJECT_STANDARDS.md 3 wants a deliberate choice).
3. **Stale by 5+ months** (last commit 2026-02-08). Fine for a finished tool; noted so
   the date is not mistaken for neglect of active work.

Fixed this session: `package-lock.json` was UNTRACKED with no `.gitignore` rule
excluding it — an oversight, and a reproducibility break, since `npm install` on another
machine could resolve different transitive versions than the ones this build was verified
against. Now committed. Also added the quality-gate and real-consumer sections to
CLAUDE.md, including an explicit warning not to read a green build as evidence the
arithmetic is right.
