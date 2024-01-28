import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import { Add } from "@mui/icons-material";

import { Column, CoursesRow, Filters } from "../../model";
import SliderListModal from "../../components/Modal/SliderListModal";
import {
  RetrieveGradingSystemRequest,
  RetrieveGradingSystemResponse,
} from "../../../../backend/models/types/gradingSystem";
import { useAuth } from "../../providers/AuthProvider";
import API from "../../api";

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
    searchInputType: "text",
    options: [],
  },
  {
    key: "state",
    label: "Κατάσταση βαθμολογίου",
    searchInputType: "dropdown",
    options: ["Προσωρινή αποθήκευση", "Οριστική υποβολή"],
  },
  {
    key: "examPeriod",
    label: "Εξεταστική περίοδος",
    searchInputType: "text",
    options: [],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const GradeBooks = () => {
  const [courses, setCourses] = useState<Array<CoursesRow>>([]);
  const navigate = useNavigate();
  const [gradebookResults, setGradebookResults] =
    useState<RetrieveGradingSystemResponse>({ gradingSystems: [], total: 0 });
  const [openModal, setOpenModal] = useState(false);

  const { userData } = useAuth();

  useEffect(() => {
    API.retrieveGradingSystems({ page: 1, pageSize: 10 }).then((res) =>
      setGradebookResults(res)
    );
    API.myCourses({ page: 1, pageSize: 100 }).then((res) =>
      setCourses(res.courses)
    );
  }, [userData.authToken]);

  const handleFilterChange = (filters: Filters) => {
    const request = filters as RetrieveGradingSystemRequest;
    API.retrieveGradingSystems(request).then((res) => setGradebookResults(res));
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleChoice = (courseId: string) => {
    console.log(courseId);
    navigate(`create-gradebook?courseId=${courseId!}`);
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
          rows={gradebookResults.gradingSystems ?? []}
          totalResults={gradebookResults.total ?? 0}
          onFilterChange={handleFilterChange}
          actions={["view"]}
        />
      </Box>
    </>
  );
};

export default GradeBooks;
