import React from "react";
import styles from "./Header.module.scss";
import { Link} from "react-router-dom";
import photo from "../../images/userPhoto.png";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import LinkMui from '@mui/material/Link';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <h1 className={styles.header__title}>Logistics</h1>
        <div>
          <Link className={styles.header__link} to={"/"}>
            Dashboard
          </Link>
          <Link to={"/dispatch"} className={styles.header__link}>Dispatch</Link>
        </div>
      </div>
      <div className={styles.avatar} onClick={handleOpen}>
        <Avatar src={photo}/>
        <div className={styles.avatar__container}>
          <span className={styles.avatar__text}>salenctawer</span>
          <span className={styles.avatar__text}>admin</span>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" onClick={handleClose}>
            Clear cache
          </Typography>
          <Typography id="modal-modal-title" sx={{ mt: 2 }} onClick={handleClose}>
            Logging out
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
