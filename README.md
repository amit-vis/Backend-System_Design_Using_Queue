## System architecture

+-----------+        HTTP         +-------------+        +-----------+
|           +-------------------->+             +------->+           |
|  Client   |                     |  Server     |        | MongoDB   |
|           +<--------------------+             +<-------+           |
+-----------+       Response      +-------------+        +-----------+
                                        |                        
                                        |                        
                                        V                        
                                 +-------------+                
                                 |             |                
                                 |  RabbitMQ   |                
                                 |             |                
                                 +------+------+
                                        |
                                 +------v------+
                                 |             |
                                 |  services/  |
                                 |requestPro   |
                                 | cessor      |
                                 |             |
                                 +-------------+
                                        |
                                        v
                                 +-------------+
                                 |             |
                                 | Monitoring  |
                                 | (Prometheus |
                                 |   & Grafana)|
                                 |             |
                                 +-------------+


I have user MVC frame work to complete this project

## Installation

Install my-project with npm

```bash
  git clone https://github.com/amit-vis/Backend-System_Design_Using_Queue.git
  npm install
  cd Backend-System_Design_Using_Queue
```
    
## Running Tests

To run tests, run the following command

```bash
  npm start
```

## Endpoints and Actions:
/user/create[post]: Create a new user
/user/login[post]: Signin into existing account,
/request/enqueue[post]: send the request to the server
/metrics/metrics[get]: get the report of the system and moniter how our request get resolved


## Folder Structure


* config
    - database.js
    - errorHandler.js
    - logger.js
    - monitoring.js
    - passport.js
* controllers
    - request_controller.js
    - users_controller.js
* model
    - request.js
    - users.js
* routes
    - metrics.js
    - index.js
    - request.js
    - user.js
* services
    - metrics.js
    - queueService.js
    - requestProcessor.js
- .gitignore
- index.js
- package-lock.json
- package.json
