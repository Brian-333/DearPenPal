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

    username = request.json['username']
    password = request.json['password']
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
    
@app.route('/add_sub_acct', methods=['POST'])
def add_sub_acct():
    conn = DBConn()

    username = request.json['username']
    password = request.json['password']
    name = request.json['name']
    usr_type = request.json['usr_type']
    manager = request.json['manager']

    try:
        # Check if username already exists
        conn.cursor.execute(
            'SELECT * FROM sub_acct WHERE username = %s',
            (username,)
        )
        result = conn.cursor.fetchone()
        if result:
            return 'Username already exists', 403
        
        # Register new sub account
        conn.cursor.execute(
            'INSERT INTO sub_acct (username, password, name, type, manager) VALUES (%s, %s, %s, %s, %s)',
            (username, hash_password(password), name, usr_type, manager)
        )
        conn.commit()
        # password is returned to frontend for user to login
        return ['Success', password], 200
    
    except Exception as e:
        return str(e), 500
    
@app.route('/sub_acct_login', methods=['POST'])
def sub_acct_login():
    conn = DBConn()

    username = request.json['username']
    password = request.json['password']
    password = hash_password(password)

    try:
        conn.cursor.execute(
            'SELECT * FROM sub_acct WHERE username = %s AND password = %s',
            (username, password)
        )
        result = conn.cursor.fetchone()
        if result:
            return 'Success', 200
        else:
            return 'Failed', 403
        
    except Exception as e:
        return str(e), 500

@app.route('/get_sub_accts', methods=['POST'])
def get_sub_accts():
    conn = DBConn()

    manager = request.json['manager']

    try:
        conn.cursor.execute(
            'SELECT * FROM sub_acct WHERE manager = %s',
            (manager,)
        )
        result = conn.cursor.fetchall()
        if result:
            return result, 200
        else:
            return 'No sub account found', 404
        
    except Exception as e:
        return str(e), 500

# Running app
if __name__ == '__main__':
    app.run(debug=True)