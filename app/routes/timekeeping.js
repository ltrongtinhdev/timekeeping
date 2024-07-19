const timekeepingController = require('../controllers/timekeeping')
module.exports = (app) => {

    // app.get('/timekeeping', timekeepingController.getList);

    //Lấy dữ liệu chấm công theo nhân viên và ngày hiện tại
    app.get('/timekeeping', timekeepingController.getById);

    // Chấm công vào
    app.post('/timekeeping', timekeepingController.addNew);

    //Chấm công ra
    app.put('/timekeeping', timekeepingController.Update);
}