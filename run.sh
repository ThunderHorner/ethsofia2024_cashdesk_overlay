#!/bin/bash

cleanup() {
    echo "Stopping all services..."
    kill $cashdesk_pid  $electron_pid $ws_server_pid $serial_proxy_pid
    wait $cashdesk_pid $electron_pid $ws_server_pid $serial_proxy_pid 2>/dev/null
    echo "All services stopped."
}

trap cleanup EXIT

echo "Starting services..."

# Start the cashdesk-overlay service
cd cashdesk-overlay && npm start &
cashdesk_pid=$!
if [ -z "$cashdesk_pid" ]; then
    echo "Failed to start cashdesk-overlay."
    exit 1
fi

# Start the Electron app
electron . &
electron_pid=$!
if [ -z "$electron_pid" ]; then
    echo "Failed to start Electron."
    exit 1
fi

# Start the WebSocket server
#python python_scripts/ws_server.py &
#ws_server_pid=$!
#if [ -z "$ws_server_pid" ]; then
#    echo "Failed to start WebSocket server."
#    exit 1
#fi

# Start the serial proxy server
python python_scripts/serial_proxy.py &
serial_proxy_pid=$!
if [ -z "$serial_proxy_pid" ]; then
    echo "Failed to start serial proxy."
    exit 1
fi

echo "All services started successfully."

# Wait for all services to complete or stop
wait
