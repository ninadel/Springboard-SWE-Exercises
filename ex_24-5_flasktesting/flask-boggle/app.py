from flask import Flask, request, render_template, session, redirect, jsonify
from random import randint,  choice, sample
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
debug = DebugToolbarExtension(app)

BOARD_KEY = "gameboard"
SCORE_KEY = "high-score"
COUNT_KEY = "game-count"
CURRENT_SCORE_KEY = "current-score"
GAME_OVER_KEY = "game-over"

def get_new_board():
    """Generates a new board"""
    game = Boggle()
    board = game.make_board()
    session[BOARD_KEY] = board
    return board

# front end will talk to server to update stored high score?
def get_high_score(score=0):
    if session.get(SCORE_KEY) is None:
        session[SCORE_KEY] = 0
        return 0
    else:
        high = session[SCORE_KEY]
        if score > high:
            session[SCORE_KEY] = score
            return score

# front end will talk to server to update game count?
def update_count(count):
    if session.get(COUNT_KEY) is None:
        session[COUNT_KEY] = 0
        return 0
    else:
        game_count = session[COUNT_KEY]
        game_count += 1
        session[COUNT_KEY] = game_count

@app.route('/')
def home_page():
    """Displays current game (redirects to start new game if stored game does not exist)"""

    if session.get(BOARD_KEY) is not None:
        board = session[BOARD_KEY]
        game_count = session[COUNT_KEY]
        high_score = session[SCORE_KEY]
        game_over = session[GAME_OVER_KEY]
        return render_template("board.html", board=board, game_count=game_count, high_score=high_score, game_over=game_over)
    else: 
        return redirect("/new-game")

# will this be the same route if a game times out on the front end?
# what data is carried through to update session data?
@app.route('/new-game', methods=["POST"])
def start_game():
    """Starts a new game"""
    session[BOARD_KEY] = []
    get_high_score()
    update_count()
    get_new_board()
    return redirect("/")

@app.route('/game-complete')
def end_game():
    # get score from completed game and compare to high score
    high_score = session[SCORE_KEY]
    game_count = session[COUNT_KEY]
    session[GAME_OVER_KEY] = True
    game_count += 1
    session[COUNT_KEY] = game_count
    # check high score
    return redirect("/")

@app.route('/api/get')
def get_board():
    """Returns board as JSON object"""
    if session.get(BOARD_KEY) is None:
        get_new_board()
    return jsonify(session[BOARD_KEY])

# /api/check: get input, return result
# on javascript side, update based on json if success is returned
