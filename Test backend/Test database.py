import sqlite3 as lite
import sys

test = lite.connect('test.db')
test_cur = test.cursor()

def create_database():
    with test:
        test_cur.execute("CREATE TABLE samyloup(name TEXT, start_time INT, end_time INT)")
        print("done")
def insert_anniv():
    with test:
        test_cur.execute("INSERT INTO samyloup VALUES('anniv', 1616713200, 1616799599)")
        print("done")
def insert_event(event_name, start_time, end_time):
    with test:
        commande = "INSERT INTO samyloup VALUES('" + str(event_name) + "', " + str(start_time) + ", " + str(end_time) + ");"
        print(commande)
        test_cur.execute(commande)
    
