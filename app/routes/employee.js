const employeeController = require('../controllers/employee')
// const middlewareController = require('../controllers/middlewareController') // middleware controller xác thực người dùng
module.exports = (app) => {

//POST - Đăng nhập
app.post('/login', employeeController.Login)

// GET - Lấy tất cả dữ liệu từ bảng NHANVIEN
app.get('/employee', employeeController.getList)

// GET - Lấy tất cả dữ liệu từ bảng NHANVIEN khi sử dụng jwt middleware để xác thực người dùng
// app.get('/employee', middlewareController.verifyToken, employeeController.getList)

// GET - Lấy thông tin nhân viên từ bảng NHANVIEN dựa vào ID
app.get('/employee/:id', employeeController.getById)

//POST: Tạo một nhân viên mới
app.post('/employee', employeeController.addNew)

//PUT: Cập nhật dữ liệu một nhân viên có sẵn
app.put('/employee', employeeController.Update)

//DELETE: Xóa dữ liệu một nhân viên
app.delete('/employee/:id', employeeController.Delete)

}