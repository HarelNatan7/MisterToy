import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { ImgUploader } from "./img-uploader";

export function ToyPreview({ toy, onRemoveToy }) {

    return <article className="toy-preview">
        <h2>{toy.name}</h2>
        <h4>Price: {toy.price}</h4>
        {/* <img src={`https://robohash.org/${toy._id}?set=set2`} /> */}
        <ImgUploader toy={toy} />
        <div className="toy-labels">
            Categories: [
        {toy.labels.map((label, idx) => <span key={idx}>{label}{idx === toy.labels.length - 1 ? '' : ', '}</span> )}
            ]
        </div>
        <div className="btn-container">
            <button onClick={() => onRemoveToy(toy._id)}>Delete</button>
            <Link className="nice-link" to={`/toy/${toy._id}`}> Details</Link>
            <Link className="nice-link" to={`/toy/edit/${toy._id}`}> Edit</Link>
        </div>
    </article>
}