import React from "react";
import todoLogo from '../assets/To-do.svg';
import inProgressLogo from '../assets/in-progress.svg';
import backlogLogo from '../assets/Backlog.svg';
import canceledLogo from '../assets/Cancelled.svg';
import doneLogo from '../assets/Done.svg';

const getStatusLogo = (status) => {
  switch (status) {
    case "Todo":
      return <img src={todoLogo} alt="Todo" className="status-logo" />;
    case "In progress":
      return <img src={inProgressLogo} alt="In Progress" className="status-logo" />;
    case "Backlog":
      return <img src={backlogLogo} alt="Backlog" className="status-logo" />;
    case "Canceled":
      return <img src={canceledLogo} alt="Canceled" className="status-logo" />;
    case "Done":
      return <img src={doneLogo} alt="Done" className="status-logo" />;
    default:
      return null;
  }
};

const getProfilePhoto = (title) => {
  const firstLetter = title.charAt(0).toUpperCase();
  return (
    <div className="profile-photo">
      {firstLetter}
    </div>
  );
};

const Card = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-id-and-photo">
          <span className="ticket-id">{ticket.id}</span>
        </div>

      </div>

      <div className="" style={{ display: 'flex', justifyContent: 'center', justifyItems:'center' }}>
          <div style={{marginTop: '14px'}}>
          {getStatusLogo(ticket.status)} 
          </div>
          <h3 className="ticket-title">{ticket.title}</h3>
      </div>
      <div className="ticket-meta">
        {ticket.tag && (
          <div className="ticket-tags">
            {ticket.tag.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
