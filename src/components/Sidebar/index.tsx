import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


import "./style.scss";

// Định nghĩa Interface dữ liệu
export interface Category {
  id: string;
  school: string;
  branch?: string[];
  image?: string;
}

interface SidebarProps {
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  const [openMain, setOpenMain] = useState<boolean>(false);
  const [openSub, setOpenSub] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<string | null>(null);

  const toggleMain = () => setOpenMain(!openMain);

  const toggleSub = (id: string) => {
    setOpenSub((prev) => ({ 
      ...prev, 
      [id]: !prev[id] 
    }));
  };

  const handleClickCategory = (id: string, hasSubmenu: boolean) => {
    setActive(id);
    if (hasSubmenu) {
      toggleSub(id);
    }
  };

  return (
    <aside className="sidebar-container">
      <Box className="sidebar">
        {/* NÚT DANH MỤC CHÍNH */}
        <Button
          onClick={toggleMain}
          className="sidebar-button"
          startIcon={<MenuIcon />}
          disableElevation
        >
          Danh mục khóa học
        </Button>

        <Collapse in={openMain}>
          <List className="sidebar-list">
            {categories?.map((cat) => {
              const hasBranch = (cat.branch?.length ?? 0) > 0;
              const isSubOpen = !!openSub[cat.id];

              return (
                <Box key={cat.id}>
                  {/* ITEM CHA (TRƯỜNG HỌC) */}
                  <ListItemButton
                    onClick={() => handleClickCategory(cat.id, hasBranch)}
                    className={active === cat.id ? 'list-item-active' : ''}
                  >
                    <ListItemText
                      primary={cat.school}
                      classes={{ primary: 'item-text-primary' }}
                    />

                    {hasBranch && (
                      <ListItemIcon 
                        className={`arrow-icon ${isSubOpen ? 'open' : ''}`}
                      >
                        <KeyboardArrowDownIcon />
                      </ListItemIcon>
                    )}
                  </ListItemButton>

                  {/* DANH SÁCH CON (NGÀNH/BRANCH) */}
                  {hasBranch && (
                    <Collapse in={isSubOpen} timeout="auto" unmountOnExit>
                      <List className="submenu" component="div" disablePadding>
                        {cat.branch?.map((item, index) => {
                          const subId = `${cat.id}-${index}`;
                          return (
                            <ListItemButton
                              key={subId}
                              onClick={() => setActive(subId)}
                              className={active === subId ? 'list-item-active' : ''}
                            >
                              <ListItemText
                                primary={item}
                                classes={{ primary: 'sub-item-text-primary' }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                  <Divider />
                </Box>
              );
            })}
          </List>
        </Collapse>
      </Box>
    </aside>
  );
};

export default Sidebar;