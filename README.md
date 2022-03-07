# javascript-simplified

The home for all my code for the JavaScript Simplified course (found [here](https://courses.webdevsimplified.com)). The course is broken into small videos that cover various JavaScript topics, many of which are accompanied by activities and projects that reinforce the topics covered. Below is a list of links to each of the projects that I completed for this class.

## Client Only

These projects only have a client and don't require anything special to see in action. Just download the repository and open `index.html` in your browser!

-   [Build a working modal](/Section%206%20-%20Basic%20DOM/44-and-45-modal-project/) (lessons 44 and 45 in the Basic DOM section (Section 6))
-   [Build a Quiz App](/Section%207%20-%20Control%20Flow/54-and-55-quiz-app-project/) (lessons 54 and 55 in the Control Flow section (Section 7))
-   [Simple form validation](/Section%207%20-%20Control%20Flow/56-and-57-form-validation-project/) (lessons 56 and 57 in the Control Flow section (Section 7))
-   [Simple Expand/Collapse Mechanism](/Section%209%20-%20Advanced%20DOM/66-and-67-expand-collapse-project/) (lessons 66 and 67 in the Advanced DOM section (Section 9))
-   [Simple Google Maps Clone using MapBox](/Section%209%20-%20Advanced%20DOM/68-google-maps-clone/) (lesson 68 in the Advanced DOM section (Section 9))

## Client Only with Node Modules

These projects are still client-only projects, but they use the Parcel bundler to allow the app to use Node modules.

To run these projects, download the repository, open a terminal in the directory of the project you wish to run, and run `npm start`. The project will be available at `localhost:1234` once Parcel is ready.

-   [Custom Date Picker](/Section%2010%20-%20Modules%20and%20Bundlers/73-date-picker/my-solution) (lesson 73 in the Modules and Bundlers section (Section 10))
-   [Shopping Cart](/Section%2010%20-%20Modules%20and%20Bundlers/74-shopping-cart/my-solution) (lesson 74 in the Modules and Bundlers section (Section 10))
-   [Tooltip Library](/Section%2011%20-%20Bonus%20Projects/1-tooltip-library) (the first bonus project for the beginner course (Section 11))
-   [Trello Clone](/Section%2011%20-%20Bonus%20Projects/2-trello-clone) (the second bonus project for the beginner course (Section 11))

## Client and Server

These projects have both a client piece and a server piece. The client again uses the Parcel bundler to allow the app to use Node modules. The server in these apps does not have any kind of database component and acts only as a bridge between multiple clients using `socket.io`.

To run these projects, download the repository, and open two terminals, one in the `client` directory of the project you wish to run and one in the `server` directory.

In the `server` directory, run the command `npm start` to start the server.

In the `client` directory terminal, run the command `npm start` to start up Parcel. The client will be available at `localhost:1234` once Parcel is ready.

-   [Pictionary Clone](/Section%2011%20-%20Bonus%20Projects/3-pictionary-clone) (the third and final bonus project for the beginner course (Section 11))
