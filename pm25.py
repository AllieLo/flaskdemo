import requests
import sqlite3
import pandas as pd

columns, values=None,None

def get_six_pm25():
    global values,columns
    six_pm25={}
    if values is None or columns is None:
        get_pm25_db()

    six_countys=['臺北市','新北市','桃園市','臺中市','臺南市','高雄市']    
    df=pd.DataFrame(values,columns=columns)
    for county in six_countys:
        six_pm25[county]=round(df.groupby('county').get_group(county)['pm25'].astype(int).mean(),1)
        
    return six_pm25


def get_pm25_db(sort=False):
    global columns, values
    
    try:
        conn = sqlite3.connect('./pm25.db')
        cursor = conn.cursor()     
        columns = ['site', 'county', 'pm25', 'updatetime']      
        sqlstr = '''
            SELECT site, county, pm25, datacreationdate
            FROM data
            WHERE (site, datacreationdate) IN (
                SELECT site, MAX(datacreationdate)
                FROM data
                GROUP BY site
            )'''

        values = list(cursor.execute(sqlstr))

        if sort:
            values = sorted(values, key=lambda x: x[2], reverse=True)        

    except Exception as e:
        print(e)
    return columns, values


def get_pm25(sort=False):
    global columns, values
    try:
        url = 'https://data.epa.gov.tw/api/v2/aqx_p_02?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=datacreationdate%20desc&format=JSON'
        resp = requests.get(url)
        datas = resp.json()['records']
        # 組合標題
        columns = list(datas[0].keys())[:-1]
        # 組合內容
        values = []
        for data in datas:
            data = list(data.values())[:-1]
            try:
                data[2] = eval(data[2])
                values.append(data)
            except Exception as e:
                print(e)

        if sort:
            values = sorted(values, key=lambda x: x[2], reverse=True)

    except Exception as e:
        print(e)
    return columns, values


if __name__ == '__main__':
    print(get_six_pm25())
