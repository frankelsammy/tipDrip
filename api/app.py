from flask import Flask, jsonify, request

app = Flask(__name__)

payments = [
    {"id": 1, "amount": 10.00},
    {"id": 2, "amount": 2.00},
    {"id": 3, "amount":  3.00}
]

# GET all books
@app.route('/payments', methods=['GET'])
def get_books():
    return jsonify(payments)

@app.route('/payments', methods=['POST'])
def add_payment():
    new_payment = request.get_json()
    new_payment["id"] = max(payment["id"] for payment in payments) + 1
    payments.append(new_payment)
    return jsonify(new_payment), 201

if __name__ == '__main__':
    app.run(debug=True, port=8000)
