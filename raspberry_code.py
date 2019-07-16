
import paho.mqtt.client as client
# connect to the mqtt client
mqtt = client(
"mqtt://postman.cloudmqtt.com", 
    port=12313, 
    user="wdvebxdg", 
    password="QMlVLEusK9yU", 
    ssl=True
)
# reading class
class Reading(object):
    sensor_1 = 0
    sensor_2 = 0
    sensor_3 = 0

def reading_value( value1 , value2 , value3 ):
    value = Reading()
    value.sensor_1 = value1
    value.sensor_2 = value2
    value.sensor_3 = value3
    return value

#example for each reaing
sensor_value = reading_value(15, 70 , 55 )

# sensor_value is the variable which contains a single reading

mqtt.publish('sensors/sensor', str(sensor_value).encode())