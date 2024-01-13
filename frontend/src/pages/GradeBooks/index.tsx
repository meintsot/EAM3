import { useState } from "react";

import SearchTable from "../../components/SearchTable";

import { GradesRow, Column } from "../../model";
import { useAuth } from "../../providers/AuthProvider";

const defaultData: Array<GradesRow> = [
  {
    courseId: "15100122",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    professor: "Γρηγοριάδου",
    ects: 6,
    grade: 7,
  },
  {
    courseId: "15100123",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    professor: "Γρηγοριάδου",
    ects: 6,
    grade: 7,
  },
  {
    courseId: "15100124",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    professor: "Γρηγοριάδου",
    ects: 6,
    grade: 7,
  },
];

const titles: Array<Column> = [
  { key: "courseId", label: "Κωδικός", searchInputType: "text", options: [] },
  {
    key: "courseName",
    label: "Μάθημα",
    searchInputType: "text",
    options: [],
  },
  {
    key: "semester",
    label: "Εξάμηνο",
    searchInputType: "dropdown",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    key: "professor",
    label: "Διδάσκων",
    searchInputType: "text",
    options: [],
  },
  { key: "ects", label: "ECTS", searchInputType: "text", options: [] },
  {
    key: "grade",
    label: "Βαθμός",
    searchInputType: "text",
    options: [],
  },
];

const GradeBooks = () => {
  const { userType } = useAuth();
  const [grades, setGrades] = useState<Array<GradesRow>>(defaultData);

  return <SearchTable columns={titles} rows={grades} setRows={setGrades} />;
};

export default GradeBooks;
