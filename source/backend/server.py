from flask import Flask, jsonify, request
from classes.dbConn import DBConn
from datetime import timedelta
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "some-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
import hashlib
SALT = 'home_and_school'
MNG_TYPES = ['senior', 'student']

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
    manager_type = request.json['type']
    password = hash_password(password)

    # Validate inputs
    if not manager_type in MNG_TYPES:
        return 'Invalid manager type', 400
    if not username or not password:
        return 'Missing fields', 400

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
            'INSERT INTO managers (username, password, type, email, name) VALUES (%s, %s, %s, %s, %s)',
            (username, password, manager_type, email, name)
        )
        conn.commit()
        return jsonify({'msg': 'Success'}), 200
    except Exception as e:
        print(e)
        return jsonify({"msg": str(e)}), 500
    
@app.route('/manager_login', methods=['POST', 'GET'])
def manager_login():
    conn = DBConn()

    username = request.json['username']
    password = request.json['password']
    password = hash_password(password)

    # Validate inputs
    if not username or not password:
        return 'Missing fields', 400

    try:
        conn.cursor.execute(
            'SELECT * FROM managers WHERE username = %s AND password = %s',
            (username, password)
        )
        result = conn.cursor.fetchone()
        if result:
            token = create_access_token(identity=username)
            return jsonify({"access_token": token})
        else:
            return jsonify({"msg": "Invalid username or password"}), 401
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

    # Validate inputs
    if usr_type not in MNG_TYPES:
        return 'Invalid user type', 400

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