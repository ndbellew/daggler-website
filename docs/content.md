# Content authoring

Projects live in `content/projects/*.mdx`; articles and PDF-backed documents live in `content/writing/*.mdx`. The filename becomes the URL slug. Use lowercase kebab-case and keep URLs stable after publication.

## Frontmatter

```yaml
---
title: Clear title
description: One sentence used in cards and metadata.
date: 2026-01-15
tags: [Systems, Reliability]
featured: true
placeholder: false
year: 2026       # optional, primarily for projects
status: Shipped  # optional, primarily for projects
repository: https://github.com/owner/repository # optional, projects only
demo: https://example.com # optional; include only when verified
author: Author Name # optional; omit when the document does not state one
documentType: Course project # optional, primarily for writing
pdf: /document.pdf # optional, writing only; file remains in public/
---
```

Required fields are `title`, `description`, `tags`, `featured`, and `placeholder`. Projects also require `date`. Writing may omit `date` when the source document provides none; dated entries sort newest first and undated entries sort afterward by title. Never fabricate a publication date from citation years or file metadata. When present, dates must be ISO-compatible.

The intentionally small parser supports strings, booleans, and inline string arrays; multiline YAML is not supported. PDF paths must be root-relative, end in `.pdf`, and point to the original file in `public/`.

Project `repository` and `demo` fields must be absolute HTTPS URLs. Keep ownership selection manual: a repository being present under an account does not by itself prove authorship. Only feature projects the owner has approved. The homepage renders at most five entries marked `featured: true`.

Future idea—not implemented: add a separate **Recently worked on** section containing the five most recently updated eligible GitHub projects, with summaries grounded in each repository's README. Any future automation should reuse this frontmatter/content layer, exclude forks and third-party work, preserve manual ownership approval, and avoid publishing generated summaries without review.

MDX content is trusted repository source compiled during the build. Do not render user-provided MDX. Avoid embedding secrets, confidential data, proprietary source, unverifiable metrics, or private customer details.

PDF publication pages use the shared writing layout and `PdfPublication` component for the embedded document, open/download actions, and fallback link. Keep summaries concise and source-grounded; do not convert an entire PDF into HTML or assign authorship, academic status, publication venues, or review status that the document does not state.

Run all checks after content changes because invalid frontmatter fails the build.
