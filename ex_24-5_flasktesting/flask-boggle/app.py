from flask import Flask, request, render_template, session, redirect, jsonify
from random import randint,  choice, sample
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle
# from game import BoggleGameSession as BG

app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
debug = DebugToolbarExtension(app)

STATE_KEY = "game-state"
BOARD_KEY = "gameboard"
SCORE_KEY = "high-score"
COUNT_KEY = "game-count"
# GAMEOVER_KEY = "game-over"

# CURRENT_SCORE_KEY = "current-score"
# GAME_OVER_KEY = "game-over"

# def get_new_board():
#     """Generates a new board"""
#     game = Boggle()
#     board = game.make_board()
#     session[BOARD_KEY] = board
#     return board

# front end will talk to server to update stored high score?
# def get_high_score(score=0):
#     if session.get(SCORE_KEY) is None:
#         session[SCORE_KEY] = 0
#         return 0
#     else:
#         high = session[SCORE_KEY]
#         if score > high:
#             session[SCORE_KEY] = score
#             return score

# front end will talk to server to update game count?
# def update_count(count):
#     if session.get(COUNT_KEY) is None:
#         session[COUNT_KEY] = 0
#         return 0
#     else:
#         game_count = session[COUNT_KEY]
#         game_count += 1
#         session[COUNT_KEY] = game_count

@app.route('/')
def home_page():
    """Loads current game (redirects to initialize new game if stored game does not exist)"""
    if session.get(STATE_KEY) is not None:
        board = session[STATE_KEY][BOARD_KEY]
        game_count = session[STATE_KEY][COUNT_KEY]
        high_score = session[STATE_KEY][SCORE_KEY]
        # game_over = session[STATE_KEY][GAMEOVER_KEY]
        return render_template("board.html", board=board, game_count=game_count, high_score=high_score)
    else: 
        return redirect("/new-game")

@app.route('/new-game', methods=['GET', 'POST'])
def new_game():
    """Starts a new game by resetting the board"""
    # start a new game instance
    b = Boggle()
    # save new board to session
    new_board = b.make_board()
    # initialize and save state data if it doesn't exist
    if session.get(STATE_KEY) is None:
        session[STATE_KEY] = {
            BOARD_KEY: new_board,
            SCORE_KEY: 0,
            COUNT_KEY: 0,
            # GAMEOVER_KEY: False,
        }
    # if state data exists, use existing state data
    else:
        high_score = session[STATE_KEY][SCORE_KEY]
        game_count = session[STATE_KEY][COUNT_KEY]
        # if game is over, save state data with new board
        session[STATE_KEY] = {
            BOARD_KEY: new_board,
            SCORE_KEY: high_score,
            COUNT_KEY: game_count,
            # GAMEOVER_KEY: False,
        }
    return redirect("/")

@app.route('/check-word', methods=['POST'])
def check_word():
    """Checks game form input, validates, and returns result"""
    # def check_valid_word(self, board, word):
    # board = session[BOARD_KEY]
    # returns result
    result = {}
    return jsonify(result)

# @app.route('/end-game', methods=['POST'])
# def end_game():
#     """Ends game and updates/returns game statistics"""
#     # get score from completed game and compare to high score
#     high_score = session[STATE_KEY][SCORE_KEY]
#     game_count = session[STATE_KEY][COUNT_KEY]
#     # session[GAME_OVER_KEY] = True
#     game_count += 1
#     session[COUNT_KEY] = game_count
#     # check high score
#     end_game ={}
#     return jsonify(end_game)
 
@app.route('/api/get')
def get_board():
    """Returns board as JSON object"""
    if session.get(BOARD_KEY) is None:
        get_new_board()
    return jsonify(session[BOARD_KEY])

@app.route('/api/end-game', methods=['POST'])
def end_game_api():
    """Ends game and updates/returns game statistics"""
    new_high_score = False
    data = request.get_json(silent=True)
    score = data.get('score')
    # get score from completed game and compare to high score
    board = session[STATE_KEY][BOARD_KEY]
    high_score = session[STATE_KEY][SCORE_KEY]
    game_count = session[STATE_KEY][COUNT_KEY]
    # increment game count
    game_count += 1
    # check high score
    if score > high_score:
        high_score = score
        new_high_score = True
    session[STATE_KEY] = {
        BOARD_KEY: board,
        SCORE_KEY: high_score,
        COUNT_KEY: game_count,
    }
    result = {"new-high-score": new_high_score, "high-score": high_score, "game-count": game_count}
    return jsonify(result)
