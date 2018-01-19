import React from 'react'
import { 
  Modal
} from 'material-ui'
import './index.css'


const ProModal = props => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={props.show}
  >
    <div className='modal-wrapper'>
      { props.children }
    </div>
  </Modal>
)

export default ProModal