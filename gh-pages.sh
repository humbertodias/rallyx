cp -r Game/wwwroot /tmp && rm -rf * && cp -r /tmp/wwwroot/* .
git checkout gh-pages
git commit -m "gh-pages"
git push
