import React from 'react';
import { Button } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import './style.scss';

interface ButtonChatProps {
    children: React.ReactNode;
    link: string;
}

const ButtonChat: React.FC<ButtonChatProps> = ({ children, link }) => {
    return (
        <Button
            classes={{ root: 'button-chat-root' }}
            variant="contained"
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<MessageIcon  />}
        >
            <span className="chat-text">{children}</span>
        </Button>
    );
};

export default ButtonChat;