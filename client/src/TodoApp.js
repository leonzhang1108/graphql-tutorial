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
    console.log(this.props)
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
    // const { loading } = this.props.data
    // let component = <CircularProgress/>
    // if(!loading) {

    //   const { authors } = this.props.data

    //   const listItem = authors.map((author, i) => (
    //     <ListItem button key={i}>
    //       <ListItemText primary={author.name} />
    //       <ListItemSecondaryAction>
    //         <IconButton aria-label="Delete">
    //           <DeleteIcon onClick={() =>this.onDelete(i)} />
    //         </IconButton>
    //       </ListItemSecondaryAction>
    //     </ListItem>
    //   ))
    //   component = <List>{ listItem }</List>
    // }
    return <CircularProgress/>
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
