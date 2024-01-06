from flask import Flask, request
from classes.dbConn import DBConn

app = Flask(__name__)

@app.route('/manager_create', methods=['POST'])
def manager_create():
    conn = DBConn()

    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    name = request.form['name']

    try:
        conn.cursor.execute(
            'INSERT INTO managers (username, password, email, name) VALUES (%s, %s, %s, %s)',
            (username, password, email, name)
        )
        conn.commit()
        return 'Success'
    except Exception as e:
        return str(e)
    
@app.route('/manager_login', methods=['POST'])
def manager_login():
    conn = DBConn()

    username = request.form['username']
    password = request.form['password']

    try:
        conn.cursor.execute(
            'SELECT * FROM managers WHERE username = %s AND password = %s',
            (username, password)
        )
        result = conn.cursor.fetchone()
        if result:
            return 'Success'
        else:
            return 'Failed'
    except Exception as e:
        return str(e)

# Running app
if __name__ == '__main__':
    app.run(debug=True)