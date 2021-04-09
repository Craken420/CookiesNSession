const http = require('http'),
      app = require('./app/app')

const server = http.createServer(app);

server.listen(app.get('PORT'), () => {
    console.log(`Server is running on http://localhost:${app.get('PORT')}`)
})
