#!/bin/bash

ln -s /home/pacman/git-repos/pacman/pacman.service /lib/systemd/system/pacman.service
systemctl enable pacman.service
systemctl start pacman.service