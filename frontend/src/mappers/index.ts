import {RegisterUserDTO} from "../../../backend/models/types/user";
import {CoursesResults, CoursesRow, RegisterForm} from "../model";
import {CourseDTO, RetrieveCoursesResponse} from "../../../backend/models/types/course";


const toCoursesRow = (course: CourseDTO): CoursesRow => {
    return {
        courseId: course.courseId,
        courseName: course.courseName,
        semester: course.semester[0],
        category: course.category,
        professor: course.teacher,
        ects: course.ects
    } as CoursesRow
}

const toCoursesRows = (courses: CourseDTO[]): CoursesRow[] => {
    return courses.map(toCoursesRow)
}

export const buildRegisterPayload = (formValues: RegisterForm): RegisterUserDTO => {
    return {
        userName: formValues.userName,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
        userType: formValues.userType,
        userProfile: {
            generalInformation: {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                department: formValues.department,
                phoneNumber: formValues.phoneNumber,
                profilePicture: formValues.profilePicture
            },
            personalInformation: {
                fathersName: formValues.fathersName,
                mothersName: formValues.mothersName,
                dateOfBirth: formValues.dateOfBirth,
                maritalStatus: formValues.maritalStatus,
                placeOfBirth: formValues.placeOfBirth,
                idNumber: formValues.idNumber,
                issuingAuthority: formValues.issuingAuthority,
                dateOfPublish: formValues.dateOfBirth,
                socialSecurityNumber: formValues.socialSecurityNumber
            },
            communicationDetails: {
                address: formValues.address,
                city: formValues.city,
                telephone: formValues.telephone,
                postalCode: formValues.postalCode,
                temporaryAddress: formValues.temporaryAddress,
                temporaryCity: formValues.temporaryCity,
                temporaryTelephone: formValues.temporaryTelephone,
                temporaryPostalCode: formValues.temporaryPostalCode
            }
        },
        myCourses: formValues.myCourses as string[]
    } as RegisterUserDTO
}

export const buildCoursesResults = (res: RetrieveCoursesResponse): CoursesResults => {
    return {
        courses: toCoursesRows(res.courses),
        total: res.total
    } as CoursesResults
}
