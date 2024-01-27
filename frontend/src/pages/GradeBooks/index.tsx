import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import { Add } from "@mui/icons-material";

import { Column, CoursesRow } from "../../model";
import SliderListModal from "../../components/Modal/SliderListModal";

const defaultData = [
  {
    _id: "123",
    courseName: "mathima",
    courseId: "123",
    state: "Προσωρινή αποθήκευση",
    examPeriod: "january",
  },
];

const titles: Array<Column> = [
  {
    key: "_id",
    label: "Κωδικός βαθμολογίου",
    searchInputType: "text",
    options: [],
  },
  {
    key: "courseName",
    label: "Μάθημα",
    searchInputType: "text",
    options: [],
  },
  {
    key: "courseId",
    label: "Κωδικός μαθήματος",
    searchInputType: "dropdown",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    key: "state",
    label: "Κατάσταση βαθμολογίου",
    searchInputType: "dropdown",
    options: ["Υποχρεωτικό", "Βασικό"],
  },
  {
    key: "examPeriod",
    label: "Εξεταστική περίοδος",
    searchInputType: "dropdown",
    options: ["Ιανουάριος 23-24", "Ιούνιος 22-23", "Σεπτεμβριος 23-24"],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const GradeBooks = () => {
  const [courses, setCourses] = useState<Array<CoursesRow>>([
    {
      courseName: "Mathima1",
      courseId: "123",
      semester: 3,
      category: "string; ",
    },
    {
      courseName: "Mathima2",
      courseId: "124",
      semester: 3,
      category: " string; ",
    },
    {
      courseName: "Mathima3",
      courseId: "125",
      semester: 3,
      category: "string;",
    },
  ]);
  const navigate = useNavigate();
  const [gradebooks, setGradebooks] = useState(defaultData);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleChoice = (courseId: string) => {
    // create gradebook
    const gradebookId = "123";
    navigate(`/gradebooks/${gradebookId}?courseId=${courseId}`);
  };

  return (
    <>
      <SliderListModal
        courses={courses}
        open={openModal}
        onOpen={setOpenModal}
        onClick={(id) => handleChoice(id)}
      />
      <Box className="wrapper">
        <Box className="header">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Βαθμολόγια
          </Typography>
          <Button
            variant="contained"
            className="main-action-button"
            onClick={handleClick}
            sx={{ fontWeight: "bold", mt: 2 }}
          >
            νεο βαθμολογιο <Add fontSize="small" />
          </Button>
        </Box>
        <SearchTable
          columns={titles}
          rows={gradebooks}
          setRows={setGradebooks}
          actions={["view"]}
        />
      </Box>
    </>
  );
};

export default GradeBooks;
