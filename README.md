# sogang-space
## Information
URL : ec2-13-209-35-182.ap-northeast-2.compute.amazonaws.com

## Requirements
### Programs
* nodejs
* nodejs-legacy
* npm
* postgreSQL

### Node Packages
* express
* pm2 (process manager)
* pg (postgreSQL)

### Exist URL
* /banggu, /banggu/home
* /banggu/browse
* /banggu/browse/detail

## Our Services
### Motivation

### Goal
By collecting class room environmental information:
* Find the the ```most comfortable and available class room``` to hold meeting for ```student```
* Provide ```visualise tool``` for ```school administrators``` to maintain and take care the school facilities without actual visit

### Services
#### Mobile service
* Find the the ```most comfortable and available class room```
* Provides the room enviroment and facility informations

#### Web Dashboard
* Provides ```visualise tool``` for ```school administrators```
* Visualise the available information by each building, floor and class room

### How it works
1) Fetch data from each class room
* Temperature and Humidity (DHT22)
* Temperature (DS18B20)
* CO2 (MH-Z14A)
* Particle Matters (SDS011)
* Door Open (PIR)

2) Send to our server and collect data in our Database

3) Evaluate
We evaluate mainly two things using environmental data that we've collect
* Score of the room environment (Degree of discomfortness, CO2, PM10)
* People Existence

4) Service
We give these information using two different services
* Mobile service: For those who finds available classroom to use
* Web Dashboard: For those who manage building and classroom

### How it looks
#### Mobile Service

* Main page

<img width="305" alt="home_1" src="https://user-images.githubusercontent.com/28967089/41187337-d2471080-6be1-11e8-8ec6-63d9a224f129.png"> <img width="303" alt="home_2" src="https://user-images.githubusercontent.com/28967089/41187338-d270a0a8-6be1-11e8-8f57-7d5ea0943e3e.png">


* Browse page

<img width="305" alt="browse_1" src="https://user-images.githubusercontent.com/28967089/41187328-d0ca79ae-6be1-11e8-9031-9a8bbd9db643.png"> <img width="306" alt="browse_2" src="https://user-images.githubusercontent.com/28967089/41187329-d0f3a70c-6be1-11e8-876f-900ed194ce30.png">

<img width="305" alt="browse_3" src="https://user-images.githubusercontent.com/28967089/41187330-d11edf76-6be1-11e8-9931-100047742afb.png">


* Detail page

<img width="307" alt="detail_1" src="https://user-images.githubusercontent.com/28967089/41187331-d14b79c8-6be1-11e8-8b89-6b54aa2f44c7.png"> <img width="307" alt="detail_2" src="https://user-images.githubusercontent.com/28967089/41187332-d1755aae-6be1-11e8-9926-3d0dab806168.png">

<img width="305" alt="detail_3" src="https://user-images.githubusercontent.com/28967089/41187333-d1a0b578-6be1-11e8-91d8-26f660f63ce7.png"> <img width="307" alt="detail_4" src="https://user-images.githubusercontent.com/28967089/41187334-d1c99a06-6be1-11e8-903c-3a7a862b734d.png">

<img width="308" alt="detail_5" src="https://user-images.githubusercontent.com/28967089/41187335-d1f23c2c-6be1-11e8-8ae9-f33a7cbfc8f9.png"> <img width="308" alt="detail_6" src="https://user-images.githubusercontent.com/28967089/41187336-d21cc640-6be1-11e8-8f4a-d4a2b602d568.png">

#### Web Dashboard

