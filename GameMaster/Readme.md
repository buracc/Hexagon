### GameMaster documentation

This is the game master panel for the Hexagon game. It's pretty much an admin panel where you can manage game sessions and manipulate data in the database.

#### How it works
There is a homepage (home.html) containing all the required functions, which are associated with methods in the TypeScript file (home.ts), and of course the stylesheet containing the CSS (home.scss).

Each execution of a function sends a request to the API (check API docs for more info), which manipulates data in the database. After that, a request gets sent to the players according to the function the game master has executed. For example, whenever the game master decided which bet has won and the game master executes the function which sends a request to the players that a bet has been won, the request executes some method on the player's screen according to the bet that has been won.
