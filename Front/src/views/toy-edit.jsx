import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import Select from "react-select";

import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToy } from "../store/toy.action.js";

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [selectedOptions, setSelectedOptions] = useState();

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setToyToEdit(prevToy => {
            return { ...prevToy, [field]: value }
        })
    }

    function handleSelect(data) {
        setSelectedOptions(data)
        const labelsToSet = data.length ? data.map(i => i.value) : []
        console.log(labelsToSet)
        setToyToEdit((prevToy) => ({ ...prevToy, labels: labelsToSet}))
    }

    function onAddToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
                navigate('/toy')
            })
            .catch(err => {
                showErrorMsg('Cannot add Toy', err)
            })
    }


    return <section className="toy-edit">
        <form
            className="add-toy-form"
            onSubmit={onAddToy}>
            <label htmlFor="title">Toy Name: </label>
            <input required
                type="text"
                name="name"
                id="name"
                value={toyToEdit.name}
                onChange={handleChange}
                placeholder="Toy Name" />
            <label htmlFor="price">Toy Price: </label>
            <input required
                type="text"
                name="price"
                id="price"
                value={toyToEdit.price}
                onChange={handleChange}
                placeholder="Toy Price" />

                <Select
                 options={toyService.getToyLabels().map((label) => ({ value: label, label }))}
                 placeholder="Select labels"
                 value={selectedOptions}
                 onChange={handleSelect}
                 isMulti={true}
                 />

            <button>Save Toy</button>
        </form>
        <Link className="nice-link" to="/toy">Cancel</Link>
    </section>
}