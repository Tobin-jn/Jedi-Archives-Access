# SWAPIBox

This project is a React App that is designed to challenge the developer to make a series of fetch calls to [SWAPI](https://swapi.co/), an unsecured api that is a programmatically accessible data source for all the data from the Star Wars canon universe. The developers/designers on this project are Kevin Simpson and Tobin Nelson.

SWAPIBox is an assigment from the front end engineering program at The Turing School of Software and Design in Denver, CO as a part of the third module. You can find the [project specs here](http://frontend.turing.io/projects/swapi-box.html). Most students working on this project have only been coding for sixteen-to-twenty three weeks using HTML5, CSS3, and JavaScript. React has only become a part of our skill set as of seven weeks ago.

Grabbing data from the api is uniquely challenging as a single fetch call will not give the user the data required from the spec. Calling a fetch on people will return most of the data required, but will also return promises that resolve to a url for certain properties, like planet names, residents, species, etc. This requires a series of fetch calls to be made via the .map() array prototype method. We elected to use ES7 syntax for this project with async and await instead of ES6 .then().

The app is throughly-tested utilizing enzyme and jest, employing mock function usage for fetch calls that return Promise.resolve(). 

Originally, we decided to approach the layout and design quite literally based on the project specs:
![img_4458 2](https://user-images.githubusercontent.com/29719272/46633198-3723ba80-cb0a-11e8-81b4-fd97f8abd265.jpg)

We imagined the movie crawl text from a random Star Wars film scrolling up the left side while users could access data relating to characters, vehicles, and planets from the series on the right. After a few days, this design felt not only dated, but was becoming an overwhelming theme throughout the class. Consequently, we stripped the layout down to the foundation and rebuilt it with a very specific theme: the user is role-playing a Jedi Master at some point during the established Star Wars film universe, and they are logging into a secure data interface that imparts a narrative connection sequence, a situation report (the random film crawl text), and a series of access points relaying information about people, places, and transports that are pertinent to their mission. Users can hover over cards to information and click on them to save them.

![swapi-narrative-wireframe](https://user-images.githubusercontent.com/29719272/47261186-1ef75800-d487-11e8-99f9-2d67bcb727c4.jpg)
![card-layout](https://user-images.githubusercontent.com/29719272/47261200-52d27d80-d487-11e8-9955-467a30e501ff.jpg)

All fetch calls and saved items are saved in local storage to reduce the need to repeated fetch calls.

This project additionally adds the challenge of applying React Router mid-stride for page navigation. This requires a great deal of refactoring and some headache, but is meant to mimic the real-world requirements of refactoring a product to include new tools and features.

![swapi-landing-page](https://user-images.githubusercontent.com/29719272/47258697-1b9aa700-d45c-11e8-9fbd-86580efa70e0.png)
![swapi-landing-login](https://user-images.githubusercontent.com/29719272/47258696-1b9aa700-d45c-11e8-8292-92c01e16f88d.png)
![swapi-briefing](https://user-images.githubusercontent.com/29719272/47258695-1b021080-d45c-11e8-8959-4a85bafdecda.png)

This is our loading screen, utilized whenever a fetch call to SWAPI is being made and resolved.

![swapi-loading](https://user-images.githubusercontent.com/29719272/47258698-1b9aa700-d45c-11e8-962d-ea500ab49cf1.png)

The following pages are where the fetched data can be viewed. Images are not provided by the api, so they were curated by the developers and are assigned via a helper object linking the names attached to data objects and a path to the image cooresponding to the person, place, or thing.

![swapi-people](https://user-images.githubusercontent.com/29719272/47258700-1b9aa700-d45c-11e8-8a92-44fbdfdc6c33.png)
![swapi-planets](https://user-images.githubusercontent.com/29719272/47258701-1b9aa700-d45c-11e8-8162-ba15fefe5cf4.png)
![swapi-saved](https://user-images.githubusercontent.com/29719272/47258703-1b9aa700-d45c-11e8-9661-2fa6f0565a84.png)
![swapi-vehicles](https://user-images.githubusercontent.com/29719272/47258704-1c333d80-d45c-11e8-85df-c34f5fa9e049.png)

The app is fully-responsive, and works equally well on wide-screen monitors all the way down to the iPhone 5s.

![swapi-responsive](https://user-images.githubusercontent.com/29719272/47258702-1b9aa700-d45c-11e8-8f29-40a8ead09ed7.png)
![swapi-modal](https://user-images.githubusercontent.com/29719272/47258699-1b9aa700-d45c-11e8-9dc8-39fb5f755f91.png)

We also did quite a bit of work with CSS transitions and animations, which is a bit of a challenge in React compared to working with the the normal, three-file html/css/js structure. All animations were created first in [CodePen](https://codepen.io/relasine/), then transferred over to the project.

![swapi-login-anim](https://media.giphy.com/media/5aY9I09OezXJ3Zr3Mi/giphy.gif)
![swapi-hamburger-anim](https://media.giphy.com/media/69lXqzxorVjBgWRixa/giphy.gif)
![swapi-card-anim](https://media.giphy.com/media/2wTcmj7e7flvdbOqct/giphy.gif)
![swapi-loading-anim](https://media.giphy.com/media/WvircmmZwI7zpzULEg/giphy.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



# Jedi Archives Access

A fully responsive site for Star Wars enthusiasts to explore characteristics of popular people, planets, and vehicles from the legendary film series.

### Background/About 
## 🎉 Awarded First Place at Turing Code Fair, October, 26, 2018 🎉

Jedi Archives Access allows a user to role-play as a Jedi Master at some point within the established Star Wars film universe. Upon arrival, a user logs into a secure data interface that initializes a narrative connection sequence. Upon login, the user is presented with a situation report (one of the opening film crawl texts, chosen at random), followed by a series of access points relaying information about people, places, and transports that are pertinent to their mission. Users can hover over cards to gather information and click on them to save them into a saved repository.

### See it Live

[Jedi Archives Access](https://www.example.com) on Heroku

### API's used

* SWAPI- The Star Wars API

### Primary JavaScript Technologies Used

* React
* React Router

### Screenshots

#### Landing Page:

![](image.jpg)

#### Persons:

<img src='Readme%20/People.png' >

#### Planets:

![alt text](Readme/People.png)

#### Vehicles:

![alt text](image.jpg)

#### Saved:

![alt text](image.jpg)

#### Additional Assets:

![swapi-card-anim](https://media.giphy.com/media/2wTcmj7e7flvdbOqct/giphy.gif)

### Setup
#### Frontend

Clone the repo

Run ```npm install``` from the root directory

Run ```npm start``` and visit localhost:3000 in your browser


### Test Driven Development

(Title of Site) uses Jest and Enzyme for frontend testing.

Run with ```npm test``` from the root directory

### Original Assignment

[SWAPIbox](http://frontend.turing.io/projects/swapi-box.html) from the Turing School of Software & Design

### Contributors

* Kevin Simpson: [Github Profile](https://github.com/relasine)
* Tobin Nelson: [Github Profile](https://github.com/Tobin-jn)


