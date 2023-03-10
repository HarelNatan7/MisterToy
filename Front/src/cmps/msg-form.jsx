import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import Select from "react-select";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { socketService, SOCKET_EMIT_SEND_MSG } from "../services/socket.service";

export function MsgForm({ msg, setMsg, addToyMsg }) {

    const MsgSchema = Yup.object().shape({
        txt: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required')
    })

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setMsg(prevMsg => {
            return { ...prevMsg, [field]: value }
        })
    }

    function onSubmit() {
        
        addToyMsg(msg)
    }

    return <Formik
        initialValues={{
            txt: ''
        }}
        validationSchema={MsgSchema}
    >
        {({ errors, touched }) => (
            <Form className='msg-form'
            // onSubmit={addToyMsg}
            >
                <Field
                    name="txt"
                    id="txt"
                    value={msg.txt}
                    onChange={handleChange}
                    placeholder="Your Msg"
                />
                {errors.txt && touched.txt ? (
                    <span>{errors.txt}</span>
                ) : null}

                <button onClick={onSubmit}>Add Toy Msg</button>
            </Form>
        )}
    </Formik>
}