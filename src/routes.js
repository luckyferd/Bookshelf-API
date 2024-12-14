const{ addBookHandler,
    getAllBooksHanlder,
    getAllBooksByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler
 }=require('./handler');

 const routes=[
    {method:'POST',
        path:'/books',
        handler :addBookHandler
    },
    {
        method:'GET',
        path:'/books',
        handler: getAllBooksHanlder
    },
    {
        method:'GET',
        path:'/books/{bookId}',
        handler: getAllBooksByIdHandler
    },
    {
        method:'PUT',
        path:'/books/{bookId}',
        handler: updateBookByIdHandler
    },
    {
        method:'DELETE',
        path:'/books/{bookId}',
        handler: deleteBookByIdHandler
    }
 ]

 module.exports=routes;