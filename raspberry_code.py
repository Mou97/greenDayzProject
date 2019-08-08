#!/usr/bin/python 
#Libraries 
import RPi.GPIO as GPIO 
import lcdlib as lcd 
import time 
import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt
import json 

mqtt_server = "postman.cloudmqtt.com"
topic = "sensors/sensor"

def on_connect(client , userdata , flags , rc):
    print("Connected with rc : "+ str(rc))
    # client.publish(topic,"first connection")


def on_publish(mosq , obj , mid):
    print("message sent with success")
    
# mqtt connection


#Disable warnings 
GPIO.setwarnings(False) 
 
#Pins numbers (Broadcom Soc channel pins numbers mode) 
GPIO.setmode(GPIO.BCM) 
 
ECHO_1 = 24 
ECHO_2 = 12 
ECHO_3 = 20 
 
TRIG_1 = 23 
TRIG_2 = 25 
TRIG_3 = 16 
 
#Define pins as INput/OUTput 
GPIO.setup(ECHO_1,GPIO.IN) 
GPIO.setup(ECHO_2,GPIO.IN) 
GPIO.setup(ECHO_3,GPIO.IN) 
GPIO.setup(TRIG_1,GPIO.OUT) 
GPIO.setup(TRIG_2,GPIO.OUT) 
GPIO.setup(TRIG_3,GPIO.OUT) 
 
####################### SENSOR 1 ########################## 
def distance_1(): 
    print("Mesure de distance 1 en cours ...") 
    #waiting for sensor to settle 
    GPIO.output(TRIG_1,False) 
    time.sleep(2) 
     
    #Set trigger pin high for 10uS 
    GPIO.output(TRIG_1,True) 
    time.sleep(0.00001) 
     
    #Set trigger pin low  
    GPIO.output(TRIG_1,False) 
     
    #Record the last low timestamp for Echo 1 
    while GPIO.input(ECHO_1) == False : 
        pulse_start_1 = time.time() 
    #Record the last high timestamp for Echo 1    
    while GPIO.input(ECHO_1) == True : 
        pulse_end_1 = time.time() 
 
     
    pulse_duration_1 = pulse_end_1 - pulse_start_1 
    #speed = distance/duration 
    #duration = pulse_duration/2 (we need only the duration to the object) 
    #speed of sound = 343 m/S = 34300 cm/S 
    distance_1= (pulse_duration_1 * 34300)/2 
    #round the distance to 2 decimal 
    distance_1 = round(distance_1,2) 
    print("Distance 1:",distance_1,"cm") 
 
    return distance_1 
 
######################### SENSOR 2 ######################### 
def distance_2(): 
    print("Mesure de distance 2 en cours ...") 
    #waiting for sensor to settle 
    GPIO.output(TRIG_2,False) 
    time.sleep(2) 
 
    #Set trigger pin high for 10uS 
    GPIO.output(TRIG_2,True) 
    time.sleep(0.00001) 
     
    #Set trigger pin low  
    GPIO.output(TRIG_2,False) 
     
    #Record the last low timestamp for Echo 2 
    while GPIO.input(ECHO_2) == False : 
        pulse_start_2 = time.time() 
    #Record the last high timestamp for Echo 2    
    while GPIO.input(ECHO_2) == True : 
        pulse_end_2 = time.time() 
 
 
    pulse_duration_2 = pulse_end_2 - pulse_start_2 
    #speed = distance/duration 
    #duration = pulse_duration/2 (we need only the duration to the object) 
    #speed of sound = 343 m/S = 34300 cm/S 
    distance_2= (pulse_duration_2 * 34300)/2 
    #round the distance to 2 decimal 
    distance_2 = round(distance_2,2) 
    print("Distance 2:",distance_2,"cm") 
 
    return distance_2 
 
############################ SENSOR 3 ###################### 
def distance_3(): 
    print("Mesure de distance 3 en cours ...") 
    #waiting for sensor to settle 
    GPIO.output(TRIG_3,False) 
    time.sleep(2) 
 
    #Set trigger pin high for 10uS 
    GPIO.output(TRIG_3,True) 
    time.sleep(0.00001) 
     
    #Set trigger pin low  
    GPIO.output(TRIG_3,False) 
    #Record the last low timestamp for Echo 3 
    while GPIO.input(ECHO_3) == False : 
        pulse_start_3 = time.time() 
    #Record the last high timestamp for Echo 3   
    while GPIO.input(ECHO_3) == True : 
        pulse_end_3 = time.time() 
 
         
    pulse_duration_3 = pulse_end_3 - pulse_start_3 
    #speed = distance/duration 
    #duration = pulse_duration/2 (we need only the distance to the object 
    #speed of sound = 343 m/S = 34300 cm/S 
    distance_3= (pulse_duration_3 * 34300)/2 
    #round the distance to 2 decimal 
    distance_3 = round(distance_3,2) 
    print("Distance 3:",distance_3,"cm") 
 
    return distance_3     
         
############### LCD display ##################### 
 
#initialize lcd pins 
lcd.init(26,19,13,6,5,11,16) 
# 80 : Hexadecimal code use to force cursor to beginnig at first line  
LCD_LINE_1 = 0*80 
 
#////////////////////# 
while True : 
    client = mqtt.Client()

    # set username and password
    client.username_pw_set("wdvebxdg","QMlVLEusK9yU")

    client.on_publish = on_publish
    client.on_connect = on_connect

    client.connect(mqtt_server,port=12313,keepalive=60)
    client.loop_start()

    max_dist = 20 
    min_dist = 2 
     
    dist_1 = distance_1() 
    print("Volume 1:",round((100 - ((dist_1 - min_dist)/(max_dist - min_dist) * 100)),0),"%") 
    n1 = round((100 - ((dist_1 - min_dist)/(max_dist - min_dist) * 100)),0) 
    vol_1=str(int(n1))+'%' 
    time.sleep(1) 
     
    dist_2 = distance_2() 
    print("Volume 2:",round((100 - ((dist_2 - min_dist)/(max_dist - min_dist) * 100)),0),"%") 
    n2 = round((100 - ((dist_2 - min_dist)/(max_dist - min_dist) * 100)),0) 
    vol_2=str(int(n2))+'%' 
    time.sleep(1) 
     
    dist_3 = distance_3() 
    print("Volume 3:",round((100 - ((dist_3 - min_dist)/(max_dist - min_dist) * 100)),0),"%") 
    n3 = round((100 - ((dist_3 - min_dist)/(max_dist - min_dist) * 100)),0) 
    vol_3=str(int(n3))+'%' 
    time.sleep(1) 
    print("ready to send data")
    msg = {
        "sensor1" : vol_1,
        "sensor2" : vol_2,
        "sensor3" : vol_3
    }
    # convert the data to JSON
    data = json.dumps(msg)
    print(str(data))
    client.publish(topic,str(data))
    
    #the line to be displayed on LCD 
    lcd.set_line(LCD_LINE_1) 
    lcd.string(vol_1+' '+vol_2+' '+vol_3,LCD_LINE_1) 
    #test if there is changements every 3 min  
    

    time.sleep(60) 
     
    #clear the LCD              
    lcd.clear()             
                          
                     
    time.sleep(1) 
#//////////////////////////# 
     
#restart all IN/OUT put                         
GPIO.cleanup() 
