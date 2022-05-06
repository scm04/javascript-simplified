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

### Advanced Course

-   [Minesweeper Clone](/Section%202%20-%20Advanced%20Features/15-minesweeper/my-solution) (lesson 15 in Section 2 - Advanced Features)
-   [Simple Math Solver](/Section%202%20-%20Advanced%20Features/16-and-17-math-solver/my-solution) (lessons 16 and 17 in Section 2 - Advanced Features)
-   [Basic Calculator](/Section%204%20-%20Object%20Oriented%20Programming/27-and-28-calculator-project/my-solution) (lessons 27 and 28 in Section 4 - Object Oriented Programming)

## Client Only with Node Modules

These projects are still client-only projects, but they use the Parcel bundler to allow the browser to use Node modules.

To run these projects, download the repository, open a terminal in the directory of the project you wish to run, and run `npm start` in the terminal. By default, the project will be available at `localhost:1234` once Parcel is ready. If you have a global Parcel config that overwrites this default, check the terminal for the actual `localhost` address.

### Beginner Course (found in the `beginner-course` directory)

-   [Custom Date Picker](/beginner-course/Section%2010%20-%20Modules%20and%20Bundlers/73-date-picker/my-solution) (lesson 73 in Section 10 - Modules and Bundlers)
-   [Shopping Cart](/beginner-course/Section%2010%20-%20Modules%20and%20Bundlers/74-shopping-cart/my-solution) (lesson 74 in Section 10 - Modules and Bundlers)
-   [Tooltip Library](/beginner-course/Section%2011%20-%20Bonus%20Projects/1-tooltip-library) (the first bonus project for the beginner course, found in Section 11 - Bonus Projects)
-   [Trello Clone](/beginner-course/Section%2011%20-%20Bonus%20Projects/2-trello-clone) (the second bonus project for the beginner course, found in Section 11 - Bonus Projects)

### Advanced Course

-   [Minesweeper Clone](/Section%205%20-%20Functional%20Programming/35-minesweeper-functional-programming/) using Functional Programming (lesson 35 in Section 5 - Functional Programming)

## Client and Server

These projects have both a client and a server. The client again uses the Parcel bundler to allow the browser to use Node modules. The server in these apps does not have any kind of database component and acts only as a bridge between multiple clients using `socket.io`.

To run these projects, download the repository, and open two terminals, one in the `client` directory of the project you wish to run and one in the `server` directory.

In the `server` directory terminal, run the command `npm start` to start the server.

In the `client` directory terminal, run the command `npm start` to start up Parcel. By default, the client will be available at `localhost:1234` once Parcel is ready. If you have a global Parcel config that overwrites this default, check the terminal for the actual `localhost` address.

### Beginner Course (found in the `beginner-course` directory)

-   [Pictionary Clone](/beginner-course/Section%2011%20-%20Bonus%20Projects/3-pictionary-clone) (the third and final bonus project for the beginner course, found in Section 11 - Bonus Projects)

## Command Line Interface (CLI) Projects (Node only; no browser)

These projects are command line projects that do not require a browser to run. To use them, download the repository, navigate the folder for the CLI tool you wish to use, open a terminal in that folder, run the command `node script.js`, and follow the on-screen prompts. As these projects are intended to help reinforce one or more concepts from the course, most of them will mimic database functionality using the file system rather than implementing a true database.

### Advanced Course

-   [ATM CLI](/Section%204%20-%20Object%20Oriented%20Programming/26-atm-cli-project) (lesson 26 in Section 4 - Object Oriented Programming)
