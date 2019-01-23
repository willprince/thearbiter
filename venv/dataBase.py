import sqlite3

conn = sqlite3.connect('arbiter.db')
c = conn.cursor()



def createTables ():
    try:
        c.execute('''CREATE TABLE PriceData (idEx text, idPair text,  time datetime , closing real)''')
    except Exception:
        pass
    try:
        c.execute('''CREATE TABLE Exchanges (idEx text, exchange text)''')
    except Exception:
        pass
    try:
        c.execute('''CREATE TABLE Pairs (idPair text)''')
    except Exception:
        pass
    try:
        c.execute('''CREATE TABLE Difference (idPair text, highEx text, lowEx text, diff real)''')
    except Exception:
        pass

def dropTables ():
    try:
        c.execute('''DROP TABLE PriceData''')
    except Exception:
        pass
    try:
        c.execute('''DROP TABLE Exchanges''')
    except Exception:
        pass
    try:
        c.execute('''DROP TABLE Pairs''')
    except Exception:
        pass

def insertPriceData(idex, idPair, time, close):

    c.execute("INSERT INTO PriceData VALUES ('" + idex + "','" + idPair + "','" + time + "','" + str(close) + "')")
    conn.commit()

def insertDifference(idPair, highEx, lowEx, diff):
    c.execute("INSERT INTO PriceData VALUES ('" + idPair + "','" + highEx + "','" + lowEx + "','" + str(diff) + "')")
    conn.commit()

#dropTables()
#createTables()
print ("done")



