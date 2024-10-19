import re
from itertools import product

import serial
import socketio
from serial.tools import list_ports

# Constants
SERIAL_PORT = '/tmp/ttyV1'
BAUD_RATE = 115200
PRINTER_PORT = '/dev/ttyACM0'
SOCKET_IO_SERVER = 'http://localhost:5000'
DEFAULT_CURRENCY = "BGN"

# Regex pattern to capture product name and price

PRODUCT_PATTERN = r'([\w\s]+?)\s+(\d{1,3}\.\d{2})'



class OrderProcessor:
    def __init__(self):
        self.order_id = None
        self.currency = DEFAULT_CURRENCY
        self.price = None
        self.product_name = None
        self.sio = socketio.Client()
        self.setup_socket_io()
        self.serial_number = None
        self.warranty_until = None
        self.receipt_data_sent = False
        self.total_passed = False

    def setup_socket_io(self):
        @self.sio.event
        def connect():
            print("Connected to the server")

        @self.sio.on('message')
        def on_message(data):
            print(f"Message received: {data}")

        @self.sio.event
        def disconnect():
            print("Disconnected from the server")

        self.sio.connect(SOCKET_IO_SERVER)

    def process_line(self, line):
        clean_line = line.decode('utf-8').strip(' ').strip('\n')

        # print(clean_line)
        print(f"Processed line: \"{clean_line}\"")

        if 'Order number' in clean_line:
            print('1')
            self.order_id = clean_line.split('Order number:')[1].strip()
            self.reset_order_details()
        elif re.search(PRODUCT_PATTERN, clean_line):# and not self.product_name:
            print(2)
            result = re.search(PRODUCT_PATTERN, clean_line)
            self.product_name = result.group(1).strip()
            self.price = result.group(2)
            # Don't send data here, wait for warranty and serial number
        elif 'warranty' in clean_line.lower():
            print('3')
            self.warranty_until = clean_line.split(' ')[-1].strip()
        elif 'serial number:' in clean_line.lower():
            print('4')
            self.serial_number = clean_line.split(':')[-1].strip()
        elif 'total' in clean_line.lower():
            print(5)
            self.total_passed = True
        # Send data after processing all relevant information
        elif self.total_passed and self.order_id and self.product_name and self.price and not self.receipt_data_sent:
            print('here')
            if self.warranty_until is not None and self.serial_number is not None:
                self.send_data_with_warranty(self.order_id, self.price, self.product_name, self.warranty_until,
                                             self.serial_number)
                self.reset_order_details()
            else:
                self.send_data(self.order_id, self.price, self.product_name)
                self.reset_order_details()
            self.receipt_data_sent = True
        else:
            pass
            # print(f'product name {self.product_name} order id {self.order_id} price {self.price}')
        print(line)
        self.forward_to_printer(line)

    def reset_order_details(self):
        """ Resets all order-related fields except order_id """

        print('reset data')
        self.price = None
        self.product_name = None
        self.warranty_until = None
        self.serial_number = None
        self.receipt_data_sent = False
        self.total_passed = False


    def send_data(self, order_id, price, product_name):
        print(f'{order_id, price, product_name}')
        # if self.product_name and self.price:
        csv = ','.join(map(str, [order_id, self.currency, price, product_name]))
        print(f"CSV {csv}")
        self.sio.emit('message', csv)
    def send_data_with_warranty(self, order_id, price, product_name, warranty_until, serial_number):
        print(f'{order_id, price, product_name}')
        csv = ','.join(map(str, [order_id, self.currency, serial_number, warranty_until,  price, product_name]))
        print(f"CSV {csv}")
        self.sio.emit('message', csv)

    @staticmethod
    def forward_to_printer(line):
        # return
        try:
            with serial.Serial(PRINTER_PORT, BAUD_RATE, timeout=2) as printer:
                printer.write(line)
        except serial.SerialException as e:
            print(f"Error forwarding to printer: {e}")

def find_serial_port(port_hint):
    available_ports = list_ports.comports()
    for port in available_ports:
        if port_hint in port.device:
            return port.device
    return None

def main():
    serial_port = find_serial_port(SERIAL_PORT) or SERIAL_PORT
    print(f"Listening on {serial_port}...")

    processor = OrderProcessor()

    try:
        with serial.Serial(serial_port, BAUD_RATE, timeout=2) as ser:
            while True:
                if ser.in_waiting > 0:
                    line = ser.readline()
                    processor.process_line(line)
    except serial.SerialException as e:
        print(f"Error opening serial port: {e}")
    except KeyboardInterrupt:
        print("Program terminated by user")
    finally:
        processor.sio.disconnect()

if __name__ == "__main__":
    main()