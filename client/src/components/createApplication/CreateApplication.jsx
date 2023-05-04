import { useState } from "react";
import axios from "axios";
import "./CreateApplication.css";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

export default function CreateApplication({ updateData }) {
    const defaultEntry = {
        companyName: "",
        position: "",
        link: "",
        description: "",
    };

    const [entry, setEntry] = useState(defaultEntry);

    const [textFocused, setTextFocused] = useState(false);

    async function addData() {
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3000/add-data",
                data: entry,
                withCredentials: true,
            })
            console.log(response.data);
        } catch (e) {
            console.log(err);
        }
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

    function handleClickAdd() {
        addData();
        setTextFocused(false);
        setEntry(defaultEntry);

        setTimeout(() => {
            updateData();
        }, 100);
    }

    return (
        <div className="app-box">
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="app-form">
                    {textFocused && (
                        <>
                            <input
                                autoFocus={textFocused}
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
                        onClick={() => setTextFocused(true)}
                        onChange={handleChange}
                        className={
                            textFocused
                                ? "app-field expand"
                                : "app-field minimize"
                        }
                        name="description"
                        value={entry.description}
                        placeholder="Description"
                        rows={textFocused ? "8" : "1"}
                    />
                    {textFocused && (
                        <Zoom in={true}>
                            <Fab
                                onClick={handleClickAdd}
                                className="app-submit"
                                size="small"
                            >
                                <AddIcon className="add-btn" />
                            </Fab>
                        </Zoom>
                    )}
                </div>
            </form>
        </div>
    );
}
