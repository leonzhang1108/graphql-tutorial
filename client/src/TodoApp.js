import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import List, { 
  ListItem, 
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import { CircularProgress } from 'material-ui/Progress'

class TodoApp extends React.Component {
  
  onDelete = i => {
    const { authors } = this.props.data
    const { id } = authors[i]
    console.log(`id: ${id}`)

    this.props.mutate({
      variables: { id }
    })

  }
  render() {
    const { loading } = this.props.data
    let component = <CircularProgress/>
    if(!loading) {

      const { authors } = this.props.data

      const listItem = authors.map((author, i) => (
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

const authorQuery = gql`
query {
  authors {
    name, id
  }
}
`

const deleteAuthor = gql`
mutation {
  deleteAuthor(id: $id)
}
`

export default compose(
  graphql(authorQuery),
  graphql(deleteAuthor)
)(TodoApp)
