import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withApollo, graphql, compose } from 'react-apollo';
import { getSingleApplicationQuery } from 'queries/applicationQueries';

export class HomeView extends React.Component {
  constructor(props) {
    super(props)

    this.onButtonClick = this.onFetchButtonClick.bind(this);
    this.state = {};
  }

  onFetchButtonClick() {
    this.props.data.refetch({
      reference_id: this.state.reference_id
    })
  }

  render() {
    console.log("RENDER", this.props);
    if (this.props.data.loading) {
      return <div>Loading</div>
    }

    if (this.props.data.error) {
      return <div>Error</div>
    }

    const {contact_info} = this.props.data.application
    return (
      <div className='home'>


        <input type="text" onChange={(event) => {
            this.setState({
              reference_id: event.target.value
            })
        }} />
        <button onClick={() => this.onFetchButtonClick()}>Fetch</button>

        <h4>Contact Info</h4>
        <div>Full name: {contact_info.contact_full_name}</div>
        <div>Mobile: {contact_info.contact_mobile}</div>
        <div>Email: {contact_info.contact_email}</div>
        <div>Address: {contact_info.contact_address}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    test: state.test
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = {
    setRefId: (ref_id) => ({
      type: "SET_REFERENCE_ID",
      reference_id: ref_id
    })

  }
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default compose(
  graphql(getSingleApplicationQuery, {
    name: "data", // data is the default name - put it here to make it more explicit & easy to understand
    options: (props) => {
      return {
        variables: {
          reference_id: props.location.query.reference_id || "SMAL170212235524"
        }
      }
    }
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomeView)

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withApollo(HomeView))