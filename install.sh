#!/bin/bash
cd ~
git clone https://github.com/Pragalbha-Patil/mongodb-compass-dark-mode.git
cd mongodb-compass-dark-mode/
npx asar pack ./ app.asar.new
sleep 10
sudo cp app.asar.new /usr/lib/mongodb-compass/resources/
cd /usr/lib/mongodb-compass/resources/
sudo mv app.asar app.asar.old
sudo mv app.asar.new app.asar
cd ~
echo "---------------------------------------------------------"
echo "Done. Restart MongoDB Compass to see dark mode in effect."
echo "---------------------------------------------------------"
