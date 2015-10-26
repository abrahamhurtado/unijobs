import { Link } from 'react-router';
import MenuFactory from '../components/Menu';
import ModalFactory from '../components/Modal';

export default (React) => {
  const Menu = MenuFactory(React);
  const Modal = ModalFactory(React);

  return React.createClass({
    displayName: 'App',
    componentWillReceiveProps (nextProps) {
      if ((
        nextProps.location.key !== this.props.location.key &&
        nextProps.location.state &&
        nextProps.location.state.modal
      )) {
        this.previousChildren = this.props.children;
      }
    },
    render () {
      let {location} = this.props;
      let isModal = (
        location.state &&
        location.state.modal &&
        this.previousChildren
      );

      return (
        <div>
          <Menu {...this.props} />
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
  });
};
