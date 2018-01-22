import React from 'react'
import List, { 
  ListItem, 
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import {
  TextField,
  Button
} from 'material-ui'
import FullScreenDialog from 'components/FullScreenDialog'
import { connect } from 'react-redux'
import AuthorActions from '../../redux/actions/authors'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import AddIcon from 'material-ui-icons/Add'
import { CircularProgress } from 'material-ui/Progress'
import './index.css'

class TodoApp extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      dialogOpen: false,
      isNew: false,
      currItem: {
        id: '',
        name: '',
        email: '',
        intro: ''
      }
    }
  }

  componentDidMount = () => {
    this.props.getAuthors()
    
  }
  onClose = () => {
    this.setState({
      dialogOpen: false
    })
  }

  onSave = () => {
    const { currItem, isNew } = this.state
    const { updateAuthor, createAuthor } = this.props
    
    isNew ? createAuthor(currItem) : updateAuthor(currItem)
    
    this.setState({
      dialogOpen: false
    })
  }

  onOpen = author => () => {
    this.setState({
      dialogOpen: true,
      isNew: false,
      currItem: {
        id: author.id,
        name: author.name,
        email: author.email,
        intro: author.intro
      }
    })
  }

  onNewOpen = () => {
    this.setState({
      dialogOpen: true,
      isNew: true,
      currItem: {
        id: '',
        name: '',
        email: '',
        intro: ''
      }
    })
  }
  
  onDelete = id => () => this.props.deleteAuthor(id)

  formChange = name => e => {
    const { currItem } = this.state
    this.setState({
      currItem: {
        ...currItem,
        [name]: e.target.value
      }
    })
  }

  render() {

    const { list } = this.props
    const { dialogOpen, currItem, isNew } = this.state
    let component = <CircularProgress/>
    if(list.length) {
      const listItem = list.map((author, i) => (
        <ListItem button key={i} onClick={this.onOpen(author)}>
          <ListItemText primary={author.name} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={this.onDelete(author.id)} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))
      component = <List>{ listItem }</List>
    }
    return (
      <div className="todo-wrapper">
        {component}
        
        <FullScreenDialog
          open={dialogOpen}
          title={isNew ? 'new' : currItem.name }
          onClose={this.onClose}
          onSave={this.onSave}
        >
          <TextField
            id="name"
            label="Name"
            placeholder="not empty"
            margin="normal"
            defaultValue={currItem.name}
            onChange={this.formChange('name')}
          />
          <TextField
            id="email"
            label="E-mail"
            placeholder="not empty"
            margin="normal"
            defaultValue={currItem.email}
            onChange={this.formChange('email')}
          />
          <TextField
            id="intro"
            label="Intro"
            placeholder="not empty"
            margin="normal"
            defaultValue={currItem.intro}
            onChange={this.formChange('intro')}
          />
        </FullScreenDialog>
        <Button className="floating-add-btn" fab color="primary" aria-label="add" onClick={this.onNewOpen}>
          <AddIcon />
        </Button>
      </div>
    )
  }
}


const mapStateToProps = store => {
  const { authors } = store
  const res = authors.toJS()
  return {
    list: res.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuthors(){
      dispatch(AuthorActions.getAuthors())
    },
    deleteAuthor(id){
      dispatch(AuthorActions.deleteAuthor(id))
    },
    updateAuthor(author) {
      dispatch(AuthorActions.updateAuthor(author))
    },
    createAuthor(author) {
      dispatch(AuthorActions.createAuthor(author))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
