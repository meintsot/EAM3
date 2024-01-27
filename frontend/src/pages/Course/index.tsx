import { useAuth } from "../../providers/AuthProvider";
import { Typography, Box } from "@mui/material";
import Accordions from "../../components/Accordions";
import SimpleTable from "../../components/Table/SimpleTable";

const courseName = "Κινηματογραφία";
const defaultValueRowsGeneralInfo = {
  courseId: "12345",
  semester: "5",
  category: "Υποχρεωτικό",
  fieldOfStudies: "Θετική",
  ects: "133",
  teachingHours: { theory: 4, tutoring: 5, lab: 8 },
  majors: [
    { majorType: "Ψυχολογία (S54)", cardinality: "Β Βασικό" },
    { majorType: "Νευροεπιστήμη (S2)", cardinality: "Υ Υποχρεωτικό" },
  ],
  relevantCourses: {
    mandatory: ["Ιστορία της τέχνης", "Γεολογία"],
    optional: ["Παλαιοντολογία"],
  },
};
const defaultDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const defaultValueRowsAdditionalInfo = {
  links: [
    {
      name: "Επεξεργασία Στοχαστικών Σημάτων -ECLASS",
      url: "https://kskksksksksks",
    },
  ],
  bibliography: [
    "«Στατιστική επεξεργασία σημάτων και μάθηση: Βασικές Έννοιες, Αλγόριθμοι και Μοντέλα», Δ. Αμπελιώτης, Χ. Μαυροκεφαλίδης, Κ. Μπερμπερίδης, Εκδόσεις Κάλλιπος (Ηλεκτρονικές Εκδ. Συνδέσμου Ελληνικών Ακαδημαϊκών Βιβλιοθηκών), 2015. Διαθέσιμο ηλεκτρονικά«Αλγόριθμοι και εφαρμογές συστημάτων επικοινωνιών: Σήματα και συστήματα», N. Benvenuto and G. Cherubini, Εκδόσεις Παν/μιου Πατρών, 2004. (ΕΥΔΟΞΟΣ)",
    "«Αλγόριθμοι και εφαρμογές συστημάτων επικοινωνιών: Σήματα και συστήματα», N. Benvenuto and G. Cherubini, Εκδόσεις Παν/μιου Πατρών, 2004. (ΕΥΔΟΞΟΣ)",
  ],
};

const Course = () => {
  const { userData } = useAuth();
  const { userProfile } = userData;

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

  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {courseName}
      </Typography>
      <Accordions
        sections={sections}
        children={[
          <SimpleTable
            titleRows={generalInfoTitles}
            valueRows={defaultValueRowsGeneralInfo}
          />,
          <Box sx={{ p: "24px" }}>
            <Typography variant="body2">{defaultDescription}</Typography>
          </Box>,
          <SimpleTable
            titleRows={additionalInfoTitles}
            valueRows={defaultValueRowsAdditionalInfo}
          />,
        ]}
      />
    </Box>
  );
};

export default Course;
