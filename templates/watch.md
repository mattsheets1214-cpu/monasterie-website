---
# Watch: becomes a page at /watches/{{CATEGORY}}/{{SLUG}}/ and a card on its
# category page. Put photos in this same folder (JPG or PNG, about 2000 px on
# the long side) and list them below.

name: {{NAME}}
# The category's file name without .md (see src/content/categories/).
category: {{CATEGORY}}
# One sentence: what it is and who it's for.
summary: TODO one sentence about this watch
# For Google and share previews, 120-160 characters. Optional: uses summary if left out.
# description:

# concept | prototype | pre-order | available | sold out
status: concept

# Leave the price out until it's real; the page then says "Price to be announced".
# price:
#   amount: 450
#   currency: USD

# First photo is the hero, the category card and the share image, so make it
# your best front shot. Portrait (4:5) crops best. Every photo needs alt text
# that says what's in it.
photos:
#   - src: ./front.jpg
#     alt: TODO front of the watch on a plain background
#   - src: ./wrist.jpg
#     alt: TODO the watch on a wrist
#   - src: ./caseback.jpg
#     alt: TODO the engraved caseback

# Full specifications, in groups. Delete any row or group that doesn't apply,
# and add your own rows the same way.
specs:
  - group: Case
    rows:
      - { label: Diameter, value: TODO mm }
      - { label: Thickness, value: TODO mm }
      - { label: Lug to lug, value: TODO mm }
      - { label: Lug width, value: TODO mm }
      - { label: Material, value: TODO }
      - { label: Crystal, value: TODO }
      - { label: Water resistance, value: TODO m }
  - group: Movement
    rows:
      - { label: Calibre, value: TODO }
      - { label: Type, value: TODO }
      - { label: Power reserve, value: TODO hours }
      - { label: Functions, value: TODO }
  - group: Dial and hands
    rows:
      - { label: Dial, value: TODO }
      - { label: Hands, value: TODO }
      - { label: Lume, value: TODO }
  - group: Strap
    rows:
      - { label: Strap, value: TODO }
      - { label: Buckle, value: TODO }

# Lower numbers come first on the category page.
order: 100
# Drafts show in `npm run dev` only. Change to false to publish.
draft: true
---

## The idea

TODO: who this watch is for and what it celebrates.

## The design

TODO: the case, the dial, the details that make it a Monasterie.
