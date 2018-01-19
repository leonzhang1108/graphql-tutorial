import React from 'react'
import { 
  AppBar,
  Button,
  Dialog,
  Slide,
  Toolbar,
  IconButton,
  Typography
} from 'material-ui'

import CloseIcon from 'material-ui-icons/Close'
import './index.css'


const Transition = props => <Slide direction="up" {...props} />

const FullScreenDialog = props => (
  <Dialog
    fullScreen
    open={props.open}
    onClose={props.onClose}
    transition={Transition}
  >
    <AppBar className="full-screen-dialog-wrapper">
      <Toolbar>
        <IconButton color="contrast" onClick={props.onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
        <Typography type="title" color="inherit" className="dialog-title">
          {props.title || 'title'}
        </Typography>
        <Button color="contrast" onClick={props.onSave}>
          {props.save || 'save'}
        </Button>
      </Toolbar>
    </AppBar>
    <div className="dialog-content-wrapper">
      {props.children}
    </div>
  </Dialog>
)

export default FullScreenDialog