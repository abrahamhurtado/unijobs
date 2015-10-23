import React from 'react';

let Children = (props) => {
  const events = [
    { id: 0, title: 'proyecto de sustentabilidad' },
    { id: 1, title: 'proyecto de redes' },
    { id: 2, title: 'proyecto de cultura emprendedora' }
  ];

  return (
    <ul>
      {events.map((event) => <li key={event.id}>{event.title}</li>)}
    </ul>
  );
};

export default Children;
