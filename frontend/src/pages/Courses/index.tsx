import { useState } from "react";

import SearchTable from "../../components/Table/SearchTable";
import ActionButton from "../../components/ActionButton";
import CheckBox from "../../components/CheckBox";

import { CoursesRowStudent, CoursesRowProfessor, Column } from "../../model";
import { useAuth } from "../../providers/AuthProvider";

const defaultData: Array<CoursesRowStudent> = [
  {
    courseId: "15100122",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    category: "Προαιρετικό",
    professor: "Γρηγοριάδου",
    ects: 6,
  },
  {
    courseId: "15100123",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    category: "Προαιρετικό",
    professor: "Γρηγοριάδου",
    ects: 6,
  },
  {
    courseId: "15100124",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    category: "Προαιρετικό",
    professor: "Γρηγοριάδου",
    ects: 6,
  },
];

const titlesStudent: Array<Column> = [
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
    key: "category",
    label: "Κατηγορία",
    searchInputType: "dropdown",
    options: ["Υποχρεωτικό", "Βασικό"],
  },
  {
    key: "professor",
    label: "Διδάσκων",
    searchInputType: "text",
    options: [],
  },
  { key: "ects", label: "ECTS", searchInputType: "text", options: [] },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const titlesProfessor: Array<Column> = [
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
    key: "category",
    label: "Κατηγορία",
    searchInputType: "dropdown",
    options: ["Υποχρεωτικό", "Βασικό"],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const Courses = () => {
  const { userData } = useAuth();
  const { userType } = userData;
  const [courses, setCourses] =
    useState<Array<CoursesRowStudent | CoursesRowProfessor>>(defaultData);

  return userType === "student" ? (
    <SearchTable
      columns={titlesStudent}
      rows={courses}
      setRows={setCourses}
      actions={["view", "checkbox"]}
    />
  ) : (
    <SearchTable
      columns={titlesProfessor}
      rows={courses}
      setRows={setCourses}
      actions={["add"]}
    />
  );
};

export default Courses;
