from flask import Flask, render_template, request

print("running")

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("homepage.html")

def get_api_key():
    with open('gmaps_api_key.txt', 'r') as file:
        return file.read()

@app.route("/map")
def map_view():
    api_key = get_api_key()
    return render_template("map.html", api_key=api_key)

@app.route("/books")
def books():
    return render_template("coverstory.html")

@app.route("/context")
def context():
    return render_template("context.html")

@app.route("/bio")
def bio():
    return render_template("bio.html")

@app.route("/timeline")
def timeline():
    return render_template("timeline.html")

@app.route("/title")
def title():
    return render_template("title.html")

@app.route("/search")
def search():
    return render_template("search.html")

app.debug = True

if __name__ == "__main__":
    app.run()
