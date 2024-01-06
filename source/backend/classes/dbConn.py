import psycopg2 # PostgreSQL database adapter for Python
import json

# Load config file (db_config.json has to be in the backend folder)
# {
#     "database": "",
#     "user": "",
#     "password": "",
#     "host": "",
#     "port": 
# }
if __name__ == '__main__':
    with open('../db_config.json') as config_file:
        config = json.load(config_file)
else:
    with open('db_config.json') as config_file:
        config = json.load(config_file)

class DBConn:
    def __init__(self):
        self.connection = psycopg2.connect(
            database=config.get('database'),
            user=config.get('user'),
            password=config.get('password'),
            host=config.get('host'),
            port=config.get('port')
        )
        self.cursor = self.connection.cursor()

    def __del__(self):
        self.cursor.close()
        self.connection.close()
