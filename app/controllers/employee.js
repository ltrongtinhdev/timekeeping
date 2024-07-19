const employeeModel = require('../models/employee');
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

//Generate Access Token
// const generateAccessToken = (result) => {
//     return jwt.sign({
//         fullname: result.FULLNAME,
//         tolv: result.TOLV
//     },
//     process.env.JWT_ACCESS_KEY,
//     {expiresIn: "30s"})
// }

//Generate Refresh Token
// const generateRefreshToken = (result) => {
//     return jwt.sign({
//         fullname: result.FULLNAME,
//         tolv: result.TOLV
//     },
//     process.env.JWT_REFRESH_KEY,
//     {expiresIn: "365d"})
// }

const Login = async (req, res) => {
    const user = req.body;
    try {
      const result = await employeeModel.Login(user);

      //kiểm tra mật khẩu mã hóa và mật khẩu người dùng nhập có giống nhau không
    //   const validPassword = await bcrypt.compare(user.PASS, result.PASS)
    console.log(result)
    res.status(200).json(result)
    //   if(!result) {
    //     res.status(401).json({message:'Đăng nhập thất bại. Không tìm thấy tên người dùng!'})
    //   }

    //   if(result.PASS !== user.PASS) {
    //     res.status(401).json({message:'Sai mật khẩu!'})
    //   }

    //   if(result.THIETBI !== user.THIETBI){
    //     res.status(401).json({message:'Thiết bị không hợp lệ!'})
    //   }

      // Đăng nhập khi không sử dụng jwt để xác thực
    //   if(result.USERNAME && validPassword && result.THIETBI) {
    //     const {PASS, ...others} = result;
    //     res.status(200).json({message:"Đăng nhập thành công", ...others})
    //   }

    //   if(result.USERNAME && result.PASS == user.PASS && result.THIETBI == user.THIETBI) {
    //     const {PASS, ...others} = result;
    //     res.status(200).json({message:"Đăng nhập thành công", ...others})
    //   }

    //   if(result.USERNAME && result.PASS == user.PASS) {
    //     const {PASS, ...others} = result;
    //     res.status(200).json({message:"Đăng nhập thành công", ...others})
    //   }

    // Đăng nhập khi sử dụng jwt
    //   if(result.USERNAME && validPassword && result.THIETBI) {
    //     const accessToken = generateAccessToken(result);
    //     const refreshToken = generateRefreshToken(result);

    //     const {PASS, ...others} = result;
    //     res.status(200).json({message: "Đăng nhập thành công", ...others, accessToken, refreshToken})
    //   }

    } catch (error) {
        res.status(500).json({message: "Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu!"});
        console.log("Lỗi khi đăng nhập");
    }
}

const getList = async (req, res) => {
    try {
        const employees = await employeeModel.getList();
        res.status(200).json(employees);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Lỗi khi lấy dữ liệu"});
    }
}

const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await employeeModel.getById(id);
        if(!employee) {
            res.status(404).json({error: "Không tìm thấy thông tin nhân viên"});
        } else {
            res.status(200).json(employee);
        }
    } catch (error) {
        res.status(500).json({error: "Lỗi khi lấy dữ liệu"});
    }
}

const addNew = async (req, res) => {
    try {
        //Tạo mật khẩu mã hóa
        // const salt = await bcrypt.genSalt(10);
        // const hashed = await bcrypt.hash(req.body.PASS, salt);
        const newEmployee = {
            USERNAME: req.body.USERNAME,
            FULLNAME: req.body.FULLNAME,
            TOLV: req.body.TOLV,
            PASS: req.body.PASS,
            THIETBI: req.body.THIETBI
        };
        employeeModel.addNew(newEmployee);
        res.status(200).json({message:"Thêm nhân viên thành công", newEmployee});
    } catch (error) {
        res.status(500).json({error: "Lỗi khi thêm nhân viên"});
    }
}

const Update = async (req, res) => {
    const updateEmployee = req.body;
    try {
        employeeModel.Update(updateEmployee);
        res.status(200).json({message:"Cập nhật thông tin nhân viên thành công"});
    } catch (error) {
        res.status(500).json({error: "Lỗi khi cập nhật thông tin nhân viên"});
    }
}

const Delete = async (req, res) => {
    const id = req.params.id;
    try {
        employeeModel.Delete(id);
        res.status(200).json({message: "Xóa nhân viên thành công"});
    } catch (error) {
        res.status(500).json({error: "Lỗi khi xóa nhân viên"});
    }
}

module.exports = {
    Login,
    getList,
    getById,
    addNew,
    Update,
    Delete
}