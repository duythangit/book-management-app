import React, { useState } from 'react'; 
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {   // props là đối tượng chứa các thuộc tính được truyền từ component cha, trong trường hợp này là AddBook.
  const [book, setBook] = useState({ 
    // book là một đối tượng chứa thông tin về sách, bao gồm tên sách, tác giả, số lượng, giá
    // setBook là một hàm được sử dụng để cập nhật trạng thái của đối tượng book.
    // useState được sử dụng để quản lý trạng thái của form, bao gồm thông tin sách và thông báo lỗi.

    bookname: props.book ? props.book.bookname : '', // nếu props.book tồn tại, sử dụng giá trị của nó, nếu không thì sử dụng chuỗi rỗng.
    author: props.book ? props.book.author : '',
    quantity: props.book ? props.book.quantity : '',
    price: props.book ? props.book.price : '',
    date: props.book ? props.book.date : ''
  });


  const [errorMsg, setErrorMsg] = useState('');   
  // useState được sử dụng để quản lý trạng thái của form, bao gồm thông tin sách và thông báo lỗi.
  const { bookname, author, price, quantity } = book;
  // bookname, author, price, quantity được lấy từ đối tượng book để sử dụng trong form.

  // handleOnSubmit là một hàm được gọi khi người dùng gửi form. Nó sẽ kiểm tra xem tất cả các trường đã được điền đầy đủ hay chưa.
  const handleOnSubmit = (event) => {

    // event.preventDefault() được sử dụng để ngăn chặn hành động mặc định của form khi gửi dữ liệu.
    // Điều này giúp tránh việc trang web tải lại khi gửi form.
    // Nếu tất cả các trường đã được điền đầy đủ, nó sẽ tạo một đối tượng sách mới và gọi hàm handleOnSubmit được truyền từ component cha.
    // Nếu không, nó sẽ hiển thị thông báo lỗi.
    event.preventDefault(); // Ngăn chặn form reload trang khi gửi dữ liệu rất quan trọng trong React.

    const values = [bookname, author, price, quantity];
    // values là một mảng chứa các giá trị của các trường trong form để kiểm tra xem chúng có được điền đầy đủ hay không.

    // errorMsg là một biến để lưu trữ thông báo lỗi nếu có.
    let errorMsg = '';


    // allFieldsFilled là một biến boolean để kiểm tra xem tất cả các trường đã được điền đầy đủ hay chưa.
    // Nó sử dụng phương thức every để kiểm tra từng trường trong mảng values.
    const allFieldsFilled = values.every((field) => {  // every kiểm tra các trường trong mảng values có thoải mãn điều kiện không 


      const value = `${field}`.trim(); 
      // field ép mọi giá trị thành chuỗi 
      // trim() được sử dụng để loại bỏ khoảng trắng ở đầu và cuối chuỗi.
      // Điều này đảm bảo rằng nếu người dùng chỉ nhập khoảng trắng, nó sẽ được coi là chuỗi rỗng.


      return value !== '' && value !== '0'; 
      // Kiểm tra xem giá trị có khác rỗng và không phải là '0' hay không.
      // Điều này đảm bảo rằng tất cả các trường đều được điền đầy đủ và không phải là chuỗi rỗng hoặc '0'.
      
    });
    // allFieldsFilled sẽ là true nếu tất cả các trường đều được điền đầy đủ và không phải là chuỗi rỗng hoặc '0'.
    if (allFieldsFilled) {
      // book là một đối tượng chứa thông tin về sách mới, bao gồm id (được tạo ngẫu nhiên bằng uuidv4), tên sách, tác giả, giá, số lượng và ngày hiện tại.
      const book = {
        id: uuidv4(),
        bookname,
        author,
        price,
        quantity,
        date: new Date()
      };
      // props.handleOnSubmit(book) sẽ gọi hàm handleOnSubmit được truyền từ component cha (AddBook) và truyền đối tượng sách mới vào đó.
      props.handleOnSubmit(book);
    } else {
      // Nếu không, errorMsg sẽ được gán giá trị thông báo lỗi.
      errorMsg = 'Please fill out all the fields.';
    }
    // setErrorMsg sẽ cập nhật trạng thái của errorMsg để hiển thị thông báo lỗi nếu có.
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'quantity':
        if (value === '' || parseInt(value) === +value) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Enter name of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="author"
            value={author}
            placeholder="Enter name of author"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="quantity"
            value={quantity}
            placeholder="Enter available quantity"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        {/* <Form.Group controlId="date">
          <Form.Label>Book Date</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={date}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group> */}
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;