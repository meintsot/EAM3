import { useAuth } from "../../providers/AuthProvider";
import { useParams } from "react-router-dom";
import Accordions from "../../components/Accordions";
import SimpleTable from "../../components/Table/SimpleTable";
import HistoryTable from "../../components/Table/HistoryTable";

const Course = () => {
  const { userData } = useAuth();
  const { userProfile } = userData;
  const { courseId } = useParams();

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
        <HistoryTable rows={historyRows} />,
      ]}
    />
  );
};

export default Course;
