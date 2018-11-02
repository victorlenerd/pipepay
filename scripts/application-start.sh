#!/bin/bash
cd /var/www/pipepay
forever stopall
forever dist/server.js