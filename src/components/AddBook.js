import React from 'react';
import BookForm from './BookForm';

const AddBook = () => {
  const handleOnSubmit = (book) => {
    console.log(book);
  };

  return (
    // React.Fragment sử dụng để nhóm các phần tử con mà không cần thêm thẻ HTML dư thừa 
    <React.Fragment> 
      <BookForm handleOnSubmit={handleOnSubmit} />
      {/* handleOnSubmit là một hàm được truyền vào BookForm để xử lý việc gửi dữ liệu sách mới. */}
    </React.Fragment>
  );
};

export default AddBook;
