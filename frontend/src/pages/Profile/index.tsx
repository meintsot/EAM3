import { Box, Typography } from "@mui/material";
import Accordions from "../../components/Accordions";
import SimpleTable from "../../components/Table/SimpleTable";
import HistoryTable from "../../components/Table/HistoryTable";
import { useAuth } from "../../providers/AuthProvider";
import API from "../../api/index";
import { useEffect, useState } from "react";
import { RetrieveUserHistoryResponse } from "../../../../backend/models/types/userHistory";

const Profile = () => {
  const { userData } = useAuth();
  const { userType, userProfile } = userData;
  const [historyData, setHistoryData] = useState<RetrieveUserHistoryResponse>({
    userHistory: [],
    total: 0,
  });

  useEffect(() => {
    const authToken = userData.authToken;
    if (authToken) {
      API.retrieveUserHistory({ page: 1, pageSize: 5 }).then((res) => {
        setHistoryData(res);
      });
    }
  }, [userData.authToken]);

  const handleHistoryPageChange = (page: number, pageSize: number) => {
    const authToken = userData.authToken;
    if (authToken) {
      API.retrieveUserHistory({ page, pageSize }).then((res) => {
        setHistoryData(res);
      });
    }
  };

  const personalInfoTitles = {
    fathersName: "Όνομα πατέρα",
    mothersName: "Όνομα μητέρας",
    dateOfBirth: "Ημερομηνία γέννησης",
    maritalStatus: "Οικογενειακή κατάσταση",
    placeOfBirth: "Τόπος γέννησης",
    idNumber: "Αριθμός ταυτότητας",
    issuingAuthority: "Εκδούσα αρχή",
    dateOfPublish: "Ημερομηνία έκδοσης",
    socialSecurityNumber: "ΑΜΚΑ",
  };
  const communicationDetailsTitles = {
    address: "Μόνιμη Διεύθυνση Κατοικίας",
    city: "Μόνιμη Πόλη Κατοικίας",
    telephone: "Τηλέφωνο Μόνιμης Κατοικίας",
    postalCode: "ΤΚ Μόνιμης Κατοικίας",
    temporaryAddress: "Προσωρινή Διεύθυνση Κατοικίας",
    temporaryCity: "Προσωρινή Πόλη Κατοικίας",
    temporaryTelephone: "Τηλέφωνο Προσωρινής Κατοικίας",
    temporaryPostalCode: "ΤΚ Προσωρινής Κατοικίας",
    email: "Διεύθυνση Ηλεκτρονικού Ταχυδρομείου",
  };

  const historyRows = [
    {
      key: "action0",
      action: "Σύνδεση στο λογαριασμό μου",
      date: "Κυριακή 03/12/2023 (16:00)",
    },
    {
      key: "action1",
      action: "Υποβολή δήλωσης",
      date: "Κυριακή 03/12/2023 (16:00)",
    },
    {
      key: "action2",
      action: "Αίτηση πιστοποιητικού",
      date: "Κυριακή 03/12/2023 (16:00)",
    },
    {
      key: "action1",
      action: "Υποβολή δήλωσης",
      date: "Κυριακή 03/12/2023 (16:00)",
    },
  ];

  const sections = [
    {
      title: "Προσωπικά στοιχεία",
      rows: [
        { col1: "Όνομα", col2: "Μαρία" },
        { col1: "Επώνυμο", col2: "Παρασκευοπούλου" },
        { col1: "ΑΜΚΑ", col2: "25040002682" },
      ],
    },
    {
      title: "Στοιχεία επικοινωνίας",
      rows: [
        { col1: "Όνομα", col2: "Μαρία" },
        { col1: "Επώνυμο", col2: "Παρασκευοπούλου" },
        { col1: "ΑΜΚΑ", col2: "25040002682" },
      ],
    },
    {
      title: "Ιστορικό",
      rows: [
        { col1: "Όνομα", col2: "Μαρία" },
        { col1: "Επώνυμο", col2: "Παρασκευοπούλου" },
        { col1: "ΑΜΚΑ", col2: "25040002682" },
      ],
    },
  ];

  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {userProfile.generalInformation.firstName}
        {userProfile.generalInformation.lastName}
      </Typography>
      {userType === "student" && (
        <Box className="header">
          <Typography variant="body1">A.Μ.: {userProfile.studentId}</Typography>
        </Box>
      )}
      <Accordions
        sections={sections}
        children={[
          <SimpleTable
            titleRows={personalInfoTitles}
            valueRows={userProfile.personalInformation}
          />,
          <SimpleTable
            titleRows={communicationDetailsTitles}
            valueRows={userProfile.communicationDetails}
          />,
          <HistoryTable
            totalResults={historyData.total}
            rows={historyData.userHistory}
            onPageChange={handleHistoryPageChange}
          />,
        ]}
      />
    </Box>
  );
};

export default Profile;
