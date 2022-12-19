import { Loading } from "../../Frontend/Loading";
import "./Card.css";

export function Card(props) {
    if (props.loading) {
        return (
            <div className="col-12 col-md-6">
                <div className="card shadow">{Loading()}</div>
            </div>
        );
    }
    return (
        <div className="col-12 col-md-6">
            <div className="card shadow">
                <h5 className="card-title">{props.title}</h5>
                <div className="card-body">{props.content}</div>
            </div>
        </div>
    );
}
