import React, {PropTypes, Children} from 'react';

export default class Provider extends React.Component {
  static childContextTypes = {
    isAuthed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.number
    }),
    type: PropTypes.string
  }

  constructor (props) {
    super(props);
    this.initialData = (typeof window !== 'undefined') ? window.__initialData__ : props.initialData;
  }

  getChildContext () {
    return {
      isAuthed: this.initialData.isAuthed,
      user: this.initialData.user,
      type: this.initialData.type
    };
  }

  render () {
    let {children} = this.props;
    return Children.only(children);
  }
}
