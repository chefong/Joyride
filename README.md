
<h1 align="center"
<br>
<p align="center"><img src="./frontend/src/assets/hex_redone.png" width="35%"/></p>
<br>
Joyride
<br>
</h1>
<h4 align="center">Carpooling with friends has never been easier.</h4>

## Demo
(Coming soon)

## Inspiration
There's always difficulty in organizing rides in large groups.

As the driver, who do I pick up first?
When should I let them know that I am nearby?

Joyride is our ride-sharing solution to these problems.

## About
Joyride takes a start point, an end point, and three stop points. Given this data, Joyride uses the Google Maps API to calculate the most effecient route. This is done by calculating every possible route, and then returning the route that takes the least amount of time to complete. Joyride also allows you to text your friends when you've arrived at their house using the Twilio SMS API

## Key Features
* Given start point, endpoint, and three interim points, returns the fastest route
* Texts each user the driver's current ETA to their house
* Enables users to text when arrived w/ Twilio SMS API
* Mobile support

## Built with 
* React
* Flask
* Google Maps API
* Twilio API

## To-do
* Allow trips to be scheduled for the future
* Add feature to allow drivers to let users know if there is a change to ETA

## Team

![](https://...Dark.png)            |  ![](https://...Dark.png) | ![](https://...Ocean.png)        |![](https://...Ocean.png)      
:--------------------------------------:|:-------------------------:|:--------------------------------:|:---------------------:
[Aditya Acharya](github.com/adialachar) |  [Eric Ong](github.com/ericong18)| John Shin                        | Joshua Sun
