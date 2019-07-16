import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt
import time
import json

mqtt_server = "postman.cloudmqtt.com"
topic = "sensors/sensor"

def on_connect(client , userdata , flags , rc):
    print("Connected with rc : "+ str(rc))
    # client.publish(topic,"first connection")


def on_publish(mosq , obj , mid):
    print("message sent with success")
    
# mqtt connection
client = mqtt.Client()

# set username and password
client.username_pw_set("wdvebxdg","QMlVLEusK9yU")

client.on_publish = on_publish
client.on_connect = on_connect

client.connect(mqtt_server,port=12313,keepalive=60)

client.loop_start()

# fill the variables with results of the sensors
value1 = 100 #sensor 1
value2 = 66 #sensor 2
value3 = 78 #sensor 3

while True : 
    # structure the data
    msg = {
        "sensor1" : value1,
        "sensor2" : value2,
        "sensor3" : value3
    }
    # convert the data to JSON
    data = json.dumps(msg)

    # send to the broker
    client.publish(topic,str(data))
    time.sleep(1*60)