// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const { NotFoundError, BadRequestError, InternalServerError, ConflictError } = require('../api-error');

// Hàm gửi OTP qua email
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Bạn có thể thay đổi theo dịch vụ email của mình
    auth: {
      user: 'your-email@gmail.com', // Thay bằng email của bạn
      pass: 'your-email-password', // Thay bằng mật khẩu ứng dụng hoặc mật khẩu email
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Mã OTP xác thực tài khoản',
    text: `Mã OTP của bạn là: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// API Đăng ký và gửi OTP
exports.register = async (req, res, next) => {
  const { username, password, studentId, email } = req.body;

  // Kiểm tra xem email hoặc username đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ConflictError('Email đã được đăng ký'));
  }

  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo mã OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Tạo người dùng mới và lưu vào cơ sở dữ liệu
    const newUser = new User({
      username,
      password: hashedPassword,
      studentId,
      email,
      otp,
      isVerified: false, // Người dùng chưa xác thực
    });

    await newUser.save();

    // Gửi OTP qua email
    await sendOtpEmail(email, otp);

    res.status(200).json({ success: true, message: 'Đăng ký thành công. Vui lòng kiểm tra email để lấy mã OTP.' });
  } catch (error) {
    next(new InternalServerError('Đăng ký thất bại'));
  }
};

// API Xác thực OTP
exports.verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new NotFoundError('Không tìm thấy người dùng'));
    }

    if (user.otp !== otp) {
      return next(new BadRequestError('Mã OTP không chính xác'));
    }

    // Kích hoạt tài khoản nếu OTP chính xác
    user.isVerified = true;
    user.otp = null; // Xóa OTP sau khi xác thực
    await user.save();

    res.status(200).json({ success: true, message: 'Xác thực OTP thành công. Tài khoản của bạn đã được kích hoạt.' });
  } catch (error) {
    next(new InternalServerError('Xác thực OTP thất bại'));
  }
};

// Hàm đăng nhập
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('Không tìm thấy người dùng');
    }

    // Kiểm tra người dùng đã xác thực email chưa
    if (!user.isVerified) {
      return next(new BadRequestError('Tài khoản chưa được xác thực. Vui lòng xác thực email.'));
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestError('Mật khẩu không chính xác');
    }

    // Tạo token JWT
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      'your_jwt_secret', // Thay bằng chuỗi bí mật
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
