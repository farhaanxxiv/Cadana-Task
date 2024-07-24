from flask import Flask, request, jsonify
import mysql.connector
from datetime import datetime
import time    
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="farhaan", 
        password="farhaan24",
        database="cadana"
    )

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.json
    sushiA = data['sushiA']
    sushiB = data['sushiB']
    price = data['price']
    discountedPrice = data['discountedPrice']
    orderid = data['orderid']
    time = data['time']
 
    total = sushiA + sushiB

    # Insert order
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO orders (orderid, sushia, sushib, time, total, price, discountedprice) VALUES (%s, %s, %s,%s, %s, %s,%s)",
        (orderid, sushiA,sushiB, time, total,price, discountedPrice)
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"order_id": orderid, "discounted_price": discountedPrice})

@app.route('/fetch_orders', methods=['GET'])
def fetch_orders():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM orders")
    orders = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(orders)

if __name__ == '__main__':
    app.run(debug=True)
