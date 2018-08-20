#!/bin/bash

# build docs
webpack --config webpack.prod.js
git add -f --all docs/*

# remove all except docs
ls | grep -viE '(docs)|(node_modules)' | xargs rm -r
mv docs/* ./ && rm docs -rf

# create branch hg-pages
git branch -f gh-pages
git checkout gh-pages

# commit and push to repo
ls | grep -viE '(node_modules)' | xargs git add -f
git commit -am deploy
git push -fu origin gh-pages

# reset to master
git reset --hard origin/master && git checkout master