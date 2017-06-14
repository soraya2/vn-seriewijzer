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




## Code Soraya

Css to the rescue

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

Web app from scratch

I made sure that the functions are doing 1 thing and put the code . In the example function i store comments in the database in the review object.
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


## Install guide

### Clone the repository


### To install the project run:

```
 npm install

```

### To run ngrok:
```
 npm run expose

```

### To run XO:

```
npm test
```

## Install guide

### Clone the repository


### To install the project run:

```
 npm install

```

### To run ngrok:
```
 npm run expose

```

### To run XO:

```
npm test
```
