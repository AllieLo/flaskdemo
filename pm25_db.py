import requests
import sqlite3

url = 'https://data.epa.gov.tw/api/v2/aqx_p_02?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=datacreationdate%20desc&format=JSON'
sqlstr = '''
create table if not exists data(
id integer primary key autoincrement,
site text,
county text,
pm25 integer,
datacreationdate datetime,
itemunit text
)

'''

conn, cursor = None, None
values = []


def get_data():
    global values
    try:
        resp = requests.get(url)
        datas = resp.json()['records']
        values = []
        print('資料分析')
        for data in datas:
            data = list(data.values())
            try:
                data[2] = eval(data[2])
                values.append(data)
            except Exception as e:
                print(e)
    except Exception as e:
        print(e)


def connect_db():
    global conn, cursor
    conn = sqlite3.connect('pm25.db')
    cursor = conn.cursor()
    cursor.execute(sqlstr)
    conn.commit()
    print('db open')


def write_db():
    # 組合內容
    count = 0
    for data in values:
        try:
            sqlstr = f'select * from data where site="{data[0]}" and datacreationdate="{data[-2]}"'
            result = list(cursor.execute(sqlstr))
            if result == []:
                sqlstr = f'insert into data(site,county,pm25,datacreationdate,itemunit) values("{data[0]}","{data[1]}",\
                {data[2]},"{data[3]}","{data[4]}")'
                cursor.execute(sqlstr)
                count += 1
        except Exception as e:
            print(e)

    conn.commit()
    print(f'更新:{count}筆資料.')


try:
    connect_db()
    get_data()
    write_db()
except Exception as e:
    print(e)
finally:
    if conn is not None:
        conn.close()
