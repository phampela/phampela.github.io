# Ava Sinclair Portfolio — Static Site

A fully static, production-ready creative portfolio built for Cloudflare Pages.

## Pages

- **index.html** — Homepage with hero, work overview, blog preview
- **photography.html** — Photography gallery with filter and lightbox
- **blog.html** — Blog/journal with featured post and newsletter CTA
- **product.html** — Product design case studies
- **about.html** — About page with timeline and contact form

## Deploy to Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click **Create a project** → **Direct Upload**
3. Upload this entire folder (or zip contents)
4. Your site is live instantly — no build step required

## Customize

- **Name/copy**: Find and replace "Ava Sinclair" throughout the HTML files
- **Colors**: Edit CSS custom properties in `css/main.css` (`:root` block)
- **Fonts**: Change the Google Fonts `<link>` in each HTML file
- **Images**: Replace the inline SVG placeholders with real `<img>` tags
- **Contact form**: Replace the form button with [Formspree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/products/forms/) endpoint
- **Newsletter**: Wire up the email input to [Mailchimp](https://mailchimp.com) or [ConvertKit](https://convertkit.com)

## Structure

```
portfolio/
├── index.html
├── photography.html
├── blog.html
├── product.html
├── about.html
├── css/
│   └── main.css
├── js/
│   └── main.js
├── images/
│   └── favicon.svg
├── _headers          (Cloudflare security headers)
├── _redirects        (Cloudflare redirects)
└── README.md
```

## Features

- Custom cursor with magnetic hover effect
- Scroll-triggered reveal animations
- Mobile hamburger menu
- Photo lightbox (click any photo)
- Photography filter bar
- Blog post category filter
- Sticky nav with blur on scroll
- Animated marquee ticker
- Fully responsive (mobile, tablet, desktop)
- Optimised for Cloudflare Pages edge delivery

## Tech Stack

- Pure HTML + CSS + Vanilla JS (zero dependencies, zero build step)
- Google Fonts: Cormorant Garamond, Syne, DM Mono
- All visuals are inline SVG (no external image dependencies)
