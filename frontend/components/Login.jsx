export default (React) => {
  return React.createClass({
    displayName: 'Login',
    render () {
      return (
        <form>
          <p>Ingresa tu correo electrónico para registrarte</p>
          <input ref="mail" type="email" placeholder="mail@example.com"/>
        </form>
      );
    }
  });
};
