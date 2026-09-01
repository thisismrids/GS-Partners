# Content data

These two files feed the homepage ("Latest thinking" / "Selected experience") and their full listing pages (`insights.html`, `experience.html`) automatically. Add an entry here — you don't need to touch any HTML.

They're plain `.js` files (not `.json`) on purpose: they just set a `const` array and get loaded with a normal `<script>` tag, so the site works whether you open `index.html` by double-clicking it or it's hosted for real. (`fetch`-ing a local JSON file is blocked by browsers when a page is opened as `file://`, which is why an earlier version of this went blank when previewed locally.)

Both are ranked by `date` (newest first). The homepage always shows the top 3; the listing pages show everything.

## data/insights.js

Add a new object to `INSIGHTS_DATA` to add an insight/article.

```js
{
  "slug": "my-new-article",
  "status": "published",
  "tag": "Framework",
  "title": "The article title",
  "excerpt": "One or two sentences — this is the card blurb.",
  "url": "insights/my-new-article.html",
  "date": "2026-10-15",
  "dateLabel": "October 2026"
}
```

- `status`: `"published"` (shows on homepage + listing, links to `url`) or `"pending"` (listing page only, greyed out, no link — use this for "coming soon" topics).
- `url`: the actual article HTML file — you still write that page by hand (copy `insights/quiet-category-exit.html` as a starting template), this just makes it *appear* everywhere automatically once it exists.

## data/experience.js

Add a new object to `EXPERIENCE_DATA` to add a project/engagement.

```js
{
  "client": "Client name",
  "title": "Short engagement title",
  "focus": "e.g. Go-to-market",
  "scope": "e.g. Live project / Advisory / Retainer",
  "description": "One or two sentences on what you did.",
  "date": "2026-10-01"
}
```

Note: the three seed entries (PUMA, the FMCG live project, Wazir Advisors) have placeholder `date` values — they're only there to set the display order since we didn't have exact dates on hand. Update them to the real (approximate) dates whenever convenient.
