import React, { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import './style.scss';

interface AuthButtonProps extends ButtonProps {
    label: string;
}

const AuthButton = ({ 
    onClick, 
    label, 
    className = '', 
    ...rest 
}: AuthButtonProps) => { 
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsClicked(true);
        
        // Tạo hiệu ứng click trong 200ms
        setTimeout(() => setIsClicked(false), 200);

        // Thực thi hàm onClick truyền từ props nếu có
        if (onClick) {
            onClick(event);
        }
    };

    // Gộp class theo logic state
    const statusClasses = isClicked ? 'clicked' : '';

    return (
        <Button
            onClick={handleClick}
            // Sử dụng đúng chuẩn classes.root như file mẫu bạn đưa
            classes={{ 
                root: `auth-button-root ${className} ${statusClasses}`.trim() 
            }} 
            {...rest}
        >
            {label}
        </Button>
    );
};

export default AuthButton;