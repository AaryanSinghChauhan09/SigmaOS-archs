# SigmaOS Omarchs

> Forked from omacom/omarchs (MIT). See `SIGMAOS_FORK.md`.

The King & Queen of the Computer, in the land of [Omarchy](https://omarchy.org). Live at [omarchs.fyi](https://omarchs.fyi).

A single Cloudflare Worker serves the page and both portraits — no build step, no bucket.

## Files

- `index.html` — the page
- `worker.mjs` — Worker entry: serves the HTML, the portraits, redirects www → apex
- `omarch-king.jpeg` / `omarch-queen.jpeg` — Their Majesties (uploaded as `king.jpeg` / `queen.jpeg` modules)
- `bin/serve` — local preview with live reload
- `og.jpeg` — 1200×630 Open Graph card (both monarchs, gold divider)

## Develop

```sh
bin/serve          # http://localhost:3000 (pass a port to change it)
```

Serves the same routes as the Worker, straight from disk. Saving `index.html` reloads the browser.

## Deploy

Upload the Worker as multipart modules (module names come from the `filename=` attribute):

```sh
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/omarchs" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -F 'metadata={"main_module":"worker.mjs","compatibility_date":"2026-08-01"};type=application/json' \
  -F 'worker.mjs=@worker.mjs;type=application/javascript+module;filename=worker.mjs' \
  -F 'index.html=@index.html;type=text/plain;filename=index.html' \
  -F 'king.jpeg=@omarch-king.jpeg;type=application/octet-stream;filename=king.jpeg' \
  -F 'queen.jpeg=@omarch-queen.jpeg;type=application/octet-stream;filename=queen.jpeg' \
  -F 'og.jpeg=@og.jpeg;type=application/octet-stream;filename=og.jpeg'
```

Long may they reign. Long may they compile.
## Documentation

Wiki documentation is available in the SigmaOS Wiki Staging repository:

- [SigmaOS Wiki Staging](https://github.com/AaryanSinghChauhan09/sigmaos-wiki-staging#SigmaOS-archs) - Full Wiki documentation for all SigmaOS components
