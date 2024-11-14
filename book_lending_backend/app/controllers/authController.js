// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { User, Reader, Admin } = require('../models/user');
const TempUser = require('../models/tempUser.js'); 
const { NotFoundError, BadRequestError, InternalServerError, ConflictError } = require('../api-error');

// Hàm gửi OTP qua email
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'thaob2207566@student.ctu.edu.vn', 
      pass: 'gemd zgip gzco ouae', 
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
  const { userFullName, password, idStudent, gender, phoneNumber, email } = req.body;

  try {
    console.log("Bắt đầu kiểm tra email...");
    const existingUser = await Reader.findOne({ email });
    if (existingUser) {
      console.error("Email đã được đăng ký:", email);
      return next(new ConflictError('Email đã được đăng ký'));
    }

    console.log("Bắt đầu kiểm tra idStudent...");
    const existingStudentId = await Reader.findOne({ idStudent });
    if (existingStudentId) {
      console.error("Mã số sinh viên đã được sử dụng:", idStudent);
      return next(new ConflictError('Mã số sinh viên đã được sử dụng'));
    }

    console.log("Bắt đầu mã hóa mật khẩu...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Mật khẩu đã được mã hóa thành công");

    // Tạo mã OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP được tạo:", otp);

    // Gửi OTP qua email
    try {
      await sendOtpEmail(email, otp);
      console.log("OTP đã được gửi đến email:", email);
    } catch (emailError) {
      console.error("Lỗi khi gửi email OTP:", emailError);
      return next(new InternalServerError('Không thể gửi OTP. Vui lòng thử lại sau.'));
    }

    // Lưu thông tin người dùng tạm thời vào MongoDB
    const tempUser = new TempUser({
      userFullName,
      password: hashedPassword,
      idStudent,
      gender,
      phoneNumber,
      email,
      otp,
      createdAt: new Date(), // Sử dụng TTL để tự động xóa sau một khoảng thời gian
    });

    await tempUser.save();
    console.log("Thông tin người dùng đã được lưu tạm thời.");

    // Trả về phản hồi thành công
    res.status(200).json({
      success: true,
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để lấy mã OTP.'
    });
      
   
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    next(new InternalServerError('Đăng ký thất bại'));
  }
};




// API Xác thực OTP
exports.verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    // Lấy thông tin người dùng từ MongoDB tạm thời
    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      console.error("Người dùng không tồn tại hoặc OTP đã hết hạn:", email);
      return next(new NotFoundError('Không tìm thấy người dùng hoặc OTP đã hết hạn'));
    }

    if (tempUser.otp !== otp) {
      console.error("Mã OTP không chính xác:", otp);
      return next(new BadRequestError('Mã OTP không chính xác'));
    }

    // Lưu người dùng vào MongoDB chính thức
    const newUser = new Reader({
      userFullName: tempUser.userFullName,
      password: tempUser.password,
      idStudent: tempUser.idStudent,
      gender: tempUser.gender,
      phoneNumber: tempUser.phoneNumber,
      email: tempUser.email,
      isVerified: true, // Xác thực tài khoản thành công
    });

    await newUser.save();
    console.log("Người dùng đã được lưu vào MongoDB thành công.");

    // Xóa người dùng tạm thời khỏi MongoDB
    await TempUser.deleteOne({ email });

      try {
        await newUser.save();
        console.log("Người dùng đã được lưu thành công vào MongoDB.");

        res.status(200).json({ success: true, message: 'Xác thực OTP thành công. Tài khoản của bạn đã được kích hoạt.' });
      } catch (saveError) {
        console.error("Lỗi khi lưu người dùng vào MongoDB:", saveError);
        return next(new InternalServerError('Không thể lưu thông tin người dùng. Vui lòng thử lại.'));
      }
  } catch (error) {
    console.error("Lỗi khi xác thực OTP:", error);
    next(new InternalServerError('Xác thực OTP thất bại'));
  }
};


exports.login = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Tìm người dùng trong mô hình User thay vì Reader để bao gồm cả admin và reader
    const user = await User.findOne({ email });
    if (!user) {
      console.error('Không tìm thấy người dùng với email:', email);
      return next(new BadRequestError('Không tìm thấy người dùng'));
    }

    // Kiểm tra người dùng đã xác thực email chưa
    if (!user.isVerified) {
      return next(new BadRequestError('Tài khoản chưa được xác thực. Vui lòng xác thực email.'));
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Mật khẩu không chính xác cho email:', email);
      return next(new BadRequestError('Mật khẩu không chính xác'));
    }

    // Tạo token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'your_jwt_secret', // Thay bằng chuỗi bí mật
      { expiresIn: '5h' }
    );

    user.token = token;
    await user.save();

    console.log('Đăng nhập thành công cho email:', email);
    res.json({ token });
    
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

