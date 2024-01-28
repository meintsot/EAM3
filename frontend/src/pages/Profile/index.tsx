import { Box, Typography, IconButton } from "@mui/material";
import Accordions from "../../components/Accordions";
import SimpleTable from "../../components/Table/SimpleTable";
import HistoryTable from "../../components/Table/HistoryTable";
import { useAuth } from "../../providers/AuthProvider";
import API from "../../api/index";
import { useEffect, useState } from "react";
import { RetrieveUserHistoryResponse } from "../../../../backend/models/types/userHistory";
import Edit from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";

const Profile = () => {
  const { userData } = useAuth();
  const { userType, userProfile } = userData;
  const [historyData, setHistoryData] = useState<RetrieveUserHistoryResponse>({
    userHistory: [],
    total: 0,
  });
  const navigate = useNavigate();

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

  const sections = [
    {
      title: "Προσωπικά στοιχεία",
    },
    {
      title: "Στοιχεία επικοινωνίας",
    },
    {
      title: "Ιστορικό",
    },
  ];

  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {userProfile.generalInformation.firstName}{" "}
        {userProfile.generalInformation.lastName}
        <IconButton onClick={(e) => navigate("/edit-profile")}>
          <Edit />
        </IconButton>
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
