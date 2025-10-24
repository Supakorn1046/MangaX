import { FaSearch, FaShoppingCart,  } from "react-icons/fa";
import { MdLogin,MdOutlineShoppingCart  } from "react-icons/md";
import "./Homepage.css";
import logo from "../assets/logo.png"; 
const books = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    price: "$12.99",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: "$15.99",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: "$10.99",
    image: "https://via.placeholder.com/150"
  },
];

function Homepage() {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        
         <img src={logo} alt="BookStore Logo" className="logo" />
         
        <nav>
          <a href="#home">หน้าแรก</a>
          <a href="#shop">10 อันดับ</a>
      
        </nav>
         <div className="search-container">
            <MdOutlineShoppingCart className="header-icon" />
        <MdLogin className="header-icon" />
        <input
          type="text"
          placeholder="ค้นหาหนังสือตามชื่อเรื่อง"
          className="search-bar"
        />
        <FaSearch className="search-icon" />
      </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Discover Your Next Favorite Book</h2>
        <p>Find the best books from various genres all in one place!</p>
        <button>Shop Now</button>
      </section>

      {/* Featured Books */}
      <section className="books-section">
        <h2>Featured Books</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{book.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 BookStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
