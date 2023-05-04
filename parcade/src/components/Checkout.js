import React, { useEffect, useState } from 'react';

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [priceID, setPriceID] = useState();
  const [recvAccID, setRecvAccID] = useState();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePriceID = (event) => {
    setPriceID(event.target.value)
  }
  const handleChangeRecvAccID = (event) => {
    setRecvAccID(event.target.value)
  }

  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const {
        unitAmount,
        currency
      } = await fetch('/config').then(r => r.json());
      setAmount(unitAmount);
      setCurrency(currency);
    }
    fetchConfig();
  }, []);

  return (
    <div className="sr-root">
      <div className="sr-main">
        <section className="container">
          <div>
            <h1>Single photo</h1>
            <h4>Purchase a Pasha original photo</h4>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://picsum.photos/280/320?random=4"
                width="140"
                height="160"
              />
            </div>
          </div>
          <form action="/create-checkout-session" method="POST">
            <div className="quantity-setter">
              <button
                className="increment-btn"
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
                type="button"
              >
                -
              </button>
              <input
                type="number"
                id="quantity-input"
                min="1"
                max="10"
                value={quantity}
                name="quantity"
                readOnly
              />
               <input
                id="priceID"
                value={priceID}
                name="priceID"
                onChange={handleChangePriceID}
              />
              <input
                id="recvAccID"
                value={recvAccID}
                name="recvAccID"
                onChange={handleChangeRecvAccID}
              />
              <button
                className="increment-btn"
                disabled={quantity === 10}
                onClick={() => setQuantity(quantity + 1)}
                type="button"
              >
                +
              </button>
            </div>
            <p className="sr-legal-text">Number of copies (max 10)</p>

            <button role="link" id="submit" type="submit">
              Buy {formatPrice({amount, currency, quantity})}
            </button>
          </form>
        </section>
      </div>
      <div className="sr-sub">
        <section className="container">
        <h1>User Creates Account</h1>
          <form action="/create-account" method="POST">
              <input
                id="user_email"
                value={email} 
                name="email"
                onChange={handleChangeEmail}
              />
              <input
                id="user_pass"
                value={password}
                name="password" 
                onChange={handleChangePassword}
              />
            <button role="link" id="submit" type="submit">
              Create Account: {email}
            </button>
          </form>
        </section>
      </div>
      <div className="sr-sub">
        <section className="container">
        <h1>Upgrade Account</h1>
          <form action="/upgrade-account" method="POST">
            <button role="link" id="submit" type="submit">
              Upgrade
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
