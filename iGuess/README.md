### Hexagon documentation

This is the main application, where players will be able to play the game on.

There are three html pages:
- Home
- Name-enter
- Pred

#### Home
This is the 'welcome' screen, where users will be able to get to know more about the application itself.

#### Name-enter
The registration screen. Users enter their usernames on this page, and get redirected to the main page.

#### Pred
This is the main page, everything happens on this page.

First things you'll see on this page are:
- The top panel
- The live leaderboards and live log
- The prediction categories
- The navigation tabs
- Trivia

##### Top panel
Whenever a user logs in, it checks the database for the user's name, points, team and team-points. These are then saved into an array, and afterwards used in the HTML front-end to display these.

##### Live leaderboards and live log
The leaderboards simply retrieves all users and their points from the database, and sorts them descending by points.
The live log is updated whenever a user does an action in the app. For example, whenever someone places a bet, it gets sent to the socket server, where it is saved, and then the socket server sends it to all users. And afterwards it gets saved into an array, which is then later used to display the information.

##### Prediction categories
The predictions are loaded from the database, each time a user clicks on a category. Whenever a user wants to place a prediction, it asks for input. After user enters a valid amount, it gets saved into the database.

##### Navigation tabs
These are used to navigate to:
- Profile
- Shop
- Main page
- Log out

##### Profile
Here, users can keep track of which predictions they placed, and what they purchased. All this information is retrieved from the database.

##### Shop
Players can purchase rewards here with their points. Each purchase gets saved into the database.

##### Log out
After users click on log out, their session gets deleted from the device storage, but saved in the database.

##### Trivia
Whenever a game master decides to launch a trivia session, every user receives a notification on the top right of the page. Whenever a user clicks on this notification, they will be prompted with a trivia question. If a user succeeds to answer this question, the answer gets saved to the database and the user will be rewarded with 25 points.
