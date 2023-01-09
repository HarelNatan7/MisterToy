import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { ToyPreview } from "./toy-preview"

export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return <section className="toy-list flex">
        {toys.map(toy => <div
         className="toy"
         key={toy._id}>
            <ToyPreview toy={toy} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />

        </div>)}
    </section>
}