# Beginner Course

Welcome to the beginner course! The beginner course is split into 10 sections, however, the first section of the course is an introduction to JavaScript and does not contain any activities or projects, so I have not included a directory for it. I have added an additional "Section 11" to house the bonus projects that are intended to come after the beginner course is completed. To view the projects and activities from each section, you can browse through the directories manually or click on one of the links below. If you want to run the projects locally, start by downloading the repository, then follow the instructions above the project in the sections below.

## Client Only

These projects only have a client and don't require anything special to see in action. Just open `index.html` in your browser!

-   [Build a working modal](/javascript-simplified/beginner-course/Section%206%20-%20Basic%20DOM/44-and-45-modal-project/) (lessons 44 and 45 in Section 6 - Basic DOM)
-   [Build a Quiz App](/javascript-simplified/beginner-course/Section%207%20-%20Control%20Flow/54-and-55-quiz-app-project/) (lessons 54 and 55 in Section 7 - Control Flow)
-   [Simple form validation](/javascript-simplified/beginner-course/Section%207%20-%20Control%20Flow/56-and-57-form-validation-project/) (lessons 56 and 57 in Section 7 - Control Flow)
-   [Simple Expand/Collapse Mechanism](/javascript-simplified/beginner-course/Section%209%20-%20Advanced%20DOM/66-and-67-expand-collapse-project/) (lessons 66 and 67 in Section 9 - Advanced DOM)
-   [Simple Google Maps Clone using MapBox](/javascript-simplified/beginner-course/Section%209%20-%20Advanced%20DOM/68-google-maps-clone/) (lesson 68 in Section 9 - Advanced DOM)

## Projects with Bundlers

<!-- I want to replace Parcel with Vite in all of my projects. Vite is much, much easier to work with. When I do replace it, I need to update this section with instructions for Vite instead of Parcel. -->

The projects in the next two subsections use a bundler to allow the browser to use Node modules. To run the client for these projects, open a terminal in the directory of the client and run `npm start` in the terminal. By default, the project will be available at `localhost:1234` once Parcel is ready. If you have a global Parcel config that overwrites this default, check the terminal for the actual `localhost` address.

### Client Only with Node Modules

These projects are still client-only projects, but need a bundler to allow them to use Node modules. To run the client, use the [instructions above](#projects-with-bundlers).

-   [Custom Date Picker](/javascript-simplified/beginner-course/Section%2010%20-%20Modules%20and%20Bundlers/73-date-picker/my-solution) (lesson 73 in Section 10 - Modules and Bundlers)
-   [Shopping Cart](/javascript-simplified/beginner-course/Section%2010%20-%20Modules%20and%20Bundlers/74-shopping-cart/my-solution) (lesson 74 in Section 10 - Modules and Bundlers)
-   [Tooltip Library](/javascript-simplified/beginner-course/Section%2011%20-%20Bonus%20Projects/1-tooltip-library) (the first bonus project for the beginner course, found in Section 11 - Bonus Projects)
-   [Trello Clone](/javascript-simplified/beginner-course/Section%2011%20-%20Bonus%20Projects/2-trello-clone) (the second bonus project for the beginner course, found in Section 11 - Bonus Projects)

### Client and Server

These projects have both a client and a server. The client again uses a bundler to allow the browser to use Node modules. The server in these apps does not have any kind of database component and acts only as a bridge between multiple clients using `socket.io`.

To run the client component of these projects, use the [instructions above](#projects-with-bundlers).

To run the server component of these projects, open a terminal in the `server` directory and run the command `npm start` to start the server.

-   [Pictionary Clone](/javascript-simplified/beginner-course/Section%2011%20-%20Bonus%20Projects/3-pictionary-clone) (the third and final bonus project for the beginner course, found in Section 11 - Bonus Projects)

## Command Line Interface (CLI) Projects (Node only; no browser)

These projects are command line projects that do not require a browser to run. To use them, open a terminal in project directory, run the command `node script.js`, and follow the on-screen prompts. As these projects are intended to help reinforce one or more concepts from the course, most of them mimic database functionality using the file system rather than implementing a true database.
