from flask import Flask
from datetime import datetime

app = Flask(__name__)


@app.route('/index')
@app.route('/')
def index():
    return '<h1>Hello Flask!</h1>'


@app.route('/date')
def get_date():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


@app.route('/book/<int:id>')
def get_book(id):
    books = {1: "HTML-Book", 2: "CSS-Book", 3: "JavaScript-Book"}
    return books[id]


if __name__ == '__main__':
    app.run(debug=True)
