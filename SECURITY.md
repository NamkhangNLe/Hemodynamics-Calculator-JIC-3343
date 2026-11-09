# Security Policy

## What happened here

A live MongoDB Atlas credential was committed to this public repository in
`server/config.env` (`ATLAS_URI` with a username and password). The file has
been deleted from the `main` branch, and this branch adds a root `.gitignore`
so it cannot be committed again.

**Deleting the file from the code does NOT fix the leak.** The credential is
still in the repository's git history and must be treated as compromised.
This software handles patient data built with Emory School of Medicine, so
treat this as an incident, not a cleanup.

## Required action (owner only)

1. **Rotate the MongoDB Atlas password immediately** (Atlas → Database
   Access → edit the database user and set a new strong password).
2. **Restrict Atlas network access** to known IPs (Atlas → Network Access)
   and **audit the Atlas access logs** for connections you do not recognize.
3. Consider purging `server/config.env` from git history (BFG Repo-Cleaner
   or `git filter-repo`). That rewrites history and must be coordinated —
   it has not been done by this fix.
4. Until rotation is done, assume the database is accessible to anyone who
   read the credential.

## Separate finding (not fixed here)

The API has no authentication or authorization in front of the database
(bare CORS, no auth middleware, no rate limiting). Any client can read and
write patient records once the service is running. Adding auth is a
follow-up task, not part of this secret-removal fix.

## Rules for contributors

- **Never commit credentials** — not `config.env`, not `.env`, not in
  source, docs, or tests. `config.env` and `.env` are gitignored in this
  repo; copy `server/config.env.example` (if present) or the documented
  variable names and fill in your own values locally.
- Keep secrets in a local `server/config.env` file that is never committed.
- If you find a secret in the repo, do not post it anywhere. Remove it,
  open a security fix, and tell the maintainer so the credential can be
  rotated. Assume any committed secret is already compromised.
- To report a vulnerability, contact the maintainer directly. Do not
  include the secret itself in the report.
