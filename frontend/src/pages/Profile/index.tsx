import Accordions from "../../components/Accordions";
import SimpleTable from "../../components/Table/SimpleTable";

const Profile = () => {
  const personalInfo = {
    fathersName: "Αθανάσιος",
    mothersName: "Αλίκη",
    dateOfBirth: "09-09-2001",
    maritalStatus: "Διαζευγμένος",
    placeOfBirth: "Μαρούσι",
    idNumber: "AK829682",
    issuingAuthority: "Τ.Α. Ιλίου",
    dateOfPublish: "19-02-2014",
    socialSecurityNumber: "09090100992",
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
  const communicationDetals = {
    address: "Πίνδου 50 Ίλιον",
    city: "Αθήνα",
    telephone: "2105018562",
    postalCode: "13123",
    temporaryAddress: "Νικομηδίας 64 Περιστέρι",
    temporaryCity: "Αθήνα",
    temporaryTelephone: "2105762943",
    temporaryPostalCode: "12134",
    email: "sdi1900234@di.uoa.gr",
  };
  const communicationDetalsTitles = {
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
  const historyActions = {
    action0: "Σύνδεση στο λογαριασμό μου",
    action1: "Υποβολή δήλωσης",
    action2: "Αίτηση πιστοποιητικού",
    action3: "Σύνδεση στο λογαριασμό μου",
    action4: "Υποβολή δήλωσης",
    action5: "Αίτηση πιστοποιητικού",
  };
  const historyDates = {
    action0: "Κυριακή 03/12/2023 (16:00)",
    action1: "Κυριακή 03/12/2023 (16:00)",
    action2: "Κυριακή 03/12/2023 (16:00)",
    action3: "Κυριακή 03/12/2023 (16:00)",
    action4: "Κυριακή 03/12/2023 (16:00)",
    action5: "Κυριακή 03/12/2023 (16:00)",
  };
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
          valueRows={personalInfo}
          pagination={false}
          type="info"
        />,
        <SimpleTable
          titleRows={communicationDetalsTitles}
          valueRows={communicationDetals}
          pagination={false}
          type="info"
        />,
        <SimpleTable
          titleRows={historyActions}
          valueRows={historyDates}
          pagination={true}
          type="history"
        />,
      ]}
    />
  );
};

export default Profile;
