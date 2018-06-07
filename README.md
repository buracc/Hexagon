# Hexagon

This repository consists of four directories, all being part of the Hexagon project.

#### Functional details
The Hexagon app is an Ionic web application, which is connected to a MySQL database. The connection with the database (retrieving, and manipulating data) is handled with a RESTful API. The web app consists of two parts: the player's app, and the game master's app (basically the admin panel). On the player's app, players can obviously play the game, and on the admin panel, game masters can take control of games and manipulate data which is saved onto the database. The game communicates through sockets. There exists a socket.IO server, which handles all requests sent through sockets. An example would be, the game master sends a request through a socket which executes a function on all client's web page.

### 1. iGuess (Hexagon web project)

This is the front-end part of the Hexagon web application project. It's written in HTML/CSS/TypeScript (Ionic Cordova Framework).
The app is ment to be a 'functional' prototype which users can interact with, so they can fully understand the idea behind the Hexagon concept. The app is a conceptual predicting game, on which users get grouped up to clash against other teams, their knowledge about the game being their 'weapons of war'. Players can use their game knowledge to make predictions about things that will happen during a live game, earning or losing points depending on whether their prediction was right or not. These hard earned points can then be used to exchange for exclusive rewards, such as game cosmetics, or even physical items.

The predicting game is based on the shooter 'Counter-strike: Global offensive', which is massively played on eSports events.

#### What can users do on this app?
After registering with your nickname, you get navigated to the main page. After that, the game master will assign you to a team. Once a CS:GO game starts, the game master will 'unlock' the prediction options for 20 seconds (during the so called 'buy times' of a CS:GO round) which will be the time when you will be able to make a prediction. When you make a prediction, for example: 'Team A will win this round over Team B', you can wager a certain amount of points on this prediction. Each prediction has their own 'multipliers', which are the things that will earn you more points. For example: Team A, which is known for being a very strong team, has a higher chance on winning the round against Team B. Therefore the chance that Team A will win this round, is significantly higher, so their multiplier will be lower. Imagine I bet 500 points on Team A to win the round, the multiplier being 1.5X my wager. If the prediction is right, and Team A wins the round, I receive 750 points in return. If Team A has a very unlucky round, I lose all the points I wagered.

If a player decides to stop playing and to exchange their points for a reward, they can check the reward page for a list of rewards. Whenever a player purchases a reward, the game master gets notified and the purchase details will be saved and presented to the game master.

And of course, there is a leaderboard. On this leaderboard you can see the amount of points each team and individual user has earned throughout the session. On here, the player can keep track of how your team is doing against all other teams and if there are any competitors.

In the near future, we Aim to implement a chatting function and a settings function.

### 2. GameMaster (Hexagon admin panel)

The GameMaster directory contains the web project for the admin panel. On this panel, game masters can lead game sessions. 
A few things of what a game master is able to do through this panel:
- Assign users to a team
- Change the multipliers of a prediction
- Confirm which predictions are correct or wrong
- See the current online users
- See the purchases that have been made by players
- See the predictions that have been placed by players

In the near future, we Aim to implement more methods of manipulating data in the database, without having to write and execute complex SQL queries and such.

### 3. PredServer (Hexagon Socket.IO server for sending sockets)

The PredServer contains the Socket.IO server. This server handles all the requests which get sent by the users through the web application. It's mainly used by the game master to be able administer the games.

### 4. GuessAPI (Hexagon web API)

This is the directory for the RESTful web API, it's written in Java. This is the back-end of the application, which handles all the data that's being saved and manipulated on the web application. The API is connected to a MySQL database, which is used to save data from the web application.
