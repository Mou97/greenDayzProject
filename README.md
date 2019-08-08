# greenDayzProject

Smart waste collection over MQTT protocol using Raspberry Pi, nodeJs and Mongodb.

---

## Requirements:

For development, you will need Node.js, Python3 installed in your environement.
for the database we used a free remote mongoodb instance provided by mLab
for the mqtt broker api key: cloudmqtt.com

## Installation:

Clone the project by running the command:

```bash
$ git clone https://github.com/Mou97/greenDayzProject.git
```

Navigate to the project's directory:

```bash
$ cd greenDayzProject
```

Install the project's dependencies by running:

```bash
$ npm install
```

## Configuring user informations:

Replace the database URL (the variable "db" in the file "config/database.js") with your personal one, visit mlab.com to get yours.

Replace the username and password (the varible mqtt in the file "config/mqttinfos.js") with your personal ones, visit cloudmqtt.com to get yours.

## Running the node server:

Run the server by:

```bash
$ npm start
```

## Running the python script on the raspberry:

```bash
$ python3 raspeberry_code.py
```

The server listens to requests on port `3000`.

Enter [localhost:3000](http://localhost:3000/) on your browser to open the project.
