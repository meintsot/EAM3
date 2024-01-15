import Accordions from "../../components/Accordions";
import SimpleTable from "../../components/Table/SimpleTable";
import HistoryTable from "../../components/Table/HistoryTable";
import { useAuth } from "../../providers/AuthProvider";

const Profile = () => {
  const { userData } = useAuth();
  const { userProfile } = userData;

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

  // Ο τύπος του Object εδώ (στο historyRows) είναι ενδεικτικός, μπορείς να το αλλάξεις ανάλογα με το τι έρχεται από
  // το backend.
  // Αν αλλάξεις τα properties, πας και τα αλλάζεις και μέσα στο HistoryTable component. Και άλλαξε τον τύπο στο
  // model (HistoryItem). Αλλά γενικά τα rows του HistoryTable πρέπει να είναι πίνακας από Objects.
  // Σε αντίθεση με το SimpleTable όπου εκεί έχουμε αντιστοίχιση πινάκων με βάση τα keys. Αλλά το SimpleTable δεν
  // σε ενδιαφέρει γιατ΄ί παίρνω τα data από το useAuth. Επίσης το Simple table πιθανώς να δεχτεί reconstruction
  // σε επόμενο στάδιο όταν θα δω τη σελίδα μαθήματος.

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

export default Profile;
