import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
      <header id="showcase" class="grid">
        <div class='bg-image'></div>
        <div class="content-wrapper">
          <h1>BookHuddle</h1>
          <p>Enlightenment self philosophy enlightenment of. Joy dead against intentions deceptions. Self value dead decrepit grandeur morality god passion madness fearful.</p>
          <a href='#section-a' class='btn'>Read More</a>
        </div>
      </header>
      <main id='main'>
        <section id='section-a' class='grid'>
          <div class='content-wrapper'>
            <h2 class="content-title">How it Works</h2>
          </div>
          <ul>
            <li>
              <div class="cardbox">
                <i class="fas fa-user-circle"></i>
                <div class="card-content">
                  <h3 class ="card-title">Create a free account</h3>
                  <p>God victorious gains holiest aversion holiest depths evil reason.</p>
                </div>
              </div>
            </li>
            <li>
              <div class="cardbox">
                <i class="fas fa-search"></i>
                <div class="card-content">
                  <h3 class ="card-title">Find or create a club</h3>
                  <p>Value selfish pious zarathustra burying convictions mountains sexuality abstract aversion horror.</p>
                </div>
              </div>
            </li>
            <li>
              <div class="cardbox">
                <i class="fas fa-comments"></i>
                <div class="card-content">
                  <h3 class ="card-title">Participate in the discussion</h3>
                  <p>Strong truth play aversion revaluation horror contradict sea good</p>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section id="section-b" class="grid">
          <div class='content-wrapper'>
            <h2 class="content-title">Our Top Picks</h2>
            <div class="carousel-list">
            <div class="carousel-card">
              <img class="carousel-card-img" src="http://covers.openlibrary.org/b/isbn/0451207149-M.jpg" alt="" />
              <h3 class="card-title">The Pillars of the Earth</h3>
            <p><em>by Ken Follett</em></p>
            </div>
            <div class="carousel-card">
              <img class="carousel-card-img" src="http://covers.openlibrary.org/b/isbn/0316204277-M.jpg" alt="" />
              <h3 class="card-title">Where'd You Go Bernadette</h3>
              <p><em>by Maria Semple</em></p>
            </div>
            <div class="carousel-card">
              <img class="carousel-card-img" src="http://covers.openlibrary.org/b/isbn/0399155341-M.jpg" alt="" />
              <h3 class="card-title">The Help</h3>
              <p><em>by Kathryn Stockett</em></p>
            </div>
            </div>
          </div>
        </section>

        <section id='section-c' class='grid'>
          <div class='box'>
            <h2 class="content-title">What Others Are Saying</h2>
            <p>Enlightenment self philosophy enlightenment of.</p>
          </div>
          <div class='box'>
            <h2 class="content-title">Get Started Today</h2>
            <p>Enlightenment self philosophy enlightenment of. Joy dead against intentions deceptions.</p>
            <a href='#' class='btn'>Sign up</a>
          </div>
        </section>
      </main>

      <footer id='main-footer' class='grid'>
        <div>Book Huddle</div>
        <div>Project by LetsGetGoing</div>
      </footer>
      </div>
    );
  }
}

export default Home;