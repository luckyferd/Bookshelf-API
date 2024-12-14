const { nanoid }=require('nanoid');
const books = require('./books');

const addBookHandler =(request, h)=>{
  const {  name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading } =request.payload;

  if (!name){
    const response = h.response({
      status: 'fail',
      message:'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  };
  if (readPage>pageCount){
    const response=h.response({
      status: 'fail',
      message:'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  };

  const id=nanoid(16);
  const finished = pageCount===readPage;
  const insertedAt=new Date().toISOString();
  const updatedAt=insertedAt;

  //id di newbook baru ditambahkan
  const newBook = { id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt };

  books.push(newBook);

  return h.response({
    status : 'success',
    message :'Buku berhasil ditambahkan',
    data: {
      bookId:id
    }
  }).code(201);

};

const getAllBooksHanlder = (request, h) =>{
  const formatBook = books.map(({ id, name, publisher })=>({
    id, name, publisher }));

  return h.response({
    status : 'success',
    data :{
      books:formatBook
    }
  }).code(200);

};

const getDetailBooksByIdHandler=(request, h)=>{
  const { bookId } = request.params;
  const book= books.find((n)=> n.id===bookId);

  if (book !== undefined){
    return h.response({
      status: 'success',
      data : {
        book,
      },
    }).code(200);
  };

  return h.response({
    status :'fail',
    message :'Buku tidak ditemukan',
  }).code(404);
};

const updateBookByIdHandler=(request, h)=>{
  const { bookId } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading }=request.payload;

  const index = books.findIndex((book)=>book.id===bookId);
  if (index ===-1){
    return h.response({
      status : 'fail',
      message:'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  };
  if (!name){
    return h.response({
      status : 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  };
  if (readPage>pageCount){
    return h.response({
      status : 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  };
  books[index]={
    ...books[index],
    name, year, author, summary, publisher, pageCount, readPage, reading,
    finished:pageCount===readPage,
    updatedAt:new Date().toISOString(),
  };

  const response = h.response({
    status : 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;

};

const deleteBookByIdHandler=(request, h) => {
  const { bookId }=request.params;

  const index = books.findIndex((book)=>book.id===bookId);

  if (index !== -1){
    books.splice(index, 1);
    const response=h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  };
  const response =h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};


module.exports={
  addBookHandler,
  getAllBooksHanlder,
  getDetailBooksByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler
};