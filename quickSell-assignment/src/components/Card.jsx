import React from "react";

// Card component to display individual tickets
const Card = ({ ticket }) => {

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">#{ticket.id}</span> {/* Display ticket ID */}
      </div>
      <h3 className="ticket-title">{ticket.title}</h3> {/* Display ticket title */}
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
