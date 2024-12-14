const Hapi =require('@hapi/hapi');
const routes = require('./routes');

const init = async ()=>{
    const server = Hapi.server({
        port:9000,
        host: 'localhost',
        /**process.env.NODE_ENV !=='production' ?'localhost':'0.0.0.0',
        routes:{
            cors:{
            origin: ['*'],
        },**/
    },
);
    server.routes(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
init();

