#!/bin/bash

# Simple deployment script for GitHub Pages

echo "Deploying to GitHub Pages..."

# Variables
REPO_URL="https://github.com/grabby/simplymacarons-site4.git"
BRANCH="main"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install git and try again."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Git repository initialized."
fi

# Add all files
git add .

# Commit changes
echo "Enter commit message (e.g. 'Update site content'):"
read commit_message
git commit -m "$commit_message"

# Check if remote exists, if not add it
if ! git remote | grep -q "origin"; then
    git remote add origin $REPO_URL
    echo "Remote origin added."
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin $BRANCH

echo "Deployment complete! Your site will be available at https://simplymacarons.ca once GitHub Pages builds it."