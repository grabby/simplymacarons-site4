# Simply Macarons Website

A beautiful e-commerce website for Simply Macarons featuring:
- Responsive design with mobile-first approach
- Comprehensive product catalog with real macaron images
- Cart functionality with quantity controls
- Order form with delivery options
- Email notifications using Resend
- Canadian English localization support

## Development

To start the development server:

```bash
npm run dev
```

## Deployment to GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions. Here's how it works:

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build the site and deploy it to the `gh-pages` branch
3. GitHub Pages will serve the content from the `gh-pages` branch

### Manual Deployment

If you need to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/public` directory.

3. You can then deploy these files to any static hosting service.

## Custom Domain

The website is configured to use the custom domain `simplymacarons.ca`. If you need to change this:

1. Update the `CNAME` file in the `client/public` directory
2. Update all references to the domain in meta tags in `client/index.html`

## Technologies Used

- React.js + TypeScript
- Vite for building
- Tailwind CSS for styling
- Resend for email service
- Wouter for routing
- React Query for data fetching
- Framer Motion for animations