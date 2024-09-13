import React, { useState, useEffect } from "react";
import Column from "./Column";
const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState("priority");
    const [sorting, setSorting] = useState("priority");
    const [showControls, setShowControls] = useState(false); 

    useEffect(() => {
     
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then(response => response.json())
            .then(data => {
                setTickets(data.tickets);
                setUsers(data.users);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const groupBy = (tickets, groupByOption) => {
        switch (groupByOption) {
            case "status":
                return groupTicketsByStatus(tickets);
            case "user":
                return groupTicketsByUser(tickets);
            case "priority":
                return groupTicketsByPriority(tickets);
            default:
                return tickets;
        }
    };

    const sortTickets = (tickets, sortByOption) => {
        return [...tickets].sort((a, b) => {
            if (sortByOption === "priority") return b.priority - a.priority;
            if (sortByOption === "title") return a.title.localeCompare(b.title);
            return 0;
        });
    };

    const groupTicketsByStatus = (tickets) => {
        const statusGroups = tickets.reduce((groups, ticket) => {
            const status = ticket.status;
            if (!groups[status]) groups[status] = [];
            groups[status].push(ticket);
            return groups;
        }, {});
        return Object.entries(statusGroups);
    };

    const groupTicketsByUser = (tickets) => {
        const userGroups = tickets.reduce((groups, ticket) => {
            const userId = ticket.userId;
            if (!groups[userId]) groups[userId] = [];
            groups[userId].push(ticket);
            return groups;
        }, {});
        return Object.entries(userGroups).map(([userId, groupTickets]) => {
            const user = users.find(user => user.id === userId);
            const userName = user ? user.name : "Unknown User";
            return [userName, groupTickets]; 
        });
    };

    const groupTicketsByPriority = (tickets) => {
        const priorityGroups = tickets.reduce((groups, ticket) => {
            const priority = ticket.priority;
            if (!groups[priority]) groups[priority] = [];
            groups[priority].push(ticket);
            return groups;
        }, {});
        return Object.entries(priorityGroups);
    };

    const groupedTickets = groupBy(tickets, grouping);
    const sortedGroupedTickets = groupedTickets.map(([group, groupTickets]) => {
        return [group, sortTickets(groupTickets, sorting)];
    });

    return (
        <>
            <div className="header">
                <button onClick={() => setShowControls(!showControls)}>
                    {showControls ? "Hide Controls" : "Show Controls"}
                </button>

                {showControls && (
                    <div className="kanban-controls">
                        <span style={{ display: "flex", padding: "4px" }}>
                            <label>Group By </label>
                            <select value={grouping} onChange={e => setGrouping(e.target.value)}>
                                <option value="status">Status</option>
                                <option value="user">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </span>

                        <span style={{ display: "flex", padding: "4px" }}>
                            <label>Sort By </label>
                            <select value={sorting} onChange={e => setSorting(e.target.value)}>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </span>
                    </div>
                )}
            </div>

            <div className="kanban-board">
                {sortedGroupedTickets.map(([group, tickets]) => (
                    <Column key={group} groupTitle={group} tickets={tickets} grouping={grouping} />
                ))}
            </div>
        </>
    );
};

export default KanbanBoard;
