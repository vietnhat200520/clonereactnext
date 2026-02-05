import React, { useState } from 'react';
import { 
    Dialog, DialogContent, DialogTitle, IconButton, 
    Typography, TextField, Button, Box, InputAdornment 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import './style.scss';

interface AuthRegisterProps {
    open: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

const AuthRegister: React.FC<AuthRegisterProps> = ({ open, onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        email: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        // 1. Kiểm tra validation cơ bản
        if (!formData.username || !formData.password || !formData.fullName || !formData.email || !formData.phone) {
            alert("Vui lòng điền đầy đủ các trường có dấu *");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        // 2. Chuẩn bị dữ liệu gửi lên (Khớp với destruct trong Controller)
        const payload = {
            username: formData.username,
            password: formData.password,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
        };

        try {

            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.status === 201) {
                alert("Đăng ký thành công! Hãy đăng nhập.");
                // Reset form
                setFormData({
                    username: '', password: '', confirmPassword: '',
                    fullName: '', email: '', phone: ''
                });
                onClose();
                onSwitchToLogin(); 
            } else {
                
                alert("Lỗi đăng ký: " + (data.error || data.message));
            }
        } catch (error) {
            console.error("Lỗi kết nối API:", error);
            alert("Không thể kết nối đến máy chủ. Hãy kiểm tra Backend đã chạy chưa?");
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            classes={{ paper: 'auth-register-paper' }}
        >
            <IconButton className="close-icon-btn" onClick={onClose}>
                <CloseIcon />
            </IconButton>

            <DialogTitle className="register-title-container">
                <Typography variant="h5" className="title-text">Đăng ký</Typography>
            </DialogTitle>

            <DialogContent className="register-content-root">
                <Box className="register-form-grid">
                    {/* Cột 1: Thông tin tài khoản */}
                    <Box className="form-column">
                        <Typography className="form-column-title">1. Thông tin tài khoản</Typography>
                        <TextField
                            fullWidth
                            name="username"
                            value={formData.username}
                            placeholder="Tài khoản đăng nhập*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonOutlineIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            name="password"
                            value={formData.password}
                            type="password"
                            placeholder="Mật khẩu*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            type="password"
                            placeholder="Xác nhận mật khẩu*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                            }}
                        />
                    </Box>

                    
                    <Box className="form-column">
                        <Typography className="form-column-title">2. Thông tin cá nhân</Typography>
                        <TextField
                            fullWidth
                            name="fullName"
                            value={formData.fullName}
                            placeholder="Họ và tên*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonOutlineIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            name="email"
                            value={formData.email}
                            placeholder="Email*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><MailOutlineIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            name="phone"
                            value={formData.phone}
                            placeholder="Số điện thoại*"
                            className="register-input-field"
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LocalPhoneOutlinedIcon /></InputAdornment>,
                            }}
                        />
                    </Box>
                </Box>

                <Box className="action-area">
                    <Button className="register-submit-btn" onClick={handleRegister}>
                        Đăng ký
                    </Button>

                    <Box className="divider-container">
                        <Box className="divider-line" />
                        <span className="divider-text">HOẶC</span>
                        <Box className="divider-line" />
                    </Box>

                    <Button className="google-login-btn">
                        <img 
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                            alt="google" 
                            className="google-icon"
                        />
                        Đăng nhập với Google
                    </Button>

                    <Typography className="login-redirect-text">
                        Đã có tài khoản?{' '}
                        <span className="login-link" onClick={onSwitchToLogin}>Đăng nhập ngay</span>
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AuthRegister;