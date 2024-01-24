import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import BasicInput from "../../components/Input/BasicInput";
import PasswordInput from "../../components/Input/PasswordInput";
import DropdownInput from "../../components/Input/DropdownInput";
import AutocompleteInput from "../../components/Input/AutocompleteInput";
import MultipleAutocompleteInput from "../../components/Input/MultipleAutocompleteInput";
import ImageUploader from "../../components/Input/ImageUploader";
import { useAuth } from "../../providers/AuthProvider";
import { buildRegisterPayload } from "../../mappers";
import DispatchAlert from "../../components/AlertBox/dispatchAlert";

import "./EditProfile.css";
import API from "../../api";
import { CourseDTO } from "../../../../backend/models/types/course";
import AlertBox from "../../components/AlertBox";

const EditProfile: React.FC = () => {
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
    email: "",
  });
  const { userData } = useAuth();
  const { userType } = userData;
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<string>("student");
  const [errorFields, setErrorFields] = useState<Array<string>>([]);
  const maritalStatuses = ["Παντρεμένος/η", "Άγαμος/η"];
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
    if (1) {
      const payload = buildRegisterPayload(formValues);
      if (file !== null) {
        // Upload the file
        const formData = new FormData();
        formData.append("image", file, file.name);
        API.uploadProfileImage(formData).then((fileURL: string) => {
          formValues.profilePicture = fileURL;
          register(payload);
        });
      } else {
        register(payload);
      }
    }
  };

  return (
    <div className="container">
      <AlertBox />
      <Box className="editFormContainer">
        <Box className="editForm">
          <Box className="editFormColumn1">
            <Box className="profilePicUploader">
              <ImageUploader
                id="profilePicture"
                onChange={handleFileUpload}
                error={errorFields.includes("profilePicture")}
              />
            </Box>
            <Box className="editFormSection">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                {formValues.userName}
              </Typography>
              <div></div>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {formValues.firstName} {formValues.lastName}
              </Typography>
              <Typography variant="body1">{formValues.department}</Typography>
              <Typography variant="body1">{formValues.email}</Typography>
            </Box>
          </Box>
          <Box className="editFormColumn2">
            <Box className="editFormSection">
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Προσωπικά στοιχεία
              </Typography>
              <Box className="editFormSectionTwoColumns">
                <Box className="editFormSectionColumn">
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
                  <BasicInput
                    id="placeOfBirth"
                    placeholder="Τόπος γέννησης"
                    onChange={handleChange}
                    error={errorFields.includes("placeOfBirth")}
                    errorText="Ο τόπος γέννησης είναι υποχρεωτικός"
                    required
                  />
                </Box>
                <Box className="editFormSectionColumn">
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
                  <BasicInput
                    id="phoneNumber"
                    placeholder="Κινητό τηλέφωνο"
                    onChange={handleChange}
                    error={errorFields.includes("phoneNumber")}
                    errorText="Το κινητό τηλέφωνο είναι υποχρεωτικό"
                    required
                  />
                </Box>
              </Box>
            </Box>
            <Box className="editFormSection">
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Στοιχεία επικοινωνίας
              </Typography>
              <Box className="editFormSectionTwoColumns">
                <Box className="editFormSectionColumn">
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
                <Box className="editFormSectionColumn">
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
            {userType === "professor" ? (
              <Box className="editFormSection">
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
        </Box>
        <Button
          variant="contained"
          className="editButton"
          onClick={handleSubmit}
          sx={{ fontWeight: "bold" }}
        >
          αποθηκευση
        </Button>
      </Box>
    </div>
  );
};

export default EditProfile;
