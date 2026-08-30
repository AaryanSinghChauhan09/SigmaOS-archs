# Omarchs

The King & Queen of the Computer, in the land of [Omarchy](https://omarchy.org). Live at [omarchs.fyi](https://omarchs.fyi).

A single Cloudflare Worker serves the page and both portraits — no build step, no bucket.

## Files

- `index.html` — the page
- `worker.mjs` — Worker entry: serves the HTML, the portraits, redirects www → apex
- `omarch-king.jpeg` / `omarch-queen.jpeg` — Their Majesties (uploaded as `king.jpeg` / `queen.jpeg` modules)
- `og.jpeg` — 1200×630 Open Graph card (both monarchs, gold divider)

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
