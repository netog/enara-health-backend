# Enara-Health Backend test
>Backend RESTful API for time tracker projects build in Node.js using Express.js & MongoDB

## Install all Dependencies
```
npm i
```
## Configure 
Edit file `config/config.env` to change configuration values. It is needed to change the DB_URI parameter 
to connect to a running instance of MongoDB. (Tested with 5.0.3 Community)

## Run
```
npm start
```

## Endpoint description
There are four endpoint created for the challenge:
1. GET - /api/v1/projects
    * Return total list of closed projects with total time in minutes for each project
    * If no projects are found return value `success=false`is sent
1. GET - /api/v1/projects/:name
    * Return total segments of closed project of name=`name` (parameter sent in request)
    * If no project is found  return value `success=false` is sent
1. POST - /api/v1/projects/start
    * Sets start time for project with `name` (parameter sent in request: body)
    * If project is already is open state, error code 404 is returned
1. POST - /api/v1/projects/stop
    * Sets stop time for project with `name` (parameter sent in request: body)
    * If project is already in closed state or if no project was started before with same `name` value,
    error code 404 is returned

## Test
For testing purposes, launch the banckend server: `npm start`
Launch the test application: `npm test`

### Test strategy
Using frameworks: mocha and supertest.
Strategy: Simple call of API rest functions to test general logic and error catches. 
* Start time of PROJECT1
* Start time of PROJECT2
* Start time of PROJECT3
* Start time of PROJECT1 to verify error condition
* Stop time of PROJECT1
* Stop time of PROJECT2
* Stop time of PROJECT2 to verify error condition
* Return report of all closed projects
* Start time of PROJECT1
* Stop time of PROJECT1
* Return report of PROJECT2 with 2 segments