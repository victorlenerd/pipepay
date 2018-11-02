#!/bin/bash
cd /var/www/pipepay
pm2 kill
pm2 start dist/server.js