# Deployment Instructions for Simply Macarons Website

## Pushing to GitHub

1. Create a new repository on GitHub (if you don't already have one)
2. Initialize git in this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Simply Macarons website"
   ```

3. Add your GitHub repository as a remote:
   ```bash
   git remote add origin https://github.com/yourusername/simplymacarons.git
   ```

4. Push the code to GitHub:
   ```bash
   git push -u origin main
   ```

## Setting up GitHub Pages

1. Go to your GitHub repository
2. Navigate to Settings > Pages
3. Under "Source", select "GitHub Actions"
4. Ensure your custom domain is set to "simplymacarons.ca"
5. Save your settings

## What Happens Next

1. The GitHub Action workflow will automatically run when you push to the main branch
2. It will build the project and deploy it to the gh-pages branch
3. GitHub Pages will serve the content from the gh-pages branch

## Troubleshooting

If the deployment fails:

1. Check the GitHub Actions logs for any errors
2. Ensure the CNAME file is correctly set with your domain
3. Verify your DNS settings are pointing to GitHub Pages

## Manual Deployment (if needed)

If you need to deploy manually:

1. Clone your repository
2. Run the build process:
   ```bash
   npm install
   npm run build
   ```

3. Run the deploy script:
   ```bash
   ./deploy-gh-pages.sh
   ```

4. This will create a `gh-pages` directory with the files ready for deployment
5. You can then push this directory to the gh-pages branch

## Updating Your Website

After deployment, whenever you want to update your website:

1. Make your changes to the code
2. Commit and push to the main branch
3. GitHub Actions will automatically deploy the changes