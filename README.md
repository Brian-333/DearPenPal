# DearPenPal
This project was created for HackED 2024
## Running Instructions (checked only on Windows)
### Backend
* In `backend`, run `python -m venv venv`
* After that, run `venv\Scripts\activate`
* In the new terminal, run the following commands in the same order:
    * `pip install flask`
    * `pip install flask_jwt_extended`
    * `pip install psycopg2`
    * `deactivate`
* For this step, you will also need an instance of PostgresSQL running. You need to create a file `db_config.json` in folder `backend` according to the format:
```
{
    "database": "",
    "user": "",
    "password": "",
    "host": "",
    "port": 
}
```
And you need to fill it out accordingly (port is an int)
* Start your database instance, run `python dbInit.py`
* To run the backend, run `venv\Scripts\flask run` in `backend`
### Frontend
* Install Node.js and yarn
* In folder `frontend`, run `npm install`
* To start the frontend, run `yarn start`
