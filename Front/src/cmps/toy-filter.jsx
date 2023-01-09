import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy, 500))

    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="toys-filter">
        <h2>Filter Your Toys</h2>
        <form className="filter-form">
            <label htmlFor="txt">By Txt:</label>
            <input type="text"
                id="txt"
                name="txt"
                placeholder="By Text"
                value={filterByToEdit.txt}
                onChange={handleChange}
            />

            <label htmlFor="status">By Status: </label>
            <select name="status" id="status" onChange={handleChange}>
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
            </select>

            <label htmlFor="sort">Sort the toys by</label>
            <select id="sort" name="sortBy" onChange={handleChange}>
                <option value="">Choose</option>
                <option value="txt">Text</option>
                <option value="date">Date</option>
                <option value="urgency">Urgency</option>
            </select>

        </form>

    </section>
}