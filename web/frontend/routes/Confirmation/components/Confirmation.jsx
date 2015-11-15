import React from 'react';
import isLinkExpired from '../../../../shared/isLinkExpired';

let Confirmation = (props) => {
  const {expiration} = props.params;
  if (isLinkExpired(expiration)) {
    return (
      <div>
        <h2>Link expirado</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Bienvenido, papu.</h1>
      </div>
    );
  }
};

export default Confirmation;
