import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Card.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Card({ item, updateData }) {
    const [isHover, setHover] = useState(false);

    async function handleOnClick(id) {
        const res = await axios({
            method: "post",
            url: "http://localhost:3000/delete-item",
            data: { itemId: id },
            withCredentials: true,
        });
        console.log(res.data);

        setTimeout(() => updateData(), 100);
    }

    return (
        <div
            className="card"
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <div className="card-title">
                <h3>{item.company}</h3>
                <h4>
                    <a href={item.link}>{item.position}</a>
                </h4>
            </div>
            <p>{item.description.substring(0, 30)}...<Link to={`/applications/${item._id}`}>More Details</Link></p>
            {isHover && (
                <button
                    className="delete"
                    onClick={() => handleOnClick(item._id)}
                >
                    <DeleteIcon />
                </button>
            )}
        </div>
    );
}
