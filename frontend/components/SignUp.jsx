// export default (React) => (props) => (
//   <form>
//     <p>Ingresa tu correo electrónico para registrarte</p>
//     <input type="email" placeholder="mail@example.com"/>
//   </form>
// );

export default (React) => {
  return React.createClass({
    displayName: 'SignUp',
    render () {
      return (
        <form>
          <p>Ingresa tú información</p>
          <input type="text" placeholder="Tu nombre"/>
          <input type="email" placeholder="mail@example.com"/>
        </form>
      );
    }
  });
};
