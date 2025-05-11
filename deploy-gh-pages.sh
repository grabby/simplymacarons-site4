#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create temporary directory for GitHub Pages
echo "Creating temporary directory for GitHub Pages..."
mkdir -p gh-pages

# Copy built files to the temporary directory
echo "Copying built files..."
cp -R dist/public/* gh-pages/

# Copy CNAME file
echo "Copying CNAME file..."
cp client/public/CNAME gh-pages/

# Copy 404.html file
echo "Copying 404.html file..."
cp client/public/404.html gh-pages/

# Add a README to the gh-pages branch
echo "# Simply Macarons Website - Built Version

This branch contains the built version of the Simply Macarons website.
The source code is available on the main branch.
" > gh-pages/README.md

echo "The website is now built and ready for GitHub Pages deployment!"
echo "To manually deploy, push the contents of the 'gh-pages' directory to the gh-pages branch."
echo "For GitHub Actions deployment, simply push to main branch and let the workflow handle it."