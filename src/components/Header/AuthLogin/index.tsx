import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginSuccess } from '@/store/slices/authSlice';
import { 
    Dialog, DialogContent, DialogTitle, IconButton, 
    Typography, TextField, Button, Box, InputAdornment 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './style.scss';

interface AuthLoginProps {
    open: boolean;
    onClose: () => void;
    onSwitchToRegister?: () => void;
}

const AuthLogin: React.FC<AuthLoginProps> = ({ open, onClose, onSwitchToRegister }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            // Gọi API đăng nhập thực tế của bạn
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (response.ok) {
                // Cập nhật thông tin vào Redux
                dispatch(loginSuccess(data.user));
                
                alert("Đăng nhập thành công!");
                onClose();
                router.push('/'); 
            } else {
                alert(data.message || "Tài khoản hoặc mật khẩu không chính xác!");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Lỗi kết nối máy chủ!");
        }
    };
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="xs" 
            fullWidth 
            classes={{ paper: 'auth-login-paper' }}
        >
            <IconButton className="close-icon-btn" onClick={onClose}>
                <CloseIcon />
            </IconButton>
            
            <DialogTitle className="login-title-container" component="div">
                <Typography variant="h5" className="title-text">Đăng nhập</Typography>
            </DialogTitle>

            <DialogContent className="login-content-root">
                <Box component="form" className="login-form-body">
                    <TextField
                        fullWidth 
                        name="username" 
                        placeholder="Tài khoản đăng nhập"
                        className="login-input-field" 
                        margin="normal" 
                        onChange={handleChange}
                        InputProps={{ 
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon />
                                </InputAdornment>
                            ) 
                        }}
                    />
                    <TextField
                        fullWidth 
                        name="password" 
                        type="password" 
                        placeholder="Mật khẩu"
                        className="login-input-field" 
                        margin="normal" 
                        onChange={handleChange}
                        InputProps={{ 
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            ) 
                        }}
                    />
                    
                    <Typography className="forgot-password-link">Quên mật khẩu</Typography>
                    
                    <Button className="login-submit-btn" onClick={handleLogin}>
                        Đăng nhập
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
                    
                    <Typography className="register-redirect-text">
                        Không có tài khoản?{' '}
                        <span className="register-link" onClick={onSwitchToRegister}>
                            Đăng ký ngay
                        </span>
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AuthLogin;