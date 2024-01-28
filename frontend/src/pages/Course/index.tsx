import { Typography, Box } from "@mui/material";
import Accordions from "../../components/Accordions";
import SimpleTable from "../../components/Table/SimpleTable";
import {useEffect, useState} from "react";
import {CourseDetailsDTO} from "../../../../backend/models/types/course";
import {useParams} from "react-router-dom";
import API from "../../api";
import {useAuth} from "../../providers/AuthProvider";

const Course = () => {
  const { userData } = useAuth();
  const params = useParams<{ courseId?: string }>();
  console.log(params)

  const [courseDetails, setCourseDetails] = useState<CourseDetailsDTO | null>(null);

  useEffect(() => {
      if (params.courseId) {
          API.retrieveCourse(params.courseId).then(res => setCourseDetails(res));
      }
  }, [userData.authToken, params.courseId]);

  const generalInfoTitles = {
    courseId: "Κωδικός μαθήματος",
    semester: "Εξάμηνο",
    category: "Τύπος μαθήματος",
    fieldOfStudies: "Κατεύθυνση",
    ects: "ECTS",
    teachingHours: "Διδακτικές ώρες",
    majors: "Ειδικεύσεις",
    relevantCourses: "Σχετικά μαθήματα",
  };
  const additionalInfoTitles = {
    links: "Σύνδεσμοι",
    bibliography: "Βιβλιογραφία",
  };

  const sections = [
    {
      title: "Γενικές πληροφορίες",
      rows: [],
    },
    {
      title: "Περιγραφή",
      rows: [],
    },
    {
      title: "Σύνδεσμοι και βιβλιογραφία",
      rows: [],
    },
  ];

  return courseDetails ? (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {courseDetails?.generalInformation.courseName}
      </Typography>
      <Accordions
        sections={sections}
        children={[
          <SimpleTable
            titleRows={generalInfoTitles}
            valueRows={courseDetails?.generalInformation}
          />,
          <Box sx={{ p: "24px" }}>
            <Typography variant="body2">{courseDetails?.description}</Typography>
          </Box>,
          <SimpleTable
            titleRows={additionalInfoTitles}
            valueRows={courseDetails?.additionalInformation}
          />,
        ]}
      />
    </Box>
  ) : <></>;
};

export default Course;
