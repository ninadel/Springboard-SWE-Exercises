from flask import Flask, request

app = Flask(__name__)

# In the ***greet*** folder, Make a simple Flask app that responds to these routes with simple text messages:

# ***/welcome***   Returns “welcome”

@app.route("/welcome")
def welcome():
  return "welcome"

# ***/welcome/home***   Returns “welcome home”
@app.route("/welcome/home")
def welcome_home():
  return "welcome home"

# ***/welcome/back***   Return “welcome back”
@app.route("/welcome/back")
def welcome_back():
  return "welcome back"