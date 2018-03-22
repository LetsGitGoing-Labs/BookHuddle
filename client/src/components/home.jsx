import React from 'react';
import Book from './book.jsx';
import MainNavbar from './main-navbar.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  smoothScroll() {

    $('html, body').animate({
      scrollTop: $("#how-it-works").offset().top
    }, 1000);
  }

  render() {
    const bookList = [
      { title: "The Pillars of the Earth", author: "Ken Follet", cover: "http://covers.openlibrary.org/b/isbn/0451207149-M.jpg"},
      { title: "Where'd You Go Bernadette", author: "Maria Semple", cover: "http://covers.openlibrary.org/b/isbn/0316204277-M.jpg"},
      {title: "The Help", author:"Kathryn Stockett", cover:"http://covers.openlibrary.org/b/isbn/0399155341-M.jpg"}
    ]
    return (
      <div>
        <MainNavbar login={this.props.login} signup={this.props.signup}
          isLoggedIn={this.props.isLoggedIn}/>
        <header id="showcase" className="grid info-section">
          <div className='bg-image'></div>
          <div className="bg-overlay"></div>
          <div className="content-wrapper">
            <h1 className="showcase-header">BookHuddle</h1>
            <p className="showcase-text pars">BookHuddle is an app for creating, joining and managing book clubs. Meet new friends who share your reading tastes, and through your book club, find the perfect next books to read!</p>
            <button className='btn' onClick={this.smoothScroll.bind(this)}>Read More</button>
          </div>
        </header>
        <main id='main'>
          <section id='how-it-works' className='grid'>
            <div className='content-wrapper'>
              <h2 className="content-title">How it Works</h2>
            <div className="content-wrapper info-cards">
              <div className="card-box">
                <div className="card-content">
                  <h3 className ="card-title">Create a free account</h3>
                  <p>Sign up and start browsing book clubs by book genre or search by keywords or location. </p>
                </div>
              </div>
              <div className="card-box">
                <div className="card-content">
                  <h3 className ="card-title">Create a club</h3>
                  <p>Start your own club that you can make public or private. Pick what genres your club will be reading and add a description to help other readers find you.</p>
                  </div>
                </div>
                <div className="card-box">
                  <div className="card-content">
                    <h3 className ="card-title">Get Connected</h3>
                    <p>Stay up to date with your book club and join in the discussion using your club's message board. Get notified of upcoming meetings.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="section-b" className="grid book-carousel">
            <div className='content-wrapper'>
              <h2 className="content-title">Our Top Picks</h2>
              <p><em>Popular books from our book clubs!</em></p>
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
              <h2 className="content-title">Get in the Huddle</h2>
              <p>Read your next classic with friends.</p>
              <a href='#' className='btn'>Sign up</a>
            </div>
          </section>
        </main>

        <footer id='main-footer' className='grid'>
          <p>Book Huddle</p>
          <p>Project by LetsGetGoing</p>
        </footer>
      </div>
    );
  }
}

export default Home;