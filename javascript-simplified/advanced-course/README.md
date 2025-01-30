# Advanced Course

Welcome to the advanced course! The advanced course is split into {#} sections, and I have added an additional "Section {#}" to house the bonus projects that are intended to come after the advanced course is completed. To view the projects and activities from each section, you can browse through the directories manually or click on one of the links below. If you want to run the projects locally, start by downloading the repository, then follow the instructions above the project in the sections below.

## Client Only

These projects only have a client and don't require anything special to see in action. Just open `index.html` in your browser!

-   [Minesweeper Clone](/javascript-simplified/advanced-course/Section%202%20-%20Advanced%20Features/15-minesweeper/my-solution) (lesson 15 in Section 2 - Advanced Features)
-   [Simple Math Solver](/javascript-simplified/advanced-course/Section%202%20-%20Advanced%20Features/16-and-17-math-solver/my-solution) (lessons 16 and 17 in Section 2 - Advanced Features)
-   [Basic Calculator](/javascript-simplified/advanced-course/Section%204%20-%20Object%20Oriented%20Programming/27-and-28-calculator-project/my-solution) (lessons 27 and 28 in Section 4 - Object Oriented Programming)

## Projects with Bundlers

<!-- I want to replace Parcel with Vite in all of my projects. Vite is much, much easier to work with. When I do replace it, I need to update this section with instructions for Vite instead of Parcel. -->

The projects in the next two subsections use a bundler to allow the browser to use Node modules. To run the client for these projects, open a terminal in the directory of the client and run `npm start` in the terminal. By default, the project will be available at `localhost:1234` once Parcel is ready. If you have a global Parcel config that overwrites this default, check the terminal for the actual `localhost` address.

### Client Only with Node Modules

These projects are still client-only projects, but need a bundler to allow them to use Node modules. To run the client, use the [instructions above](#projects-with-bundlers).

-   [Minesweeper Clone](/javascript-simplified/advanced-course/Section%205%20-%20Functional%20Programming/35-minesweeper-functional-programming/) using Functional Programming (lesson 35 in Section 5 - Functional Programming)

### Client and Server

These projects have both a client and a server. The client again uses a bundler to allow the browser to use Node modules. The server in these apps does not have any kind of database component and acts only as a bridge between multiple clients using `socket.io`.

To run the client component of these projects, use the [instructions above](#projects-with-bundlers).

To run the server component of these projects, open a terminal in the `server` directory and run the command `npm start` to start the server.

## Command Line Interface (CLI) Projects (Node only; no browser)

These projects are command line projects that do not require a browser to run. To use them, open a terminal in project directory, run the command `node script.js`, and follow the on-screen prompts. As these projects are intended to help reinforce one or more concepts from the course, most of them mimic database functionality using the file system rather than implementing a true database.

### Advanced Course

-   [ATM CLI](/javascript-simplified/advanced-course/Section%204%20-%20Object%20Oriented%20Programming/26-atm-cli-project) (lesson 26 in Section 4 - Object Oriented Programming)
