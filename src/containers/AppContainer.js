import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import { ApolloProvider } from 'react-apollo'
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client'

const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:8081/graphql'),
  queryTransformer: addTypename,
})

class AppContainer extends Component {

  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <ApolloProvider store={store} client={client}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </ApolloProvider>
    )
  }
}

export default AppContainer
