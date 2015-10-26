export default (Component) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
      <title>UniJOBS</title>
    </head>
    <body>
      <div id="react-app">${Component}</div>
      <script type="text/javascript" src="/static/bundle.js"></script>
    </body>
  </html>
  `;
