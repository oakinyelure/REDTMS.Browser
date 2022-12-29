## Introduction

The front end part of the REDTMS coding challenge at https://redtms-oakinyelure-web.azurewebsites.net/

## Tools and Technology

-   Angular 15
-   Typescript 4.8
-   Angular CLI
-   Bootstrap
-   Material UI for Angular
-   Karma Unit Testing Suite
-   NodeJS
-   RxJS

## Infrastructure

-   Github
-   Azure App Service

## Prerequisite for Local Instance

-   Node 16+

## How Tos

### Run Project with Terminal

-   CD to the project src directory and run `npm install`. This will install all the dependencies needed in the application
-   Run `npm test` to run Karma unit test. This will open a browser instance to display your test
-   Run `ng serve --open` to start the web app. You will need to run an instance of the backend or change the environment variable for the server URL. Using docker makes this faster

## Features

-   Ability to add new order
-   Ability to save a draft order and resume
-   Ability to batch delete an order
-   Ability to search both on the server and in-memory
-   Ability to filter by order type

## Project Information

-   CI/CD is at https://github.com/oakinyelure/REDTMS.Browser/blob/develop/.github/workflows/develop_redtms-oakinyelure-web.yml
-   App URL is at https://redtms-oakinyelure-web.azurewebsites.net/
-   Application uses the https://redtms-oakinyelure.azurewebsites.net web services
-   Unit tests are the .spec files
