# javascript-simplified

The home for all of my code for the [JavaScript Simplified course](https://courses.webdevsimplified.com) created by [Web Dev Simplified](https://www.youtube.com/webdevsimplified). The course is broken into small videos that cover various JavaScript topics, many of which are accompanied by activities and projects that reinforce the topics covered. Below is a list of links to each of the projects that I completed for this class.

## Client Only

These projects only have a client and don't require anything special to see in action. Just download the repository and open `index.html` in your browser!

### Beginner Course (found in the `beginner-course` directory)

-   [Build a working modal](/beginner-course/Section%206%20-%20Basic%20DOM/44-and-45-modal-project/) (lessons 44 and 45 in Section 6 - Basic DOM)
-   [Build a Quiz App](/beginner-course/Section%207%20-%20Control%20Flow/54-and-55-quiz-app-project/) (lessons 54 and 55 in Section 7 - Control Flow)
-   [Simple form validation](/beginner-course/Section%207%20-%20Control%20Flow/56-and-57-form-validation-project/) (lessons 56 and 57 in Section 7 - Control Flow)
-   [Simple Expand/Collapse Mechanism](/beginner-course/Section%209%20-%20Advanced%20DOM/66-and-67-expand-collapse-project/) (lessons 66 and 67 in Section 9 - Advanced DOM)
-   [Simple Google Maps Clone using MapBox](/beginner-course/Section%209%20-%20Advanced%20DOM/68-google-maps-clone/) (lesson 68 in Section 9 - Advanced DOM)

## Client Only with Node Modules

These projects are still client-only projects, but they use the Parcel bundler to allow the browser to use Node modules.

To run these projects, download the repository, open a terminal in the directory of the project you wish to run, and run `npm start` in the terminal. By default, the project will be available at `localhost:1234` once Parcel is ready. If you have a global Parcel config that overwrites this default, check the terminal for the actual `localhost` address.

### Beginner Course (found in the `beginner-course` directory)

-   [Custom Date Picker](/beginner-course/Section%2010%20-%20Modules%20and%20Bundlers/73-date-picker/my-solution) (lesson 73 in Section 10 - Modules and Bundlers)
-   [Shopping Cart](/beginner-course/Section%2010%20-%20Modules%20and%20Bundlers/74-shopping-cart/my-solution) (lesson 74 in Section 10 - Modules and Bundlers)
-   [Tooltip Library](/beginner-course/Section%2011%20-%20Bonus%20Projects/1-tooltip-library) (the first bonus project for the beginner course, found in Section 11 - Bonus Projects)
-   [Trello Clone](/beginner-course/Section%2011%20-%20Bonus%20Projects/2-trello-clone) (the second bonus project for the beginner course, found in Section 11 - Bonus Projects)

### Advanced Course

-   [Minesweeper Clone](/Section%202%20-%20Advanced%20Features/15-minesweeper/my-solution) (lesson 15 in Section 2 - Advanced Features)

## Client and Server

These projects have both a client and a server. The client again uses the Parcel bundler to allow the browser to use Node modules. The server in these apps does not have any kind of database component and acts only as a bridge between multiple clients using `socket.io`.

To run these projects, download the repository, and open two terminals, one in the `client` directory of the project you wish to run and one in the `server` directory.

In the `server` directory terminal, run the command `npm start` to start the server.

In the `client` directory terminal, run the command `npm start` to start up Parcel. By default, the client will be available at `localhost:1234` once Parcel is ready. If you have a global Parcel config that overwrites this default, check the terminal for the actual `localhost` address.

### Beginner Course (found in the `beginner-course` directory)

-   [Pictionary Clone](/beginner-course/Section%2011%20-%20Bonus%20Projects/3-pictionary-clone) (the third and final bonus project for the beginner course, found in Section 11 - Bonus Projects)
