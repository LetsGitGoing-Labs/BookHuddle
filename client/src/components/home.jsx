import React from 'react';
import Book from './book.jsx';

class Home extends React.Component {
  render() {
    const bookList = [
    { title: "The Pillars of the Earth", author: "Ken Follet", cover: "http://covers.openlibrary.org/b/isbn/0451207149-M.jpg"},
    { title: "Where'd You Go Bernadette", author: "Maria Semple", cover: "http://covers.openlibrary.org/b/isbn/0316204277-M.jpg"},
    {title: "The Help", author:"Kathryn Stockett", cover:"http://covers.openlibrary.org/b/isbn/0399155341-M.jpg"}
    ]
    return (
      <div>
      <header id="showcase" className="grid">
        <div className='bg-image'></div>
        <div className="content-wrapper">
          <h1>BookHuddle</h1>
          <p>Enlightenment self philosophy enlightenment of. Joy dead against intentions deceptions. Self value dead decrepit grandeur morality god passion madness fearful.</p>
          <a href='#section-a' className='btn'>Read More</a>
        </div>
      </header>
      <main id='main'>
        <section id='section-a' className='grid'>
          <div className='content-wrapper'>
            <h2 className="content-title">How it Works</h2>
          </div>
          <ul>
            <li>
              <div className="cardbox">
                <i className="fas fa-user-circle"></i>
                <div className="card-content">
                  <h3 className ="card-title">Create a free account</h3>
                  <p>God victorious gains holiest aversion holiest depths evil reason.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="cardbox">
                <i className="fas fa-search"></i>
                <div className="card-content">
                  <h3 className ="card-title">Find or create a club</h3>
                  <p>Value selfish pious zarathustra burying convictions mountains sexuality abstract aversion horror.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="cardbox">
                <i className="fas fa-comments"></i>
                <div className="card-content">
                  <h3 className ="card-title">Participate in the discussion</h3>
                  <p>Strong truth play aversion revaluation horror contradict sea good</p>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section id="section-b" className="grid">
          <div className='content-wrapper'>
            <h2 className="content-title">Our Top Picks</h2>
            <div className="carousel-list">
              { bookList.map((book, index) => <Book key={index} book={book} /> ) }
            </div>
          </div>
        </section>

        <section id='section-c' className='grid'>
          <div className='box'>
            <h2 className="content-title">What Others Are Saying</h2>
            <p>Enlightenment self philosophy enlightenment of.</p>
          </div>
          <div className='box'>
            <h2 className="content-title">Get Started Today</h2>
            <p>Enlightenment self philosophy enlightenment of. Joy dead against intentions deceptions.</p>
            <a href='#' className='btn'>Sign up</a>
          </div>
        </section>
      </main>

      <footer id='main-footer' className='grid'>
        <div>Book Huddle</div>
        <div>Project by LetsGetGoing</div>
      </footer>
      </div>
    );
  }
}

export default Home;