import React from 'react';

export default (Component) => {
  class ProtectedComponent extends React.Component {
    static contextTypes = {
      isAuthed: React.PropTypes.bool,
      user: React.PropTypes.shape({
        name: React.PropTypes.string,
        _id: React.PropTypes.number,
      }),
      type: React.PropTypes.string
    };
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
      return <Component {...this.context} {...this.props} />;
    }
  }

  return ProtectedComponent;
};
