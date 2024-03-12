#!/bin/sh

# Wait for MySQL to be available
if [ ! -f /wait-for-it.sh ]; then
    echo "wait-for-it.sh not found!" >&2
    exit 1
fi

# Start MySQL waiter
/wait-for-it.sh database:3306 -- npm start