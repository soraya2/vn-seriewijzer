# Vrij Nederland seriewijzer

## Introduction
In this project we are working for the Dutch company 'Vrij Nederland'. This is a company that creates monthly magazines. These magazines are filled articles about everything that is happening in the Netherlands.
This fall, they want to release a series guide, just like the Detective and Thriller guide they released this july. They made a list with lots of series (Dutch or English) and are going to write a review about them. These are meant to tell people what series are approved, and more important, are suitable for them.

The task we got with this project, is to create a website for this guide. A website that will let you search through the data, in a fun way. The website should be mobile first, because our target audience is a bit younger. Most of them will be sitting in the train when they are going to search for a serie to watch. On the road they will have free time, to do stuff like this. And this is why the design has to be mobile first.

## Our concept
We came up with a view concepts for this assignment and found a way to merge most of these concepts into one big concept. The core of the concept is to use someones personal traits.

The idea is that when you log in, you will answer three questions. Who are you, what are your hobby's and what do you want. This will make the basic searching a bit more exciting, each trait is connected to a list of series.

Each serie contains a review and rating that is written by Vrij Nederland. Also it will contain a rating that will be given by other users of the website. Users are allowed to comment on a serie, with something like "***This serie is amazing, the review is totally right, a MUST WATCH serie***". Also people can comment on other peoples comments. To say something about the other comment. For example someone can comment on the comment above "***I don't agree with you, the serie is good, but I wouldn't call it amazing yet. Maybe with the next season I will change my mind***".

Also the website will contain a diffent way to get to the best suited series for people, which will be a tournament. The user will see 4 series and has to rank these series from 1 to 4. He will do this 4 times, after that, he will see all the first choices he made. Those choices have to be ranked from 1 to 4 again. Based on these results, a top 5 will be created, based on these series.

## Demo
[insert herokuapp here]()

## Features
#### Facebook Login
The user is asked to log in with their Facebook account to access specific features like the Persona Check, the Series Game and commenting on series.

#### Commenting
Users can view a series page and leave comments for others to see. By allowing this form of user engagement, new users can get real user feedback about a show.

#### Persona Check
The Persona Check is an integral part of the application. Users log in with their Facebook account and answer a set of questions. The results of this questionnaire attaches several 'tags' to the user's profile that correspond with certain persona's. Some example personas would be:

* Animal lover
* Daredevil
* Girly Girl
* Sports fanatic
* Intellectual
* Geeky Nerd

The user will be provided a list of suggested series, fitting the user's persona.

#### The Series Game
The Series Game is a fun way to discover new series.

##### How it works:
- A list of 4 series is shown to the user.
- By clicking on the image, the details page of that show will be shown, allowing the user to read the show description, see trailers, check screenshots and see ratings (from IMDB).
- The user will rank the 4 series by number, 1 to 4, then continues to the next 4 series.

This process repeats for 4 times and finally end up on the overview screen that displays the user's top 4 shows, and a list of shows that might be of interest to the user, based on the highest rated shows in the game.

## Wishlist
- [ ] Recommendations based on which tv shows your Facebook friends watch.
- [ ] User profile.
- [ ] Feature to add tv shows to your list, to mark tv shows as 'seen' or 'watching now'.
- [ ] Sending tv shows to Facebook friends.

## Code conventions
- Templating engine: EJS (keep most of the logic outside of the html).
- Tab/ 4 spaces
- Variable says what it does, and is as short as possible
- Function: Each function handles one thing
- No jQuery of other frameworks/libraries
- Comment your code when needed
- When 2 people have worked in the same file: Mark the code with BEGIN and END with your name comments. Place your code inbetween.
- Write all code and comments in English
- Only use single quotes in JavaScript
- No inline css styles
- No inline javascript
- Always use camelcase
- One css file per module or feature. Later this will be merged to one big fill
- Work modulair
- Seperate classes with dashes (-)

## Coders
### Soraya
#### Css to the rescue
I made use of the latest features by making use of css grid.

```
 .header-nav {
     display: grid;
     grid-template-columns: 1.2fr 2fr;
     align-items: center;
     margin-bottom: 2em;
     color: #333333;
     border-bottom: 1px solid #ECECEC;
     @media screen and (max-width: 40em) {
         grid-template-columns: 1fr;
         text-align: center;
     }
     h2 {
         color: inherit;
         @media screen and (min-width: 40em) {
             order: 1;
         }
     }
 }

```

#### Web app from scratch
I made sure that the functions are doing 1 thing and put the code . In the example function i store comments in the database in the review object.

See more at: https://github.com/soraya2/vn-seriewijzer/blob/master/routes/detail.js

```
 function commentsToDatabase() {

     reviewsSchema.findOneAndUpdate({ "review.seriesName": seriesName }, {

         "$addToSet": {
             "comments": comm
         }
     }, { upsert: true }, function(err, document) {

         if (err) {
             return console.log(err);
         }
     });
}
```

I also kept my code dry by using loops and used an IIFE to make sure that the variables can’t be overwritten by scripts outside this scope.

See more at: https://github.com/soraya2/vn-seriewijzer/blob/feature-persona-check/public/javascripts/persona-steps.js

```
 (function() {
     "use strict";

         function nextStep(e) {
             e.preventDefault();

             switch (count) {

                 case 1:
                     personaSteps[0].classList.add('hide');
                     personaSteps[count].classList.remove('hide');

                     break;

                 case 2:
                     personaSubmit.className = ' submit-persona';
                     personaButton.classList.add('hide');

                     for (index = 0; index < personaSteps.length; index++) {
                         personaSteps[index].classList.add('hide');
                     }

                     personaSteps[count].classList.remove('hide');
                     break;
             }

             return personaSteps[count++];
         }

         personaButton.addEventListener('click', nextStep);
     }
 }());
```

### Chanel
#### Webapp from Scratch

#### CSS to the rescue

#### Browser Technologies

#### Real Time Web

### Shyanta
#### Webapp from Scratch

#### CSS to the rescue

#### Browser Technologies

#### Performance Matters

### Tristan
#### Webapp from Scratch

#### CSS to the rescue

#### Browser Technologies

#### Performance Matters

## Install guide
### Packages
- [Path](https://www.npmjs.com/package/path)
- [Express](https://www.npmjs.com/package/express)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser)
- [Body Parser](https://www.npmjs.com/package/body-parser)
- [Less Middleware](https://www.npmjs.com/package/less-middleware)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express Session](https://www.npmjs.com/package/express-session)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Passport](https://www.npmjs.com/package/passport)
- [Socket.io](https://www.npmjs.com/package/socket.io)

### Clone the repository
**The env file isn't added to the repo. If you want this repo to work you need to add an env file with the following information:
- The port number
- MongoDB user
- Facebook key
- Facebook secret
- Facebook callback
- MongoDB database link**

To clone this repo, run this code in the terminal:
```
$ git clone https://github.com/soraya2/vn-seriewijzer.git
```

To install all the packages run:
```
$ npm install

```
To temporarily make the website public, run:
```
$ npm run expose

```
To run XO:
```
$ npm test
```

### How to Build

## Known Bugs

## License
MIT/X11.
