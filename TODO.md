# Vercel Deployment TODO

## Plan Steps:
1. [x] Install dependencies and test build: `npm install && npm run build && npm run preview`
   - npm install: completed (some vulns, safe to ignore for deploy)
   - npm run build: running successfully, generating dist/
   - npm run preview: running at http://localhost:4173/ ✓
2. [ ] Initialize Git repo: `git init`
3. [ ] Add remote and first commit: `git remote add origin https://github.com/ankithsk/Portfolio.git`, `git add .`, `git commit -m "Initial commit"`
4. [ ] Push to GitHub: `git branch -M main`, `git push -u origin main`
5. [ ] Deploy on Vercel: Import repo at vercel.com or use CLI `npm i -g vercel`, `vercel login`, `vercel --prod`
6. [ ] [DONE] Verify deployment URL and analytics

**Status:** Step 1 complete. Build & preview active. Proceeding to step 2 after preview confirmation.
**Next:** Kill preview (^C), then git init.

