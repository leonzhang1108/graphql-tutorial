import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class TodoApp extends React.Component {

  componentDidMount = () => {
    console.log(fetch)
    fetch("/api/test", { 
      method: "GET"
    }).then(response => console.log(response),  console.log)
  }
  render() {
    // const { data: { todos, refetch } } = this.props
    return (
      <div>
        lalala
      </div>
    )
  }
}

export default graphql(gql`
query {
  count
}
`)(TodoApp)
