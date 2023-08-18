from boggle import Boggle

class BoggleGameSession(Boggle):
  def __init__(self):
    super().__init__()
    self.board = self.make_board()

  def __repr__(self):
    return f'{list(self.board)}'
    
  def reset_game(self):
     """Update high score statistic"""
     result = None
     return result

  def update_score(self):
     """Update high score statistic"""
     result = None
     return result

  def update_count(self):
     """Increment game count statistic"""
     result = None
     return result