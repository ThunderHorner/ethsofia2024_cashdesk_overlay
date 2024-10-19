#!/bin/bash

# Activate the virtual environment
#!/bin/bash

# Open the first tab and run the first command
gnome-terminal --tab --title="Init Virtual Ports" -- bash -c "/home/thunderhorn/PycharmProjects/ethsofia2024_cashdesk_overlay/bin/python python_scripts/ws_server.py; exec bash"

# Open the second tab and run the second command in the same terminal window
gnome-terminal --tab --title="Run Script" -- bash -c "./run.sh; exec bash"
