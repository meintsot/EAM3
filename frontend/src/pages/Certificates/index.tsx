import {useEffect, useState} from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchTable from "../../components/Table/SearchTable";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

import {Column, Filters} from "../../model";
import { useAuth } from "../../providers/AuthProvider";
import {RetrieveCertificatesRequest, RetrieveCertificatesResponse} from "../../../../backend/models/types/certificate";
import API from "../../api";

const titles: Array<Column> = [
  {
    key: "type",
    label: "Τύπος πιστοποιητικού",
    searchInputType: "dropdown",
    options: [],
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
    options: ["Υποχρεωτικό", "Βασικό"],
  },
  {
    key: "dateRegistered",
    label: "Ημερομηνία Έγκρισης",
    searchInputType: "text",
    options: ["Ιανουάριος 23-24", "Ιούνιος 22-23", "Σεπτεμβριος 23-24"],
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
  const [certificateResults, setCertificateResults] = useState<RetrieveCertificatesResponse>({ certificates: [], total: 0 });

  useEffect(() => {
    API.retrieveCertificates({ page: 1, pageSize: 10 }).then(res => setCertificateResults(res));
  }, [userData.authToken]);

  const handleFilterChange = (filters: Filters) => {
    const request = filters as RetrieveCertificatesRequest;
    API.retrieveCertificates(request).then(res => setCertificateResults(res));
  }

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
          onClick={() => {}}
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
        actions={["view", "checkbox"]}
      />
    </Box>
  );
};

export default Certificates;
