import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Modal,
  IconButton,
  ListItemText,
  Paper,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { SliderListModalProps } from "../../../model";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import closeIcon from "../../../assets/icons/close_black_36dp.svg";
import "./SliderListModal.css";

const SliderListModal: React.FC<SliderListModalProps> = ({
  courses,
  onClick,
  open,
  onOpen,
}) => {
  const handleClose = () => onOpen(false);
  const handleChoice = (id: string) => {
    onClick(id);
    handleClose();
  };

  console.log(courses.length);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="sliderModalContent">
        <Box className="modal-header">
          <Box sx={{ width: "36px" }}></Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ textAlign: "center", fontWeight: "medium" }}
          >
            Επιλέξτε μάθημα για να συνεχίσετε
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ alignSelf: "start", width: "36px", height: "36px" }}
            size="small"
          >
            <img alt="" src={closeIcon} />
          </IconButton>
        </Box>
        <Paper>
          <List className="slider-list" sx={{ p: 0 }}>
            {courses.map((course) => (
              <ListItem
                divider
                key={course.courseId}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <KeyboardArrowRightIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => handleChoice(course.courseId)}
                >
                  <ListItemText
                    id={`list-label-${course.courseName}`}
                    primary={course.courseName}
                    primaryTypographyProps={{ variant: "body1" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Modal>
  );
};

export default SliderListModal;
