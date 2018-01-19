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
      dialogOpen: false
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

  onOpen = () => {
    this.setState({
      dialogOpen: true
    })
  }
  
  onDelete = i => {
    const { list, deleteAuthor } = this.props
    const { id } = list[i]
    deleteAuthor(id)
  }
  render() {

    const { list } = this.props
    const { dialogOpen } = this.state
    let component = <CircularProgress/>
    if(list.length) {

      const listItem = list.map((author, i) => (
        <ListItem button key={i} onClick={this.onOpen}>
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
          onClose={this.onClose}
        >

          <TextField
            id="with-placeholder"
            label="With placeholder"
            placeholder="Placeholder"
            margin="normal"
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
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
