from flask import Flask, render_template, request
from datetime import datetime
from pm25 import get_pm25

app = Flask(__name__)

stocks = [
    {'分類': '日經指數', '指數': '22,920.30'},
    {'分類': '韓國綜合', '指數': '2,304.59'},
    {'分類': '香港恆生', '指數': '25,083.71'},
    {'分類': '上海綜合', '指數': '3,380.68'}
]


@app.route('/pm25', methods=['GET', 'POST'])
def pm25():
    if request.method == 'GET':
        columns, values = get_pm25()
        # 使用GET => request.args.get(name)
        # if request.args.get('sort'):
        #     olumns, values = get_pm25(True)
    if request.method == 'POST':
        if request.form.get('sort'):
            columns, values = get_pm25(True)
        else:
            columns, values = get_pm25()

    return render_template('./pm25.html', **locals())


@app.route('/stock')
def stock():

    return render_template('./stock.html', stocks=stocks,
                           datetime=get_date())


@app.route('/index')
@app.route('/')
def index():
    name = 'GUEST'
    date = get_date()
    content = {'name': name, 'date': date}
    return render_template('./index.html', content=content)


@app.route('/date')
def get_date():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@app.route('/book')
@app.route('/book/<int:id>')
def get_book(id=None):
    try:
        books = {1: "HTML-Book", 2: "CSS-Book", 3: "JavaScript-Book"}
        if id is not None:
            return books[id]
        else:
            return books
    except Exception as e:
        print(e)
        return '<h2>查詢錯誤，請重新輸入~</h2>'


if __name__ == '__main__':
    app.run(debug=True)
