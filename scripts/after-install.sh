#!/bin/bash
cd /var/www/pipepay
sudo yarn
sudo cp /var/www/pipeconfigs/.env /var/www/pipepay/
sudo yarn run stage