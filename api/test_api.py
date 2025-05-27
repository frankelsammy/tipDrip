import unittest
import json
from app import app, payments

class TestFlaskAPI(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_post_payment(self):
        # Store original count
        original_len = len(payments)

        # Send POST request
        new_payment = {"amount": 42.00}
        response = self.client.post(
            "/payments",
            data=json.dumps(new_payment),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data["amount"], new_payment["amount"])
        self.assertIn("id", data)

        # Ensure payment was added
        self.assertEqual(len(payments), original_len + 1)
        self.assertEqual(payments[-1], data)

if __name__ == '__main__':
    unittest.main()
