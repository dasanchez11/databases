import React from 'react'
import ReactDom from 'react-dom'


const Modal = ({ open, onClose, children }) => {
    const handleClick = (e) => {
        if (e.target.id === 'modal') {
            onClose()
        }
    }


    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div id='modal' className='fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-50' onClick={handleClick} >
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal