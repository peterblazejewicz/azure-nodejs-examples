'use strict';

const app = require('express')();
const mobileApp = require('azure-mobile-apps')();

mobileApp.tables.add('TodoItem');
app.set('port', process.env.port || 3000);
app.use(mobileApp);

app.listen(app.get('port'), () => {
  console.log('Application listening on port %d', app.get('port'));
});
