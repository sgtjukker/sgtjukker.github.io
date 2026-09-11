# Joakim Månsson portfolio

A responsive React and TypeScript personal profile site, built with Vite for GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Create a production build with `npm run build`, or preview it with `npm run preview`.

The content model lives in `src/data/profile.ts`. The Swedish CV remains available from the site as a downloadable PDF.

## GitHub Pages

Deployment is handled by `.github/workflows/deploy.yml`. In the repository settings, open **Pages** and set **Source** to **GitHub Actions**. Every push to `main` builds the Vite app and publishes `dist/`.