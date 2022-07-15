# game for blind people
phaser.js+howler.js

On some unknown land, The more powerful the magic the worse the vision will be, the most powerful magician can not see the physical world. But after a certain day, the devil took away the magical power of the magicians, magic suddenly disappeared from this land, no one remembered that magic had ever blessed this land, and the magicians all became ordinary people with visual impairment. In this background, our story begins...


## it's running at https://agile-peak-94217.herokuapp.com/
If no one is on, it takes a few seconds for the free server to spin up. The demo shows a new square per user and sync the location of all users. No player controls yet. 
##  -----------to compile and run---------------------
npm run build-front<br />
npm run build-back<br />
npm run start-server (or 'heroku local web' is using heroku)<br />

## -----------to deploy to heroku---------------------
sign up at heroku.com<br />
install heroku cli<br />

then <br />
git init<br />
git commit -m 'first commit'<br />
heroku create your-appname-here (just make one up)<br />
git push heroku main (or master)<br />
(later, just do 'npm run deploy')<br />