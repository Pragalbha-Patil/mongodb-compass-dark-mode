# MongoDB Compass Dark mode

Cut your eyes some slack by enabling Dark mode in MongoDB

## Installation

Prerequisites:

Make sure you've installed MongoDB Compass before running this script.

Other prerequisites include:
```bash
git wget
```

Run this command (On Linux) to enable dark mode

```bash
bash <(wget -qO- https://raw.githubusercontent.com/Pragalbha-Patil/mongodb-compass-dark-mode/main/install.sh)
```

## Help, the script doesn't work
Don't worry, I've added the app.asar (compressed) to this project itself, so incase the script doesn't work, just 

1. clone the repo, decompress the [app.asar.tar.gz](https://github.com/Pragalbha-Patil/mongodb-compass-dark-mode/blob/main/app.asar.tar.gz), you should have the original app.asar file.
2. Now that you have the file, now find out where mongodb-compass is installed by this command: ```which mongodb-compass``` (Note: Linux usually lists the symlink file and not the original directory, so when you find the location, cd there and do ```ls -al``` to find the OG location
3. Once you have that, cd to the OG location (In my case: It was at ```/usr/lib/mongodb-compass```)
4. then cd to its ```resources/``` directory (ex. ```/usr/lib/mongodb-compass/resources```) and replace the app.asar with downloaded app.asar (Remember to backup incase something goes wrong.)
5. That's it.

Inspiration: https://www.reddit.com/r/mongodb/comments/mj1zr0/successfully_achieved_darkmode_for_mongodb_compass/
