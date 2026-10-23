# Content authoring

Projects live in `content/projects/*.mdx`; articles live in `content/writing/*.mdx`. The filename becomes the URL slug. Use lowercase kebab-case and keep URLs stable after publication.

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
---
```

Required fields are `title`, `description`, `date`, `tags`, `featured`, and `placeholder`. Dates must be ISO-compatible. The intentionally small parser supports strings, booleans, and inline string arrays; multiline YAML is not supported.

MDX content is trusted repository source compiled during the build. Do not render user-provided MDX. Avoid embedding secrets, confidential data, proprietary source, unverifiable metrics, or private customer details.

Run all checks after content changes because invalid frontmatter fails the build.
