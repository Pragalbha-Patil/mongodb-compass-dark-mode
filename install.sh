#!/bin/bash
cd ~
git clone https://github.com/Pragalbha-Patil/mongodb-compass-dark-mode.git
cd mongodb-compass-dark-mode/
tar -xf app.asar.tar.gz &
BACK_PID=$!
while kill -0 $BACK_PID ; do
    echo "Decompressing the new app.asar. Please wait..."
    sleep 10
done
# fixed the deletion of backup, thanks to: https://github.com/Pragalbha-Patil/mongodb-compass-dark-mode/issues/1
sudo mv /usr/lib/mongodb-compass/resources/app.asar /usr/lib/mongodb-compass/resources/app.asar.old
sudo mv app.asar /usr/lib/mongodb-compass/resources/
cd ~
rm -rf mongodb-compass-dark-mode/
echo "---------------------------------------------------------"
echo "Done. Restart MongoDB Compass to see dark mode in effect."
echo "---------------------------------------------------------"
