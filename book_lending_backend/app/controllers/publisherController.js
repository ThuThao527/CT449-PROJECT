const Publisher = require('../models/publisher.js')

exports.addPublisher = async (req, res) => {
  try {
    const { tenXuatBan, diaChi } = req.body;
    const newPublisher = new Publisher({ tenXuatBan, diaChi });
    await newPublisher.save();
    res.status(201).send({ message: 'Nhà xuất bản đã được thêm thành công', publisher: newPublisher });
  } catch (error) {
    res.status(500).send({ message: 'Đã xảy ra lỗi khi thêm nhà xuất bản', error: error.message });
  }
};
