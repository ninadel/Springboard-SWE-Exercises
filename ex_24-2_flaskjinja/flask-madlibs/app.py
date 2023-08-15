from flask import Flask, request, render_template
# from random import choice, sample

from flask_debugtoolbar import DebugToolbarExtension
from stories import Story

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

@app.route('/')
def index():
    """Return homepage."""

    return render_template("base.html")

story_template = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

@app.route('/form')
def render_form():
    """Return form."""
    prompts = story_template.prompts
    return render_template("form.html", prompts=prompts)

@app.route('/story')
def get_story():
    """Return form."""
    result_story = story_template.generate(request.args)
    return render_template("story.html", result_story=result_story)
