rm -rf /tmp/wwwroot && cp -r Game/wwwroot /tmp
git checkout -f gh-pages
rm -rf *  && cp -r /tmp/wwwroot/* .
git add *
git commit -m "gh-pages"
git push
