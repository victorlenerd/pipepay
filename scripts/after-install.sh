#!/bin/bash
cd /var/www/pipepay
sudo yarn
sudo yarn run stage
sudo cp /var/www/pipeconfigs/.env /var/www/pipepay/