const timekeepingModel = require('../models/timekeeping')

const getList = async (req, res) => {
    try {
        const timekeepings = await timekeepingModel.getList();
        res.status(200).json(timekeepings);
    } catch (error) {
        res.status(500).json({error: "Lỗi khi lấy dữ liệu"});
    }
}

const getById = async (req, res) => {
    const { TEN_NV, TRX_DATE } = req.query;
    try {
        const timekeepingInfo = await timekeepingModel.getById(TEN_NV, TRX_DATE);
        // console.log(Object.entries(timekeepingInfo).length);
        if(Object.entries(timekeepingInfo).length == 0) {
            res.status(200).json({message: "Chưa có thông tin chấm công", timekeepingInfo});
            console.log("Chưa có thông tin chấm công");
        } else {
            res.status(200).json(timekeepingInfo[0]);
        }
    } catch (error) {
        res.status(500).json({error: "Lỗi khi lấy thông tin chấm công"});
    }
}

const addNew = async (req, res) => {
    const newTimeKeeping = req.body;
    try {
        timekeepingModel.addNew(newTimeKeeping);
        res.status(200).json({message: "Chấm công vào thành công"});
        console.log("Chấm công vào thành công");
    } catch (error) {
        res.status(500).json({error: "Chấm công vào thất bại"});
        console.log("Chấm công vào thất bại");
    }
}

const Update = async (req, res) => {
    const updateTimeKeeping = req.body;
    try {
        timekeepingModel.Update(updateTimeKeeping);
        res.status(200).json({message:"Chấm công ra thành công"});
        console.log("Chấm công ra thành công")
    } catch (error) {
        res.status(500).json({error: "Chấm công ra thất bại"});
        console.log("Chấm công ra thất bại");
    }
}

module.exports = {
    getList,
    getById,
    addNew,
    Update
}