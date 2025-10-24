import { useState } from 'react'
import './Homepage.css'
import book1 from "../assets/book1.jpg"
import book2 from "../assets/book2.png"
import book3 from "../assets/book3.gif"


function Homepage() {
  const [cartCount, setCartCount] = useState(0)

  const addToCart = () => {
    setCartCount(cartCount + 1)
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <h1 className="logo">📚 Korn Bookstore</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Books</a>
          <a href="#">Contact</a>
        </nav>
        <div className="cart">🛒 {cartCount}</div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to Korn Bookstore</h2>
        <p>Find your next great read with us!</p>
      </section>

      {/* Book List */}
      <section className="book-list">
        <div className="book">
          <img src={book1} alt="Book 1" />
          <h3>The Great Adventure</h3>
          <p>฿250</p>
          <button onClick={addToCart}>Add to Cart</button>
        </div>

        <div className="book">
          <img src={book2} alt="Book 2" />
          <h3>Secrets of the Universe</h3>
          <p>฿320</p>
          <button onClick={addToCart}>Add to Cart</button>
        </div>

        <div className="book">
          <img src={book3} alt="Book 3" />
          <h3>Learn React the Fun Way</h3>
          <p>฿290</p>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Korn Bookstore. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Homepage
