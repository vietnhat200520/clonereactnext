import React, { useState } from 'react';
import { 
    Box, IconButton, Badge, Avatar, Menu, 
    MenuItem, Typography, Divider 
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAppSelector } from '@/store/hook';
import './style.scss';

interface UserHeaderActionProps {
    user: { fullName: string; email: string; avatar?: string; };
    notificationCount?: number;
    cartCount?: number;
    onLogout?: () => void;
}

const UserHeaderAction: React.FC<UserHeaderActionProps> = ({ 
    user, 
    notificationCount = 0, 
    cartCount = 0,
    onLogout 
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMounted = useIsMounted();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    
    if (!isMounted || !isAuthenticated) return null;

    return (
        <Box classes={{root:'user-header-action-root'}}>
            <IconButton className="header-icon-btn">
                <Badge badgeContent={cartCount} color="error" classes={{ badge: 'custom-badge' }}>
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>

            <IconButton className="header-icon-btn">
                <Badge badgeContent={notificationCount} color="error" classes={{ badge: 'custom-badge' }}>
                    <NotificationsNoneOutlinedIcon />
                </Badge>
            </IconButton>

            <Box className="user-profile-trigger" onClick={handleOpenMenu}>
            <Avatar className="header-user-avatar" sx={{ bgcolor: '#d32f2f' }}>

        {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}

            </Avatar>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                classes={{ paper: 'user-dropdown-paper' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box className="menu-user-info-header">
                    <Avatar src={user.avatar} className="large-menu-avatar" />
                    <Box className="text-info">
                        <Typography variant="subtitle1" className="user-name">{user.fullName}</Typography>
                        <Typography variant="body2" className="user-email">{user.email}</Typography>
                    </Box>
                </Box>
                
                <MenuItem onClick={handleCloseMenu} className="dropdown-item">LỊCH SỬ GIAO DỊCH</MenuItem>
                <Divider className="menu-divider" />
                <MenuItem onClick={handleCloseMenu} className="dropdown-item">KHOÁ HỌC CỦA TÔI</MenuItem>
                <Divider className="menu-divider" />
                
                <MenuItem 
                    onClick={() => { handleCloseMenu(); onLogout?.(); }} 
                    className="dropdown-item logout-text"
                >
                    ĐĂNG XUẤT
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserHeaderAction;