from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

# Build a simple calculator with Flask, which uses URL query parameters to get the numbers to calculate with.

# Make a Flask app that responds to 4 different routes. Each route does a math operation with two numbers, ***a*** and ***b***, which will be passed in as URL GET-style query parameters.

# ***/add***   Adds ***a*** and ***b*** and returns result as the body.
@app.route("/add")
def calc_add():
    a = request.args["a"]
    b = request.args["b"]
    return f"{add(int(a),int(b))}"

# ***/sub***   Same, subtracting ***b*** from ***a***.
@app.route("/sub")
def calc_sub():
    a = request.args["a"]
    b = request.args["b"]
    return f"{sub(int(a),int(b))}"

# ***/mult***   Same, multiplying ***a*** and ***b***.
@app.route("/mult")
def calc_mult():
    a = request.args["a"]
    b = request.args["b"]
    return f"{mult(int(a),int(b))}"

# ***/div***   Same, dividing ***a*** by ***b***.
@app.route("/div")
def calc_div():
    a = request.args["a"]
    b = request.args["b"]
    return f"{div(int(a),int(b))}"

### PART TWO

operators = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div,
        }

@app.route("/math/<oper>")
def do_math(oper):
    """Do math on a and b."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = operators[oper](a, b)

    return str(result)
