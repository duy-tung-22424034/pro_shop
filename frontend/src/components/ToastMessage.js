import React from 'react'
import {ToastContainer,Toast} from 'react-bootstrap';

const ToastMessage = ({message}) => {
  return (
    //  <ToastContainer position="top-end" className="p-3">
        <Toast delay={3000} position='top-end' 
        className='p-3 d-inline-block m-1' bg={'Warning'} autohide>
          <Toast.Header>
          <i class="bi bi-exclamation-triangle"></i>
            <strong className="me-auto">Warning</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      //  </ToastContainer>
  )
}

export default ToastMessage
