from flask import Flask, jsonify, request

app = Flask(__name__)

books = [
    {"id": 1, "title": "1984", "author": "George Orwell"},
    {"id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee"},
]

# GET all books
@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/books', methods=['POST'])
def add_book():
    new_book = request.get_json()
    new_book["id"] = max(book["id"] for book in books) + 1
    books.append(new_book)
    return jsonify(new_book), 201

if __name__ == '__main__':
    app.run(debug=True)
