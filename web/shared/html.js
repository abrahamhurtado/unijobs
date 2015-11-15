export default (Component, state, token) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
      <title>UniJOBS</title>
    </head>
    <body>
      <div id="react-app">${Component}</div>
      <script type="text/javascript" src="/static/bundle.js" async defer></script>
      <script type="application/javascript">
        window.__initialData__ = ${JSON.stringify(state)};
        window.localStorage.token = ${token};
      </script>
    </body>
  </html>
  `;
