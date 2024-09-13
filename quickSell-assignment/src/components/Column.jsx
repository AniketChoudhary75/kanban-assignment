import React from "react";
import Card from "./Card";
import urgentLogo from '../assets/SVG - Urgent Priority colour.svg';
import highLogo from '../assets/Img - High Priority.svg';
import mediumLogo from '../assets/Img - Medium Priority.svg';
import lowLogo from '../assets/Img - Low Priority.svg';
import noPriorityLogo from '../assets/No-priority.svg';
import plusLogo from '../assets/add.svg'; // Import plus icon
import moreLogo from '../assets/3 dot menu.svg'; // Import more icon
import backlogLogo from '../assets/Backlog.svg';
import inProgressLogo from '../assets/in-progress.svg';
import todoLogo from '../assets/To-do.svg';


// Function to map priority number to priority labels
const getPriorityLabel = (priority) => {
    switch (priority) {
        case 4:
            return (
                <div className="priority-label">
                    <img src={urgentLogo} alt="Urgent" className="priority-logo" />
                    Urgent
                </div>
            );
        case 3:
            return (
                <div className="priority-label">
                    <img src={highLogo} alt="High" className="priority-logo" />
                    High
                </div>
            );
        case 2:
            return (
                <div className="priority-label">
                    <img src={mediumLogo} alt="Medium" className="priority-logo" />
                    Medium
                </div>
            );
        case 1:
            return (
                <div className="priority-label">
                    <img src={lowLogo} alt="Low" className="priority-logo" />
                    Low
                </div>
            );
        default:
            return (
                <div className="priority-label">
                    <img src={noPriorityLogo} alt="No Priority" className="priority-logo" />
                    No Priority
                </div>
            );
    }
};

// Function to map status to its logo, including new "Canceled" and "Done" statuses
const getStatusLabel = (status) => {
    switch (status) {
        case "Todo":
            return (
                <div className="status-label">
                    <img src={todoLogo} alt="Todo" className="status-logo" />
                    Todo
                </div>
            );
        case "In progress":
            return (
                <div className="status-label">
                    <img src={inProgressLogo} alt="In Progress" className="status-logo" />
                    In Progress
                </div>
            );
        case "Backlog":
            return (
                <div className="status-label">
                    <img src={backlogLogo} alt="Backlog" className="status-logo" />
                    Backlog
                </div>
            );
        case "Canceled":
            return (
                <div className="status-label">
                    <img src={canceledLogo} alt="Canceled" className="status-logo" />
                    Canceled
                </div>
            );
        case "Done":
            return (
                <div className="status-label">
                    <img src={doneLogo} alt="Done" className="status-logo" />
                    Done
                </div>
            );
        default:
            return status; // Return status without a logo if not specified
    }
};

const Column = ({ groupTitle, tickets, grouping }) => {
    // Determine whether to display priority label, user name, or status
    const displayGroupTitle = () => {
        if (grouping === "priority") {
            return getPriorityLabel(parseInt(groupTitle));
        } else if (grouping === "user") {
            return groupTitle === 'null' ? 'Unassigned' : groupTitle; // Display "Unassigned" if no user
        } else if (grouping === "status") {
            return getStatusLabel(groupTitle); // Display logo + status when grouping by status
        }
    };

    return (
        <div className="kanban-column">
            <div className="column-header">
                <h2>{displayGroupTitle()}</h2>
                <span>{tickets.length} </span> {/* Display count of todos */}
                <div className="column-icons">
                    <img src={plusLogo} alt="Add" className="column-icon" />
                    <img src={moreLogo} alt="More Options" className="column-icon" />
                </div>
            </div>
            <div className="tickets-list">
                {tickets.map(ticket => (
                    <Card key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default Column;