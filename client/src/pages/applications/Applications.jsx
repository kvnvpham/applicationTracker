import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import CreateApplication from "../../components/createApplication/CreateApplication";
import Card from "../../components/card/card";
import "./Applications.css";

export default function Applications({ isAuth }) {
    const [items, setItems] = useState(null);

    useEffect(() => {
        if (!items) {
            getData();
        }
    });

    async function getData() {
        const res = await axios({
            method: "get",
            url: "http://localhost:3000/get-user-data",
            withCredentials: true,
        });
        setItems(res.data.data);
    }

    return (
        <>
            {!isAuth ? (
                <Navigate to="/login" replace />
            ) : (
                <>
                    <h2>Applications</h2>
                    <div className="application">
                        <CreateApplication updateData={getData} />
                        <div className="counter">
                            <h3>
                                {items ? <>{items.length}</> : 0} Application(s)
                            </h3>
                        </div>
                    </div>
                    <div className="card-grid">
                        {items &&
                            items.map((selectItem, index) => {
                                const uniqueKey = uuidv4();
                                return (
                                    <Card
                                        key={uniqueKey}
                                        item={selectItem}
                                        updateData={getData}
                                    />
                                );
                            })}
                    </div>
                </>
            )}
        </>
    );
}
