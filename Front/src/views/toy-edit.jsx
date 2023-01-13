import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import Select from "react-select";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveToy } from "../store/toy.action.js";

export function ToyEdit() {



    ////////////////////////////////////////////////////////////////////////////////////

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
        setToyToEdit((prevToy) => ({ ...prevToy, labels: labelsToSet }))
    }

    async function onAddToy(ev) {
        ev.preventDefault()
        const savedToy = await saveToy(toyToEdit)
        try {
            showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            navigate('/toy')
        } catch (err) {
            showErrorMsg('Cannot add Toy', err)
        }
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        price: Yup.string()
            .min(2, 'Too Short!')
            .max(4, 'Too Long!')
            .required('Required'),
    })

    return <section className="toy-edit">

        <Formik
            initialValues={{
                name: '',
                price: ''
            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched }) => (
                <Form className='edit-form'
                    onSubmit={onAddToy}>
                    <Field
                        name="name"
                        id="name"
                        value={toyToEdit.name}
                        onChange={handleChange}
                        placeholder="Toy Name"
                    />
                    {errors.name && touched.name ? (
                        <span>{errors.name}</span>
                    ) : null}

                    <Field
                        name="price"
                        id="price"
                        value={toyToEdit.price}
                        onChange={handleChange}
                        placeholder="Toy Price"
                    />
                    {errors.price && touched.price ? <div>{errors.price}</div> : null}

                    <div className="select-container">
                        <Select
                            options={toyService.getToyLabels().map((label) => ({ value: label, label }))}
                            placeholder="Select labels"
                            value={selectedOptions}
                            onChange={handleSelect}
                            isMulti={true}
                            className="multi-select"
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    borderColor: 'gold',
                                    // backgroundColor: 'lightyellow',
                                }),
                                option: (provided) => ({
                                    ...provided,
                                    borderBottom: '1px solid pink',
                                    color: 'gray',
                                    padding: 20,
                                })
                            }}
                        />
                    </div>

                    <button>Save Toy</button>
                    <Link className="nice-link" to="/toy">Cancel</Link>
                </Form>
            )}
        </Formik>

    </section>
}