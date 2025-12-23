from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

FRANKFURTER_LATEST = "https://api.frankfurter.app/latest"
FRANKFURTER_CURRENCIES = "https://api.frankfurter.app/currencies"


# 🔹 Home page
@app.route("/")
def index():
    return render_template("index.html")


# 🔹 All currencies list (VERY IMPORTANT)
@app.route("/currencies")
def currencies():
    response = requests.get(FRANKFURTER_CURRENCIES)
    return jsonify(response.json())


# 🔹 Live exchange rate
@app.route("/rate")
def get_rate():
    from_currency = request.args.get("from")
    to_currency = request.args.get("to")

    response = requests.get(
        FRANKFURTER_LATEST,
        params={"from": from_currency, "to": to_currency}
    )

    data = response.json()
    rate = data["rates"][to_currency]

    return jsonify({
        "from": from_currency,
        "to": to_currency,
        "rate": rate
    })


# 🔹 Live currency conversion
@app.route("/convert")
def convert():
    from_currency = request.args.get("from")
    to_currency = request.args.get("to")
    amount = float(request.args.get("amount"))

    response = requests.get(
        FRANKFURTER_LATEST,
        params={"from": from_currency, "to": to_currency}
    )

    data = response.json()
    rate = data["rates"][to_currency]
    converted_amount = amount * rate

    return jsonify({
        "from": from_currency,
        "to": to_currency,
        "amount": amount,
        "rate": rate,
        "convertedAmount": converted_amount
    })


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


