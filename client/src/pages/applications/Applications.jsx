import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/card/card";
import "./Applications.css";
import AddIcon from '@mui/icons-material/Add';

export default function Applications({ isAuth }) {
    const [entry, setEntry] = useState({
        companyName: "",
        position: "",
        link: "",
        description: "",
    });

    const [forms, setForms] = useState(null);
    const [showFields, setShowFields] = useState(false);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3000/get-user-forms",
            withCredentials: true,
        });
    });

    function addData() {
        axios({
            method: "post",
            url: "http://localhost:3000/add-data",
            data: entry,
            withCredentials: true,
        })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setEntry((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    function handleClick() {
        setShowFields(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setShowFields(false);

        // add entry to List
        addData();
    }

    return (
        <>
            {!isAuth ? (
                <Navigate to="/login" replace />
            ) : (
                <>
                    <h2>Applications</h2>
                    <div className="app-box">
                        <form onSubmit={handleSubmit}>
                            <div className="app-form">
                                {showFields && (
                                    <>
                                        <input
                                            onChange={handleChange}
                                            className="app-field expand"
                                            type="text"
                                            name="companyName"
                                            value={entry.companyName}
                                            placeholder="Company Name"
                                        />
                                        <input
                                            onChange={handleChange}
                                            className="app-field"
                                            type="text"
                                            name="position"
                                            value={entry.position}
                                            placeholder="Position"
                                        />
                                        <input
                                            onChange={handleChange}
                                            className="app-field"
                                            type="text"
                                            name="link"
                                            value={entry.link}
                                            placeholder="Link"
                                        />
                                    </>
                                )}
                                <textarea
                                    onClick={handleClick}
                                    onChange={handleChange}
                                    className={
                                        showFields
                                            ? "app-field expand"
                                            : "app-field minimize"
                                    }
                                    name="description"
                                    value={entry.description}
                                    placeholder="Description"
                                    rows={showFields ? "8" : "1"}
                                />
                            </div>
                            {showFields && (
                                <button className="app-submit" type="submit">
                                    <AddIcon />
                                </button>
                            )}
                        </form>
                    </div>
                    <div className="card-grid">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </>
            )}
        </>
    );
}
