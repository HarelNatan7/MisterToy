import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from "../store/toy.action.js"
import { ToyList } from "../cmps/toy-list.jsx"
import { ToyFilter } from "../cmps/toy-filter.jsx";

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    return <section className='toys-index'>

        <Link className="nice-link" to="/toy/edit">New Toy Here!</Link>
        {/* <ToyFilter /> */}
        {toys && <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy} />}
    </section>
}
