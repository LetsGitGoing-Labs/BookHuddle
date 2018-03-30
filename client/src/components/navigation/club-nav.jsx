import React from 'react';

const ClubPageNavbar = () => (
  <nav className="centered">
    <div className="nav" id="club-page-nav" role="tablist">
      <a className="nav-link active" id="nav-upcoming-tab" data-toggle="tab" href="#nav-upcoming" role="tab" aria-controls="nav-upcoming" aria-selected="true">Upcoming</a>
      <a className="nav-link" id="nav-members-tab" data-toggle="tab" href="#nav-members" role="tab" aria-controls="nav-members" aria-selected="false">Members</a>
      <a className="nav-link" id="nav-history-tab" data-toggle="tab" href="#nav-history" role="tab" aria-controls="nav-history" aria-selected="false">Book History</a>
      <a className="nav-link" id="nav-create-meeting-tab" data-toggle="tab" href="#nav-create-meeting" role="tab" aria-controls="nav-create-meeting" aria-selected="false">New Meeting</a>
    </div>
  </nav>
);

export default ClubPageNavbar;
