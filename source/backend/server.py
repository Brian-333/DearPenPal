from flask import Flask, jsonify, request
from classes.dbConn import DBConn
from datetime import timedelta
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "some-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

@app.route('/manager_create', methods=['POST'])
def manager_create():
    conn = DBConn()

    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    name = request.json['name']

    try:
        conn.cursor.execute(
            'INSERT INTO managers (username, password, email, name) VALUES (%s, %s, %s, %s)',
            (username, password, email, name)
        )
        conn.commit()
        return jsonify({'msg': 'Success'}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    
@app.route('/manager_login', methods=['POST', 'GET'])
def manager_login():
    conn = DBConn()

    username = request.json['username']
    password = request.json['password']

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
        return jsonify({"msg": str(e)}), 500

# Running app
if __name__ == '__main__':
    app.run(debug=True)