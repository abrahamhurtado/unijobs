import React from 'react';

export default (Component) => {
  class ProtectedComponent extends React.Component {
    static contextTypes = {
      isAuthed: React.PropTypes.bool
    }
    constructor (props, context) {
      super(props, context);
    }
    componentWillMount () {
      if (!this.context.isAuthed) {
        this.props.history.pushState(null, '/login');
      }
    }
    componentDidMount () {
      if (!this.context.isAuthed) {
        this.props.history.pushState(null, '/login');
      }
    }
    render () {
      return <Component {...this.context} />;
    }
  }

  return ProtectedComponent;
};
