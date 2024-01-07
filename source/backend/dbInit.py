from classes.dbConn import DBConn
import sys

def main():
    db = DBConn()

    # add command line argument 'd' to drop tables
    # !!! WARNING: THIS WILL DELETE ALL DATA IN THE DATABASE !!!
    if len(sys.argv) > 1:
        if sys.argv[1] == 'd':
            db.cursor.execute(
                'DROP TABLE IF EXISTS managers, sub_acct, letters'
            )
            db.connection.commit()
            print('Tables dropped')

    db.cursor.execute(
        '''CREATE TABLE IF NOT EXISTS managers (
            username varchar(255) PRIMARY KEY,
            password varchar(255) NOT NULL,
            type varchar(255) NOT NULL,
            email varchar(255),
            name varchar(255)
        );
                      
        CREATE TABLE IF NOT EXISTS sub_acct (
            username varchar(255) PRIMARY KEY,
            password varchar(255) NOT NULL,
            name varchar(255) NOT NULL,
            type varchar(255) NOT NULL,
            manager varchar(255) NOT NULL,
            matched varchar(255),
            FOREIGN KEY (manager) REFERENCES managers(username),
            FOREIGN KEY (matched) REFERENCES sub_acct(username)
        );
            
        CREATE TABLE IF NOT EXISTS letters (
            id int PRIMARY KEY,
            content TEXT,
            owner varchar(255) NOT NULL,
            receiver varchar(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            sent_at TIMESTAMP,
            FOREIGN KEY (owner) REFERENCES sub_acct(username),
            FOREIGN KEY (receiver) REFERENCES sub_acct(username)
        );
        ''')
    db.connection.commit()
    print('Tables created')

if __name__ == '__main__':
    main()