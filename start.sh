#!/bin/bash

python /home/pacman/git-repos/pacman/controller.py &
#xdg-open "http://localhost:8080/"
chromium-browser --kiosk "http://localhost:8080/"