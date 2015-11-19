import React from 'react';
import Menu from '../components/Menu';
import Modal from '../components/Modal';

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }
  componentWillReceiveProps (nextProps) {
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      this.previousChildren = this.props.children;
    }
  }
  render () {
    let {location} = this.props;
    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );

    return (
      <div>
        <header>
          <Menu {...this.props} />
        </header>
        {isModal ?
          this.previousChildren :
          this.props.children
        }
        {isModal && (
          <Modal isOpen={true} returnTo={location.state.returnTo}>
            {this.props.children}
          </Modal>
        )}
      </div>
    );
  }
};
