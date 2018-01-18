import React from 'react'
import List, { 
  ListItem, 
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import { connect } from 'react-redux'
import AuthorActions from './redux/actions/authors'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import { CircularProgress } from 'material-ui/Progress'

class TodoApp extends React.Component {

  componentDidMount = () => {
    this.props.getAuthors()
  }
  
  onDelete = i => {
    const { authors } = this.props.data
    const { id } = authors[i]


    // this.props.mutate({
    //   variables: { id }
    // })

  }
  render() {

    const { list } = this.props
    let component = <CircularProgress/>
    if(list.length) {

      const listItem = list.map((author, i) => (
        <ListItem button key={i}>
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
    return component
  }
}


const mapStateToProps = store => {
  const { authors } = store
  return {
    list: authors.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuthors(list){
      dispatch(AuthorActions.addList(list))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
