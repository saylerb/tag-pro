# Game Time - Tag Pro

## Objective

The objective of the Game Time project was to develop a game using only front-end javascript (no Rails!). To complete the project, game should:
* Indicate when the game is over and won or lost
* Allow the user to start a new game
* Include a clean UI surrounding the actual game interface itself
* Score Tracking: How this works will vary by game, but at the end of the game, generate a score for the winning player
* Scoreboard -- track scores across multiple game sessions. Since we aren't incorporating a server for our games, client-side storage like a cookie or LocalStorage will suffice.
* Create multiple rounds of difficulty. (consider increasing factors such as game speed, randomness of starting setup, etc)

## Game Play

We chose to replicate an existing game called [TagPro](http://tagpro-sphere.koalabeast.com/). It is a capture-the-flag game with two teams: red and blue. One team tries to capture the other team's flag and bring it back to their own flag.

Our game is limited to two players. The Red team uses the arrow keys to move, and the Blue team uses WASD keys to move. There is a time limit for game play. At the end of the time limit, the score is assessed and a team wins (or there is a tie). The home screen features a browser-persistent tally of how many games each team has one (using localStorage).

[Link to Production Application](https://saylerb.github.io/game-time/)

## Repo Setup

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

To build the static files:

```js
npm run build
```

To run tests in Node:

```js
npm test
```
