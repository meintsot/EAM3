import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

import { Column, Filters } from "../../model";
import { useAuth } from "../../providers/AuthProvider";
import {
  RetrieveCertificatesRequest,
  RetrieveCertificatesResponse,
} from "../../../../backend/models/types/certificate";
import API from "../../api";
import { useNavigate } from "react-router";

const titles: Array<Column> = [
  {
    key: "type",
    label: "Τύπος πιστοποιητικού",
    searchInputType: "dropdown",
    options: [
      "Φοιτητικής Ιδιότητας",
      "Φορολογικής Χρήσης",
      "Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς",
      "Στρατολογική Χρήση (Συνοπτικό)",
      "Στρατολογική Χρήση (Aναλυτικό)",
    ],
  },
  {
    key: "dateRequested",
    label: "Ημερομηνία Αίτησης",
    searchInputType: "text",
    options: [],
  },
  {
    key: "state",
    label: "Κατάσταση",
    searchInputType: "dropdown",
    options: ["Εκκρεμής", "Ολοκληρωμένη"],
  },
  {
    key: "dateRegistered",
    label: "Ημερομηνία Έγκρισης",
    searchInputType: "text",
    options: [],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const Certificates = () => {
  const { userData } = useAuth();
  const [certificateResults, setCertificateResults] =
    useState<RetrieveCertificatesResponse>({ certificates: [], total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    API.retrieveCertificates({ page: 1, pageSize: 10 }).then((res) =>
      setCertificateResults(res)
    );
  }, [userData.authToken]);

  const handleFilterChange = (filters: Filters) => {
    const request = filters as RetrieveCertificatesRequest;
    API.retrieveCertificates(request).then((res) => setCertificateResults(res));
  };

  return (
    <Box className="wrapper">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Πιστοποιητικά
      </Typography>
      <Box className="header">
        <Typography variant="body1">
          Πατήστε το κουμπί “Αίτηση” για να αιτηθείτε ένα νέο πιστοποιητικό.
        </Typography>
        <Button
          variant="contained"
          className="main-action-button"
          onClick={() => {
            navigate("/certificate-request");
          }}
          sx={{ fontWeight: "bold" }}
        >
          αιτηση <NoteAddOutlinedIcon fontSize="small" />
        </Button>
      </Box>
      <SearchTable
        columns={titles}
        rows={certificateResults.certificates ?? []}
        totalResults={certificateResults.total ?? 0}
        onFilterChange={handleFilterChange}
        actions={[]}
      />
    </Box>
  );
};

export default Certificates;
