import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { filterToys, loadToys, removeToy, saveToy } from "../store/toy.action.js"
import { ToyList } from "../cmps/toy-list.jsx"
import { ToyFilter } from "../cmps/toy-filter.jsx";

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        filterToys(filterBy)
    }

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

        <ToyFilter onSetFilterBy={onSetFilterBy} />
        <div className="new-toy-container">
        <Link className="nice-link" to="/toy/edit">New Toy Here!</Link>
        </div>
        {toys && <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy} />}
    </section>
}
