import { Link, Navigate, useLoaderData } from "react-router-dom";
import "./ApplicationDetails.css";
import axios from "axios";

export default function ApplicationDetails({ isAuth }) {
    const data = useLoaderData();

    return (
        <>
            {!isAuth ? (
                <Navigate to="/login" replace />
            ) : (
                <>
                    {!data ? (
                        <div>
                            <h2>No data available!</h2>

                            <div className="nav-back">
                                <Link to="/applications">Back</Link>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2>Application Details</h2>
                            <div className="detail-title">
                                <h3 className="company">{data.company}</h3>
                                <h4 className="position">
                                    Position: {data.position}
                                </h4>
                                <a href={data.link}>Job Posting</a>
                            </div>
                            <p className="details">{data.description}</p>

                            <div className="nav-back">
                                <Link to="/applications">Back</Link>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export const detailsLoader = async ({ params }) => {
    const { id } = params;

    const res = await axios({
        method: "get",
        url: `http://localhost:3000/details/${id}`,
        withCredentials: true,
    });

    return res.data;
};
