import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import BasicInput from "../../components/Input/BasicInput";
import DropdownInput from "../../components/Input/DropdownInput";
import MultipleAutocompleteInput from "../../components/Input/MultipleAutocompleteInput";
import ImageUploader from "../../components/Input/ImageUploader";
import { useAuth } from "../../providers/AuthProvider";

import "./EditProfile.css";
import API from "../../api";
import { CourseDTO } from "../../../../backend/models/types/course";
import AlertBox from "../../components/AlertBox";
import { UpdateUserProfileRequest } from "../../../../backend/models/types/userProfile";
import { useNavigate } from "react-router";

const EditProfile: React.FC = () => {
  const { userData } = useAuth();
  const { userType, userProfile } = userData;
  const [formValues, setFormValues] = useState<UpdateUserProfileRequest>({
    ...userProfile,
    phoneNumber: userProfile.generalInformation.phoneNumber,
    profilePicture: userProfile.generalInformation.profilePicture,
  });
  console.log(formValues);
  const [file, setFile] = useState<File | null>(null);
  const [errorFields, setErrorFields] = useState<Array<string>>([]);
  const maritalStatuses = ["Παντρεμένος/η", "Άγαμος/η"];
  const [availableCourses, setAvailableCourses] = useState([] as CourseDTO[]);
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    setErrorFields(
      Object.keys(formValues).filter(
        (key: string) => formValues[key as keyof typeof formValues] === ""
      )
    );
    if (file !== null) {
      // Upload the file
      const formData = new FormData();
      formData.append("image", file, file.name);
      API.uploadProfileImage(formData).then((fileURL: string) => {
        formValues.profilePicture = fileURL;
        API.updateUserProfile(formValues);
      });
    } else {
      API.updateUserProfile(formValues);
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
                {userData.userName}
              </Typography>
              <div></div>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {userProfile.generalInformation.firstName}{" "}
                {userProfile.generalInformation.lastName}
              </Typography>
              <Typography variant="body1">
                {userProfile.generalInformation.department}
              </Typography>
              <Typography variant="body1">
                {userData.userName + "@di.uoa.gr"}
              </Typography>
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
                    id="personalInformation.fathersName"
                    placeholder="Όνομα πατέρα"
                    onChange={handleChange}
                    error={errorFields.includes("fathersName")}
                    errorText="Το όνομα πατέρα είναι υποχρεωτικό"
                    required
                    defaultValue={formValues.personalInformation.fathersName}
                  />
                  <BasicInput
                    id="personalInformation.mothersName"
                    placeholder="Όνομα μητέρας"
                    onChange={handleChange}
                    error={errorFields.includes("mothersName")}
                    errorText="Το όνομα μητέρας είναι υποχρεωτικό"
                    required
                    defaultValue={formValues.personalInformation.mothersName}
                  />
                  <BasicInput
                    id="personalInformation.dateOfBirth"
                    placeholder="Ημερομηνία γέννησης"
                    onChange={handleChange}
                    error={errorFields.includes("dateOfBirth")}
                    errorText="Η ημερομηνία γέννησης είναι υποχρεωτική"
                    required
                    defaultValue={formValues.personalInformation.dateOfBirth}
                  />
                  <DropdownInput
                    id="personalInformation.maritalStatus"
                    items={maritalStatuses}
                    placeholder="Οικογενειακή κατάσταση"
                    onChange={handleChange}
                    defaultValue={formValues.personalInformation.maritalStatus}
                  />
                  <BasicInput
                    id="personalInformation.placeOfBirth"
                    placeholder="Τόπος γέννησης"
                    onChange={handleChange}
                    error={errorFields.includes("placeOfBirth")}
                    errorText="Ο τόπος γέννησης είναι υποχρεωτικός"
                    required
                    defaultValue={formValues.personalInformation.placeOfBirth}
                  />
                </Box>
                <Box className="editFormSectionColumn">
                  <BasicInput
                    id="personalInformation.idNumber"
                    placeholder="ΑΔΤ"
                    onChange={handleChange}
                    error={errorFields.includes("idNumber")}
                    errorText="Ο αριθμός δελτίου ταυτότητας είναι υποχρεωτικός"
                    required
                    defaultValue={formValues.personalInformation.idNumber}
                  />
                  <BasicInput
                    id="personalInformation.issuingAuthority"
                    placeholder="Εκδούσα αρχή"
                    onChange={handleChange}
                    defaultValue={
                      formValues.personalInformation.issuingAuthority
                    }
                  />
                  <BasicInput
                    id="personalInformation.dateOfPublish"
                    placeholder="Ημερομηνία έκδοσης"
                    onChange={handleChange}
                    error={errorFields.includes("dateOfPublish")}
                    errorText="Η ημερομηνία έκδοσης είναι υποχρεωτική"
                    required
                    defaultValue={formValues.personalInformation.dateOfPublish}
                  />
                  <BasicInput
                    id="personalInformation.socialSecurityNumber"
                    placeholder="ΑΜΚΑ"
                    onChange={handleChange}
                    error={errorFields.includes("socialSecurityNumber")}
                    errorText="Ο ΑΜΚΑ είναι υποχρεωτικός"
                    required
                    defaultValue={
                      formValues.personalInformation.socialSecurityNumber
                    }
                  />
                  <BasicInput
                    id="personalInformation.phoneNumber"
                    placeholder="Κινητό τηλέφωνο"
                    onChange={handleChange}
                    error={errorFields.includes("phoneNumber")}
                    errorText="Το κινητό τηλέφωνο είναι υποχρεωτικό"
                    required
                    defaultValue={formValues.phoneNumber}
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
                    id="communicationDetails.address"
                    placeholder="Μόνιμη διεύθυνση κατοικίας"
                    onChange={handleChange}
                    error={errorFields.includes("address")}
                    errorText="Η μόνιμη διεύθυνση κατοικίας είναι υποχρεωτική"
                    required
                    defaultValue={formValues.communicationDetails.address}
                  />
                  <BasicInput
                    id="communicationDetails.city"
                    placeholder="Μόνιμη πόλη κατοικίας"
                    onChange={handleChange}
                    error={errorFields.includes("city")}
                    errorText="Η μόνιμη πόλη κατοικίας είναι υποχρεωτική"
                    required
                    defaultValue={formValues.communicationDetails.city}
                  />
                  <BasicInput
                    id="communicationDetails.telephone"
                    placeholder="Τηλέφωνο μόνιμης κατοικίας"
                    onChange={handleChange}
                    defaultValue={formValues.communicationDetails.telephone}
                  />
                  <BasicInput
                    id="communicationDetails.postalCode"
                    placeholder="ΤΚ μόνιμης κατοικίας"
                    onChange={handleChange}
                    error={errorFields.includes("postalCode")}
                    errorText="Ο ταχυδρομικός κώδικας είναι ιυποχρεωτικός"
                    required
                    defaultValue={formValues.communicationDetails.postalCode}
                  />
                </Box>
                <Box className="editFormSectionColumn">
                  <BasicInput
                    id="communicationDetails.temporaryAddress"
                    placeholder="Προσωρινή διεύθυνση κατοικίας"
                    onChange={handleChange}
                    defaultValue={
                      formValues.communicationDetails.temporaryAddress
                    }
                  />
                  <BasicInput
                    id="communicationDetails.temporaryCity"
                    placeholder="Προσωρινή πόλη κατοικίας"
                    onChange={handleChange}
                    defaultValue={formValues.communicationDetails.temporaryCity}
                  />
                  <BasicInput
                    id="communicationDetails.temporaryTelephone"
                    placeholder="Τηλέφωνο προσωρινής κατοικίας"
                    onChange={handleChange}
                    defaultValue={
                      formValues.communicationDetails.temporaryTelephone
                    }
                  />
                  <BasicInput
                    id="communicationDetails.temporaryPostalCode"
                    placeholder="ΤΚ προσωρινής κατοικίας"
                    onChange={handleChange}
                    defaultValue={
                      formValues.communicationDetails.temporaryPostalCode
                    }
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
                  defaultValues={formValues.myCourses}
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
