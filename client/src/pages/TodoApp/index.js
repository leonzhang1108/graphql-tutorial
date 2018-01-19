import React from 'react'
import List, { 
  ListItem, 
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import {
  TextField
} from 'material-ui'
import FullScreenDialog from 'components/FullScreenDialog'
import { connect } from 'react-redux'
import AuthorActions from '../../redux/actions/authors'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import { CircularProgress } from 'material-ui/Progress'
import './index.css'

class TodoApp extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      dialogOpen: false,
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
    const { currItem } = this.state
    const { updateAuthor } = this.props
    
    console.log(currItem)
    updateAuthor(currItem)
    this.setState({
      dialogOpen: false
    })
  }

  onOpen = author => {
    this.setState({
      dialogOpen: true,
      currItem: {
        id: author.id,
        name: author.name,
        email: author.email,
        intro: author.intro
      }
    })
  }
  
  onDelete = i => {
    const { list, deleteAuthor } = this.props
    const { id } = list[i]
    deleteAuthor(id)
  }

  formChange = e => {
    const { currItem } = this.state
    this.setState({
      currItem: {
        ...currItem,
        [e.target.id]: e.target.value
      }
    })
  }

  render() {

    const { list } = this.props
    const { dialogOpen, currItem } = this.state
    let component = <CircularProgress/>
    if(list.length) {

      const listItem = list.map((author, i) => (
        <ListItem button key={i} onClick={() => this.onOpen(author)}>
          <ListItemText primary={author.name} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={() =>this.onDelete(i)} />
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
          title={currItem.name}
          onClose={this.onClose}
          onSave={this.onSave}
        >
          <TextField
            id="name"
            label="Name"
            placeholder="not empty"
            margin="normal"
            defaultValue={currItem.name}
            onChange={this.formChange}
          />
          <TextField
            id="email"
            label="E-mail"
            margin="normal"
            defaultValue={currItem.email}
            onChange={this.formChange}
          />
          <TextField
            id="intro"
            label="Intro"
            margin="normal"
            defaultValue={currItem.intro}
            onChange={this.formChange}
          />

        </FullScreenDialog>
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
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
