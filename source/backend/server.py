from flask import Flask, request
from classes.dbConn import DBConn
import hashlib
SALT = 'home_and_school'

app = Flask(__name__)

def hash_password(password):
    password = password + SALT
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

@app.route('/manager_create', methods=['POST'])
def manager_create():
    conn = DBConn()

    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    name = request.json['name']
    password = hash_password(password)

    try:
        # Check if username already exists
        conn.cursor.execute(
            'SELECT * FROM managers WHERE username = %s',
            (username,)
        )
        result = conn.cursor.fetchone()
        if result:
            return 'Username already exists', 403
        
        # Register new manager
        conn.cursor.execute(
            'INSERT INTO managers (username, password, email, name) VALUES (%s, %s, %s, %s)',
            (username, password, email, name)
        )
        conn.commit()
        return 'Success', 200
    
    except Exception as e:
        return str(e), 500
    
@app.route('/manager_login', methods=['POST'])
def manager_login():
    conn = DBConn()

    username = request.form['username']
    password = request.form['password']
    password = hash_password(password)

    try:
        conn.cursor.execute(
            'SELECT * FROM managers WHERE username = %s AND password = %s',
            (username, password)
        )
        result = conn.cursor.fetchone()
        if result:
            return 'Success', 200
        else:
            return 'Failed', 403
        
    except Exception as e:
        return str(e), 500

# Running app
if __name__ == '__main__':
    app.run(debug=True)