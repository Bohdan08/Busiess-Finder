# Business Finder

=====================================================================================

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://bmo-business-finder.herokuapp.com/)
[![Live Backup Demo](https://img.shields.io/badge/demo-online-green.svg)](https://business-finder.vercel.app/)

![Preview](https://res.cloudinary.com/koruja/image/upload/v1618079730/businessfinder_vqri3p.png)

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Demo](#demo)
- [Other](#other)

## General info

This is a Front-End application created with ReactJs that searches for existing businesses by the given location
via Yelp API.

## Technologies

Project is created with:

- ReactJs
- Redux
- NextJs
- Tailwind CSS

## Setup

Clone this repo to your desktop and run npm install to install all the dependencies.

## Usage

After you clone this repo to your desktop, go to its root directory and run npm install to install its dependencies.

Once the dependencies are installed, you can run npm run dev to start the application. You will then be able to access it at localhost:3000

## Demo

You can visit the app by the following links:

- https://business-finder.vercel.app/
- https://bmo-business-finder.herokuapp.com/
## Other

Be aware that Yelp API doesn't support CORS policy, therefore you're encoureged to visit https://cors-anywhere.herokuapp.com/corsdemo in order to access the full funcitonality of the application.

Also, you can make only up to 50 requests within an hour.

Yelp APIs used:

- /businesses/search
- /autocomplete
