from flask import Flask, jsonify, request
from classes.dbConn import DBConn
from datetime import timedelta
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
import hashlib
from datetime import datetime

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "some-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
SALT = 'home_and_school'
TYPES = ['senior', 'student']

def hash_password(password):
    password = password + SALT
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def match_sub_accts(username, user_type):
    conn = DBConn()

    try:
        match_type = {'senior': 'student', 'student': 'senior'}
        match_type = match_type[user_type]

        conn.cursor.execute(
            'SELECT username FROM sub_acct WHERE type = %s AND matched IS NULL',
            (match_type,)
        )

        matched_user = conn.cursor.fetchone()
        if matched_user:
            matched_user = matched_user[0]
            # Match found
            conn.cursor.execute(
                'UPDATE sub_acct SET matched = %s WHERE username = %s',
                (username, matched_user)
            )
            conn.cursor.execute(
                'UPDATE sub_acct SET matched = %s WHERE username = %s',
                (matched_user, username)
            )
            conn.commit()
            return True
        
        return False

    except Exception as e:
        raise e

print(hash_password("1"))

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
    if not manager_type in TYPES:
        return {'msg': 'Invalid manager type'}, 400
    if not username or not password:
        return {'msg': 'Missing fields'}, 400

    try:
        # Check if username already exists
        conn.cursor.execute(
            'SELECT * FROM managers WHERE username = %s',
            (username,)
        )
        result = conn.cursor.fetchone()
        if result:
            return {'msg': 'Username already exists'}, 403
        
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
        return {'msg': 'Missing fields'}, 400

    try:
        conn.cursor.execute(
            'SELECT * FROM managers WHERE username = %s AND password = %s',
            (username, password)
        )
        result = conn.cursor.fetchone()
        if result:
            token = create_access_token(identity=(username, "m"))
            return jsonify({"access_token": token})
        else:
            return jsonify({"msg": "Invalid username or password"}), 401
    except Exception as e:
        return str(e), 500

@app.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    response = jsonify({'msg': 'Success'})
    unset_jwt_cookies(response)
    return response, 200

@app.route('/get_acc_type', methods=['GET'])
@jwt_required()
def get_acc_type():
    (username, type_) = get_jwt_identity()
    print(type_)
    return jsonify({'type': type_}), 200

@app.route('/add_sub_acct', methods=['POST'])
@jwt_required()
def add_sub_acct():
    conn = DBConn()

    username = request.json['username']
    password = request.json['password']
    name = request.json['name']
    (manager, type_) = get_jwt_identity()

    try:

        # Check if username already exists
        conn.cursor.execute(
            'SELECT * FROM sub_acct WHERE username = %s',
            (username,)
        )
        result = conn.cursor.fetchone()
        if result:
            return {'msg': 'Username already exists'}, 403
        
        # Get manager type
        conn.cursor.execute(
            'SELECT type FROM managers WHERE username = %s',
            (manager,)
        )
        usr_type = conn.cursor.fetchone()[0]

        # Register new sub account
        conn.cursor.execute(
            'INSERT INTO sub_acct (username, password, name, type, manager) VALUES (%s, %s, %s, %s, %s)',
            (username, hash_password(password), name, usr_type, manager)
        )
        conn.commit()

        # Match sub account
        if match_sub_accts(username, usr_type):
            return {'msg': 'Success and Matched'}, 200

        return {'msg': 'Success'}, 200
    
    except Exception as e:
        return {'msg': str(e)}, 500
    
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
            token = create_access_token(identity=(username, "p"))
            return jsonify({"access_token": token})
        else:
            return jsonify({"msg": "Invalid username or password"}), 401
        
    except Exception as e:
        return {'msg': str(e)}, 500
    
@jwt_required()
@app.route('/sub_acct_update', methods=['POST'])
def sub_acct_update():
    conn = DBConn()

    username = request.json['username']
    password = request.json['password']
    name = request.json['name']

    try:
        # Check if username already exists
        conn.cursor.execute(
            'SELECT * FROM sub_acct WHERE username = %s',
            (username,)
        )
        result = conn.cursor.fetchone()
        if not result:
            return {'msg': 'Username does not exist'}, 403
        
        # Update sub account
        conn.cursor.execute(
            'UPDATE sub_acct SET password = %s, name = %s WHERE username = %s',
            (hash_password(password), name)
        )
        conn.commit()
        return {'msg': 'Success'}, 200
    
    except Exception as e:
        return str(e), 500

@app.route('/get_sub_accts', methods=['GET'])
@jwt_required()
def get_sub_accts():
    conn = DBConn()

    (manager, type_) = get_jwt_identity()

    try:
        conn.cursor.execute(
            'SELECT username, name FROM sub_acct WHERE manager = %s',
            (manager,)
        )
        result = conn.cursor.fetchall()
        result = list(map(lambda x: {'username': x[0], 'name': x[1], 'password': '(hidden)'}, result))
        if result:
            # ! Results are in tuple format
            return {'msg': result}, 200
        else:
            return {'msg': 'No sub account found'}, 404
        
    except Exception as e:
        print(e)
        return {'msg': str(e)}, 500

@app.route('/get_letters', methods=['GET'])
@jwt_required()
def get_letters():
    conn = DBConn()
    
    (user, type_) = get_jwt_identity()
    try:
        print('ASDASDA')
        conn.cursor.execute(
            'SELECT id, content, s1.name as owner_name, s2.name as receiver_name, sent_at FROM letters, sub_acct s1, sub_acct s2 WHERE owner = %s AND owner = s1.username AND receiver = s2.username',
            (user, )
        )
        sent = conn.cursor.fetchall()
        conn.cursor.execute(
            'SELECT id, content, s1.name as owner_name, s2.name as receiver_name, sent_at FROM letters, sub_acct s1, sub_acct s2 WHERE receiver = %s AND owner = s1.username AND receiver = s2.username',
            (user, )
        )
        received = conn.cursor.fetchall()
        sent = list(map(lambda x: {"id": x[0], "text": x[1], "owner_name": x[2], "receiver_name": x[3], "date": x[4]}, sent))
        received = list(map(lambda x: {"id": x[0], "text": x[1], "owner_name": x[2], "receiver_name": x[3], "date": x[4]}, received))
        return {'sent': sent, 'received': received}, 200
    except Exception as e:
        print(e)
        return {'msg': str(e)}, 500

@app.route('/send_letter', methods=['POST'])
@jwt_required()
def send_letter():
    conn = DBConn()

    (owner, type_) = get_jwt_identity()
    content = request.json['content']

    try:
        conn.cursor.execute(
            'SELECT matched FROM sub_acct WHERE username = %s',
            (owner,)
        )
        receiver = conn.cursor.fetchone()[0]
        if receiver is None:
            return {'msg': 'You do not have a match yet.'}, 403
        
        conn.cursor.execute(
            'SELECT MAX(id) FROM letters'
        )
        max_id = conn.cursor.fetchone()[0]
        if max_id is None:
            max_id = 0
        else:
            max_id = max_id + 1
        
        conn.cursor.execute(
            'INSERT INTO letters (id, content, owner, receiver, sent_at) VALUES (%s, %s, %s, %s, %s)',
            (max_id, content, owner, receiver, datetime.now())
        )
        conn.commit()
        return {'msg': 'Success'}, 200
    except Exception as e:
        return {'msg': str(e)}, 500



# Running app
if __name__ == '__main__':
    app.run(debug=True)