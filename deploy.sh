#!/bin/bash

# build docs
webpack --config webpack.prod.js

# remove all except docs
shopt -s extglob && rm -r -- !(docs)
mv docs/* ./ && rm docs -rf

# create branch hg-pages
git branch -f gh-pages

# commit and push to repo
git add -f --all
git commit -am deploy
git push -fu origin gh-pages

# reset to master
git reset --hard master