import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withApollo, graphql, compose } from 'react-apollo';
import { getSingleApplicationQuery, getApplicationListQuery } from 'queries/applicationQueries';

export class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.fetchMoreApplications = this.fetchMoreApplications.bind(this);
  }

  fetchMoreApplications() {
    
    return this.props.data.fetchMore({
      variables: {
        pageNumber: (this.props.data.applications.data.length / 5) + 1
      },

      // combine old & new result
      updateQuery: (previousResult, {fetchMoreResult}) => {

        if (previousResult.applications.item_count == previousResult.applications.data.length) {
          return;
        }

        const newApplications = fetchMoreResult.data.applications.data;
        const item_count = fetchMoreResult.data.applications.item_count;
        let mergedData = {
          data: previousResult.applications.data.concat(newApplications),
          item_count: item_count
        }

        return {
          applications: mergedData
        }
      }

    })
  }

  render() {

    if (this.props.data.loading) {
      return <div>Loading</div>
    }

    if (this.props.data.error) {
      return <div>Error</div>
    }

    const {data, item_count} = this.props.data.applications;

    let dataList = [];
    data.forEach(item => {
      dataList.push(
        <div key={item.reference_id}>
          <hr />
          <br />

          Reference ID: {item.reference_id} <br />
          Full name: {item.contact_info.contact_full_name} <br />
          Dealer: {item.dealer}

          <br />
          <hr />
        </div>
      )
    })

    return (
      <div>
        <button onClick={() => this.fetchMoreApplications()}>Fetch more</button>
        <div>Total: {data.length}/{item_count}</div>
        {dataList}
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  const actions = {
  }
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default (compose(
  graphql(getApplicationListQuery, {
    name: "data",
    options: (props) => {
      return {
        variables: {
          itemPerPage: 5,
          pageNumber: 1
        }
      }
    },

    props: ({data, ownProps}) => {
      return {
        data, ownProps,
      };
    }
  }),

  graphql(getSingleApplicationQuery, {
    name: "dataSingle",
    options: (props) => {
      return {
        variables: {
          reference_id: "SMAL170212235524"
        }
      }
    }
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Counter))
