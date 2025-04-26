/** @format */

function Prayer({ Name, Time }) {
    return (
        <div className="prayer-card">
            <span className="prayer-name">{Name}</span>
            <span className="prayer-time">{Time}</span>
        </div>
    );
}

export default Prayer;
