import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

export function ToyPreview({ toy, onRemoveToy }) {

    return <article className="toy-preview">
        <h2>Name: {toy.name}</h2>
        <h4>Price: {toy.price}</h4>
        <h5>🧸</h5>
        <div className="toy-labels">
            Categories: [
        {toy.labels.map((label, idx) => <span key={idx}>{label}, </span> )}
            ]
        </div>
        <div className="btn-container">
            <button onClick={() => onRemoveToy(toy._id)}>Delete</button>
            <Link className="nice-link" to={`/toy/edit/${toy._id}`}> Edit</Link>
        </div>
    </article>
}