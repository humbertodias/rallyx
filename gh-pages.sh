git checkout -b gh-pages
rm -v !("Game") && mv Game/wwwroot/* . && rm -rf Game 
git commit -m "gh-pages"
git push
