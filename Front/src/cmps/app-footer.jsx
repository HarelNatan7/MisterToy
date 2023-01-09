import { showSuccessMsg } from '../services/event-bus.service.js'
import { useEffect, useRef, useState } from "react"

export function AppFooter () {

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    return <footer>
            <span>By Harel Natan ©</span>
        </footer>
}