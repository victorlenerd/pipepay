#!/bin/bash
cd /var/www/pipepay
forever stopall
forever start dist/server.js