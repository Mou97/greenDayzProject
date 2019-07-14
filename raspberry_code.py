import machine
from umqtt.simple import MQTTClient
mqtt = MQTTClient(
    ubinascii.hexlify(machine.unique_id()), 
    
"postman.cloudmqtt.com", 
    port=12313, 
    user="wdvebxdg", 
    password="QMlVLEusK9yU", 
    ssl=True
)
mqtt.publish('sensors/sensor', str(sensor_value).encode())