import { useState, useEffect } from "react";
import { Paper, Box, Button, Typography } from "@mui/material";
import BasicInput from "../../components/Input/BasicInput";
import PasswordInput from "../../components/Input/PasswordInput";
import DropdownInput from "../../components/Input/DropdownInput";
import AutocompleteInput from "../../components/Input/AutocompleteInput";
import MultipleAutocompleteInput from "../../components/Input/MultipleAutocompleteInput";
import ImageUploader from "../../components/Input/ImageUploader";
import { useAuth } from "../../providers/AuthProvider";
import { buildRegisterPayload } from "../../mappers";

import "./Register.css";
import API from "../../api";
import { CourseDTO } from "../../../../backend/models/types/course";
import { useNavigate } from "react-router";

const Register: React.FC = () => {
  const [formValues, setFormValues] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    userType: "",
    firstName: "",
    lastName: "",
    department: "",
    phoneNumber: "",
    profilePicture: "",
    fathersName: "",
    mothersName: "",
    dateOfBirth: "",
    maritalStatus: "",
    placeOfBirth: "",
    idNumber: "",
    issuingAuthority: "",
    dateOfPublish: "",
    socialSecurityNumber: "",
    address: "",
    city: "",
    telephone: "",
    postalCode: "",
    temporaryAddress: "",
    temporaryCity: "",
    temporaryTelephone: "",
    temporaryPostalCode: "",
    myCourses: [],
  });
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<string>("student");
  const [errorFields, setErrorFields] = useState<Array<string>>([]);
  const userTypes = ["Φοιτητής/τρια", "Καθηγητής/τρια"];
  const departments = [
    "ΤΜΗΜΑ ΑΕΡΟΔΙΑΣΤΗΜΙΚΗΣ ΕΠΙΣΤΗΜΗΣ ΚΑΙ ΤΕΧΝΟΛΟΓΙΑΣ",
    "ΤΜΗΜΑ ΒΙΟΛΟΓΙΑΣ",
    "ΤΜΗΜΑ ΓΕΩΛΟΓΙΑΣ ΚΑΙ ΓΕΩΠΕΡΙΒΑΛΛΟΝΤΟΣ",
    "ΤΜΗΜΑ ΙΣΤΟΡΙΑΣ ΚΑΙ ΦΙΛΟΣΟΦΙΑΣ ΤΗΣ ΕΠΙΣΤΗΜΗΣ",
    "ΤΜΗΜΑ ΜΑΘΗΜΑΤΙΚΩΝ",
    "ΤΜΗΜΑ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ",
    "ΤΜΗΜΑ ΤΕΧΝΟΛΟΓΙΩΝ ΨΗΦΙΑΚΗΣ ΒΙΟΜΗΧΑΝΙΑΣ",
    "ΤΜΗΜΑ ΦΥΣΙΚΗΣ",
    "ΤΜΗΜΑ ΘΕΟΛΟΓΙΑΣ",
    "ΤΜΗΜΑ ΚΟΙΝΩΝΙΚΗΣ ΘΕΟΛΟΓΙΑΣ ΚΑΙ ΘΡΗΣΚΕΙΟΛΟΓΙΑΣ",
    "ΤΜΗΜΑ ΕΠΙΣΤΗΜΗΣ ΦΥΣΙΚΗΣ ΑΓΩΓΗΣ ΚΑΙ ΑΘΛΗΤΙΣΜΟΥ",
    "ΤΜΗΜΑ ΙΑΤΡΙΚΗΣ",
    "ΤΜΗΜΑ ΝΟΣΗΛΕΥΤΙΚΗΣ",
    "ΤΜΗΜΑ ΟΔΟΝΤΙΑΤΡΙΚΗΣ",
    "ΤΜΗΜΑ ΦΑΡΜΑΚΕΥΤΙΚΗΣ",
    "ΠΑΙΔΑΓΩΓΙΚΟ ΤΜΗΜΑ ΔΗΜΟΤΙΚΗΣ ΕΚΠΑΙΔΕΥΣΗΣ",
    "ΤΜΗΜΑ ΕΚΠΑΙΔΕΥΣΗΣ ΚΑΙ ΑΓΩΓΗΣ ΣΤΗΝ ΠΡΟΣΧΟΛΙΚΗ ΗΛΙΚΙΑ",
    "ΤΜΗΜΑ ΑΓΡΟΤΙΚΗΣ ΑΝΑΠΤΥΞΗΣ, ΑΓΡΟΔΙΑΤΡΟΦΗΣ ΚΑΙ ΔΙΑΧΕΙΡΙΣΗΣ ΦΥΣΙΚΩΝ ΠΟΡΩΝ",
  ];
  const maritalStatuses = [
    "Άγαμος/η",
    "Έγγαμος/η",
    "Σε σύμφωνο συμβίωσης",
    "Διαζευγμένος/η",
    "Χήρος/α",
  ];
  const [availableCourses, setAvailableCourses] = useState([] as CourseDTO[]);

  useEffect(() => {
    setUser(formValues.userType);
  }, [formValues.userType]);

  useEffect(() => {
    API.getAvailableCourses().then((courses) => setAvailableCourses(courses));
  }, []);

  const handleChange = (id: string, value: any) => {
    setFormValues({ ...formValues, [id]: value });
  };

  const handleCoursesChange = (id: string, courseNames: string[]) => {
    const courses = availableCourses
      .filter((course) => courseNames.includes(course.courseName))
      .map((course) => course.courseId);
    setFormValues({ ...formValues, [id]: courses });
  };

  const handleFileUpload = (id: string, value: any) => {
    setFile(value);
  };

  const { register } = useAuth();

  const handleSubmit = () => {
    console.log(formValues);
    setErrorFields(
      Object.keys(formValues).filter(
        (key: string) => formValues[key as keyof typeof formValues] === ""
      )
    );
    const payload = buildRegisterPayload(formValues);
    if (file !== null) {
      // Upload the file
      const formData = new FormData();
      formData.append("image", file, file.name);
      API.uploadProfileImage(formData).then((fileURL: string) => {
        formValues.profilePicture = fileURL;
        register(payload).then(() => navigate("/"));
      });
    } else {
      register(payload).then(() => navigate("/"));
    }
  };

  return (
    <div className="container">
      <Paper className="registerFormContainer">
        <Box className="registerForm">
          <Box className="profilePicUploader">
            <ImageUploader
              id="profilePicture"
              onChange={handleFileUpload}
              error={errorFields.includes("profilePicture")}
            />
          </Box>
          <Box className="registerFormSection">
            <BasicInput
              id="userName"
              placeholder="Όνομα χρήστη"
              onChange={handleChange}
              error={errorFields.includes("userName")}
              errorText="Το όνομα χρήστη είναι υποχρεωτικό"
              required
            />
            <PasswordInput
              id="password"
              placeholder="Κωδικός"
              onChange={handleChange}
              error={errorFields.includes("password")}
              errorText="Ο κωδικός είναι υποχρεωτικός"
              required
            />
            <PasswordInput
              id="confirmPassword"
              placeholder="Επιβεβαίωση κωδικού"
              onChange={handleChange}
              error={errorFields.includes("confirmPassword")}
              errorText="Οι κωδικοί δεν ταιριάζουν"
              required
            />
          </Box>
          <Box className="registerFormSection">
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Γενικές πληροφορίες
            </Typography>
            <Box className="registerFormSectionTwoColumns">
              <Box className="registerFormSectionColumn">
                <BasicInput
                  id="firstName"
                  placeholder="Όνομα"
                  onChange={handleChange}
                  error={errorFields.includes("firstName")}
                  errorText="Το όνομα είναι υποχρεωτικό"
                  required
                />
                <BasicInput
                  id="lastName"
                  placeholder="Επώνυμο"
                  onChange={handleChange}
                  error={errorFields.includes("lastName")}
                  errorText="Το επώνυμο είναι υποχρεωτικό"
                  required
                />
              </Box>
              <Box className="registerFormSectionColumn">
                <BasicInput
                  id="phoneNumber"
                  placeholder="Κινητό τηλέφωνο"
                  onChange={handleChange}
                  error={errorFields.includes("phoneNumber")}
                  errorText="Το κινητό τηλέφωνο είναι υποχρεωτικό"
                  required
                />
                <DropdownInput
                  id="userType"
                  items={userTypes}
                  placeholder="Τύπος χρήστη"
                  onChange={handleChange}
                  error={errorFields.includes("userType")}
                  errorText="Ο τύπος χρήστη είναι υποχρεωτικός"
                  required
                />
              </Box>
            </Box>
            <AutocompleteInput
              id="department"
              items={departments}
              placeholder="Τμήμα"
              onChange={handleChange}
              error={errorFields.includes("department")}
              errorText="Το τμήμα είναι υποχρεωτικό"
              required
            />
          </Box>
          <Box className="registerFormSection">
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Προσωπικά στοιχεία
            </Typography>
            <Box className="registerFormSectionTwoColumns">
              <Box className="registerFormSectionColumn">
                <BasicInput
                  id="fathersName"
                  placeholder="Όνομα πατέρα"
                  onChange={handleChange}
                  error={errorFields.includes("fathersName")}
                  errorText="Το όνομα πατέρα είναι υποχρεωτικό"
                  required
                />
                <BasicInput
                  id="mothersName"
                  placeholder="Όνομα μητέρας"
                  onChange={handleChange}
                  error={errorFields.includes("mothersName")}
                  errorText="Το όνομα μητέρας είναι υποχρεωτικό"
                  required
                />
                <BasicInput
                  id="dateOfBirth"
                  placeholder="Ημερομηνία γέννησης"
                  onChange={handleChange}
                  error={errorFields.includes("dateOfBirth")}
                  errorText="Η ημερομηνία γέννησης είναι υποχρεωτική"
                  required
                />
                <DropdownInput
                  id="maritalStatus"
                  items={maritalStatuses}
                  placeholder="Οικογενειακή κατάσταση"
                  onChange={handleChange}
                />
              </Box>
              <Box className="registerFormSectionColumn">
                <BasicInput
                  id="idNumber"
                  placeholder="ΑΔΤ"
                  onChange={handleChange}
                  error={errorFields.includes("idNumber")}
                  errorText="Ο αριθμός δελτίου ταυτότητας είναι υποχρεωτικός"
                  required
                />
                <BasicInput
                  id="issuingAuthority"
                  placeholder="Εκδούσα αρχή"
                  onChange={handleChange}
                />
                <BasicInput
                  id="dateOfPublish"
                  placeholder="Ημερομηνία έκδοσης"
                  onChange={handleChange}
                  error={errorFields.includes("dateOfPublish")}
                  errorText="Η ημερομηνία έκδοσης είναι υποχρεωτική"
                  required
                />
                <BasicInput
                  id="socialSecurityNumber"
                  placeholder="ΑΜΚΑ"
                  onChange={handleChange}
                  error={errorFields.includes("socialSecurityNumber")}
                  errorText="Ο ΑΜΚΑ είναι υποχρεωτικός"
                  required
                />
              </Box>
            </Box>
            <BasicInput
              id="placeOfBirth"
              placeholder="Τόπος γέννησης"
              onChange={handleChange}
              error={errorFields.includes("placeOfBirth")}
              errorText="Ο τόπος γέννησης είναι υποχρεωτικός"
              required
            />
          </Box>
          <Box className="registerFormSection">
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Στοιχεία επικοινωνίας
            </Typography>
            <Box className="registerFormSectionTwoColumns">
              <Box className="registerFormSectionColumn">
                <BasicInput
                  id="address"
                  placeholder="Μόνιμη διεύθυνση κατοικίας"
                  onChange={handleChange}
                  error={errorFields.includes("address")}
                  errorText="Η μόνιμη διεύθυνση κατοικίας είναι υποχρεωτική"
                  required
                />
                <BasicInput
                  id="city"
                  placeholder="Μόνιμη πόλη κατοικίας"
                  onChange={handleChange}
                  error={errorFields.includes("city")}
                  errorText="Η μόνιμη πόλη κατοικίας είναι υποχρεωτική"
                  required
                />
                <BasicInput
                  id="telephone"
                  placeholder="Τηλέφωνο μόνιμης κατοικίας"
                  onChange={handleChange}
                />
                <BasicInput
                  id="postalCode"
                  placeholder="ΤΚ μόνιμης κατοικίας"
                  onChange={handleChange}
                  error={errorFields.includes("postalCode")}
                  errorText="Ο ταχυδρομικός κώδικας είναι ιυποχρεωτικός"
                  required
                />
              </Box>
              <Box className="registerFormSectionColumn">
                <BasicInput
                  id="temporaryAddress"
                  placeholder="Προσωρινή διεύθυνση κατοικίας"
                  onChange={handleChange}
                />
                <BasicInput
                  id="temporaryCity"
                  placeholder="Προσωρινή πόλη κατοικίας"
                  onChange={handleChange}
                />
                <BasicInput
                  id="temporaryTelephone"
                  placeholder="Τηλέφωνο προσωρινής κατοικίας"
                  onChange={handleChange}
                />
                <BasicInput
                  id="temporaryPostalCode"
                  placeholder="ΤΚ προσωρινής κατοικίας"
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Box>
          {user === "Καθηγητής/τρια" ? (
            <Box className="registerFormSection">
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Μαθήματα
              </Typography>
              <MultipleAutocompleteInput
                id="myCourses"
                items={availableCourses.map((course) => course.courseName)}
                placeholder="Μάθημα"
                onChange={handleCoursesChange}
                error={errorFields.includes("myCourses")}
                errorText="Το μάθημα είναι υποχρεωτικό"
                required
              />
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <Button
          variant="contained"
          fullWidth
          className="registerButton"
          onClick={handleSubmit}
          sx={{ fontWeight: "bold" }}
        >
          ΣΥΝΔΕΣΗ
        </Button>
      </Paper>
    </div>
  );
};

export default Register;
