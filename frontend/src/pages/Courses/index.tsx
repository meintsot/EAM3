import { useState } from "react";

import SearchTable from "../../components/Table/SearchTable";
import ActionButton from "../../components/ActionButton";
import CheckBox from "../../components/CheckBox";

import { CoursesRowStudent, CoursesRowProfessor, Column } from "../../model";
import { useAuth } from "../../providers/AuthProvider";

const defaultData: Array<CoursesRowStudent | CoursesRowProfessor> = [
  {
    courseId: "15100122",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    category: "Προαιρετικό",
    professor: "Γρηγοριάδου",
    ects: 6,
    actions: [
      {
        component: ActionButton,
        props: {
          type: "view",
          onClick: () => {},
          tooltip: "Λεπτομέρειες μαθήματος",
        },
      },
      {
        component: CheckBox,
        props: { tooltip: "Δήλωση μαθήματος" },
      },
    ],
  },
  {
    courseId: "15100123",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    category: "Προαιρετικό",
    professor: "Γρηγοριάδου",
    ects: 6,
    actions: [
      {
        component: ActionButton,
        props: {
          type: "view",
          onClick: () => {},
          tooltip: "Λεπτομέρειες μαθήματος",
        },
      },
      {
        component: CheckBox,
        props: { tooltip: "Δήλωση μαθήματος" },
      },
    ],
  },
  {
    courseId: "15100124",
    courseName:
      "ΤΕΧΝΟΛΟΓΙΕΣ ΤΗΣ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ ΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ (ΤΠΕ) ΣΤΗ ΜΑΘΗΣΗ",
    semester: 5,
    category: "Προαιρετικό",
    professor: "Γρηγοριάδου",
    ects: 6,
    actions: [
      {
        component: ActionButton,
        props: {
          type: "view",
          onClick: () => {},
          tooltip: "Λεπτομέρειες μαθήματος",
        },
      },
      {
        component: CheckBox,
        props: { tooltip: "Δήλωση μαθήματος" },
      },
    ],
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
    key: "category",
    label: "Τύπος",
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

const Courses = () => {
  const { userType } = useAuth();
  const [courses, setCourses] =
    useState<Array<CoursesRowStudent | CoursesRowProfessor>>(defaultData);
  console.log(courses);

  const transFormCourses = () => {
    courses.forEach(
      (course) =>
        (course = {
          ...course,
          actions: [
            {
              component: ActionButton,
              props: {
                type: "view",
                onClick: () => {},
                tooltip: "Λεπτομέρειες μαθήματος",
              },
            },
            {
              component: CheckBox,
              props: { tooltip: "Δήλωση μαθήματος" },
            },
          ],
        })
    );
  };
  transFormCourses();

  return <SearchTable columns={titles} rows={courses} setRows={setCourses} />;
};

export default Courses;
