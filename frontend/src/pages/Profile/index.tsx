import Accordions from "../../components/Accordions";

const Profile = () => {
  const sections = [
    {
      title: "Γενικές πληροφορίες",
      type: "info",
      rows: [
        { col1: "Όνομα", col2: "Μαρία" },
        { col1: "Επώνυμο", col2: "Παρασκευοπούλου" },
        { col1: "ΑΜΚΑ", col2: "25040002682" },
      ],
    },
  ];
  return <Accordions sections={sections} />;
};

export default Profile;
