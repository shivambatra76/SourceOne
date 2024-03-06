
const connection = require('../connection/connect');

require('../initialize');
let startServer;

(function startInitialProcess() {
  
    startServer = app.listen(config.server.port, () =>{
        console.log('server started at ',config.server.port);
    })
})();

exports.initializeServer = async function () {
    try {
        await connection.connect();
    } catch (error) {
        console.log('Db not connected.', error);
        process.exit(1);
    }
}

if (!('toJSON' in Error.prototype)) {
    Object.defineProperty(Error.prototype, 'toJSON', {
        value: function() {
            var error = "{}";
            if (this.stack) {
                var errStack = this.stack.split('\n');
                error = errStack[0] + errStack[1];
            } else if (this.message) {
                error = this.message;
            }
            return error;
        },
        configurable: true,
        writable: true
    });
}