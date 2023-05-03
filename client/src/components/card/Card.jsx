import "./Card.css";

export default function Card({ item }) {
    return (
        <div className="card">
            <div className="card-title">
                <h3>Company</h3>
                <a href="#"><h4>Position</h4></a>
            </div>
            <div>
                <p>Description</p>
            </div>
        </div>
    )
}