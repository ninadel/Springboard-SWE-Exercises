from flask import Flask, request, render_template, session, redirect, jsonify
from random import randint,  choice, sample
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
debug = DebugToolbarExtension(app)

BOARD_KEY = "gameboard"

def get_new_board():
    """Generates a new board"""
    game = Boggle()
    board = game.make_board()
    session[BOARD_KEY] = board
    return board

@app.route('/')
def home_page():
    """Shows home page"""
    if session.get(BOARD_KEY) is not None:
        board = session[BOARD_KEY]
        return render_template("board.html", board=board)
    else: 
        board, indices = get_new_board()
        return render_template("board.html", board=board)

@app.route('/new_game', methods=["POST"])
def restart_game():
    """Starts a new game"""
    session[BOARD_KEY] = []
    get_new_board()
    return redirect("/")

@app.route('/api/get')
def get_board():
    """Returns board as JSON object"""
    if session.get(BOARD_KEY) is None:
        get_new_board()
    return jsonify(session[BOARD_KEY])



