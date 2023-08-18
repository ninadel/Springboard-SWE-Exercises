from boggle import Boggle

class Game(Boggle):
  def __init__(self):
    super().__init__()
    self.board = self.make_board()

    def __repr__(self):
        return f'{list(self.board)}'
    

boggle_game = Game()
boggle_game_board = boggle_game.make_board()