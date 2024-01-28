import axios from "axios";
import {
    LoginUserRequestDTO,
    LoginUserResponseDTO,
    RegisterUserDTO,
    UpdateUserProfileResponse
} from "../../../backend/models/types/user";
import {RetrieveUserHistoryResponse} from "../../../backend/models/types/userHistory";
import {CoursesResults, UserData} from "../model";
import {
    CourseDetailsDTO,
    CourseDTO, MyCoursesRequest, MyCoursesResponse,
    RetrieveCoursesRequest,
    RetrieveCoursesResponse
} from "../../../backend/models/types/course";
import {buildCoursesResults, buildMyCoursesResults} from "../mappers";
import {
    type DeclarationDetailsDTO,
    type RetrieveDeclarationsRequest, RetrieveDeclarationsResponse,
    SubmitDeclarationRequest
} from "../../../backend/models/types/declaration";
import type {
    GradingSystemDetailsDTO,
    RetrieveGradingSystemRequest,
    RetrieveGradingSystemResponse, SubmitGradingSystemRequest
} from "../../../backend/models/types/gradingSystem";
import type {RetrieveStudentGrades, RetrieveStudentGradesRequest} from "../../../backend/models/types/studentGrade";
import {
    CertificateDetailsDTO,
    RetrieveCertificatesRequest,
    RetrieveCertificatesResponse, SubmitCertificateRequest
} from "../../../backend/models/types/certificate";
import {UpdateUserProfileRequest} from "../../../backend/models/types/userProfile";

const api = axios.create({
    baseURL: 'http://localhost:8888/api',
    headers: {
        'Content-Type': 'application/json'
    }
});


const register = async (payload: RegisterUserDTO): Promise<UserData> => {
  const res = await api.post<RegisterUserDTO>("/auth/register", payload)
    const data = res.data
    return {
        userName: data.userName,
        userType: data.userType,
        userProfile: data.userProfile,
        myCourses: data.myCourses,
        authToken: data.authToken
    } as UserData
};

const login = async (payload: LoginUserRequestDTO): Promise<UserData> => {
  const res = await api.post<LoginUserResponseDTO>("/auth/login", payload);
  const data = res.data
    return {
        userName: data.userName,
        userType: data.userType,
        userProfile: data.userProfile,
        myCourses: data.myCourses,
        authToken: data.authToken
    } as UserData
};

const autoLogin = async (authToken: string): Promise<UserData> => {
    const res = await api.post<LoginUserResponseDTO>("/auth/login", {}, { headers: { Authorization: `Bearer ${authToken}` }})
    const data = res.data
    return {
        userName: data.userName,
        userType: data.userType,
        userProfile: data.userProfile,
        myCourses: data.myCourses,
        authToken: data.authToken
    } as UserData
}

const updateUserProfile = async (payload: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> => {
    const res = await api.put<UpdateUserProfileResponse>('/user/profile', payload, { headers: { Authorization: getJWTHeader() } })
    return res.data
}

const getJWTHeader = () => {
    return `Bearer ${localStorage.getItem("JWT")}`
}

const retrieveUserHistory = async (payload: PaginationRequest): Promise<RetrieveUserHistoryResponse> => {
  const res = await api.get<RetrieveUserHistoryResponse>("/user/history",
      { params: payload, headers: { Authorization: getJWTHeader() }})
  return res.data
};

const getAvailableCourses = async (): Promise<CourseDTO[]> => {
  const res = await api.get<CourseDTO[]>("/availableCourses");
  return res.data;
};

const uploadProfileImage = async (formData: FormData): Promise<string> => {
    const res = await api.post<{ fileURL: string }>('/profile-image', formData, {
        headers: {
            'Content-Type': undefined, // Let the browser set the content type
        },
    });
    return res.data.fileURL;
};

const retrieveStudentCourses = async (payload: RetrieveCoursesRequest): Promise<CoursesResults> => {
    const res = await api.get<RetrieveCoursesResponse>("/courses", {params: payload});
    return buildCoursesResults(res.data);
}

const retrieveCourse = async (courseId: string): Promise<CourseDetailsDTO> => {
    const res = await api.get<CourseDetailsDTO>(`/courses/${courseId}`)
    return res.data
}

const myCourses = async (payload: MyCoursesRequest): Promise<CoursesResults> => {
    const res = await api.get<MyCoursesResponse>("/myCourses", {headers: { Authorization: getJWTHeader() }, params: payload });
    return buildMyCoursesResults(res.data)
}

const submitDeclaration = async (payload: SubmitDeclarationRequest): Promise<DeclarationDetailsDTO> => {
    const res = await api.post<DeclarationDetailsDTO>('/declarations', payload, {headers: {Authorization: getJWTHeader()}});
    return res.data;
}

const retrieveDeclaration = async (declarationId: string): Promise<DeclarationDetailsDTO> => {
    const res = await api.get<DeclarationDetailsDTO>(`/declarations/${declarationId}`, { headers: { Authorization: getJWTHeader() } })
    return res.data
}

const retrieveDeclarations = async (payload: RetrieveDeclarationsRequest): Promise<RetrieveDeclarationsResponse> => {
    const res = await api.get<RetrieveDeclarationsResponse>('/declarations', { headers: { Authorization: getJWTHeader() }, params: payload })
    return res.data
}

const confirmDeclaration = async (declarationId: string, declaration: DeclarationDetailsDTO): Promise<void> => {
    await api.put(`/declarations/${declarationId}/confirm`, declaration, { headers: { Authorization: getJWTHeader() } })
}

const retrieveGradingSystems = async (payload: RetrieveGradingSystemRequest): Promise<RetrieveGradingSystemResponse> => {
    const res = await api.get<RetrieveGradingSystemResponse>('/gradingSystems', { headers: { Authorization: getJWTHeader() }, params: payload })
    return res.data
}

const retrieveGradingSystem = async (gradingSystemId: string): Promise<GradingSystemDetailsDTO> => {
    const res = await api.get<GradingSystemDetailsDTO>(`/gradingSystems/${gradingSystemId}`, { headers: { Authorization: getJWTHeader() } })
    return res.data
}

const submitGradingSystem = async (payload: SubmitGradingSystemRequest): Promise<GradingSystemDetailsDTO> => {
    const res = await api.post<GradingSystemDetailsDTO>('/gradingSystems', payload, { headers: { Authorization: getJWTHeader() } })
    return res.data
}

const confirmGradingSystem = async (gradingSystemId: string, gradingSystem: SubmitGradingSystemRequest): Promise<void> => {
    await api.post(`/gradingSystems/${gradingSystemId}/confirm`, gradingSystem, { headers: { Authorization: getJWTHeader() } })
}

const retrieveStudentGrades = async (payload: RetrieveStudentGradesRequest): Promise<RetrieveStudentGrades> => {
    const res = await api.get<RetrieveStudentGrades>('/studentGrades', { headers: { Authorization: getJWTHeader() }, params: payload })
    return res.data
}

const retrieveCertificates = async (payload: RetrieveCertificatesRequest): Promise<RetrieveCertificatesResponse> => {
    const res = await api.get<RetrieveCertificatesResponse>('/certificates', { headers: { Authorization: getJWTHeader() }, params: payload })
    return res.data
}

const retrieveCertificate = async (certificateId: string): Promise<CertificateDetailsDTO> => {
    const res = await api.get<CertificateDetailsDTO>(`certificates/${certificateId}`, { headers: { Authorization: getJWTHeader() } })
    return res.data
}

const submitCertificate = async (payload: SubmitCertificateRequest): Promise<void> => {
    await api.post('/certificates', payload, { headers: { Authorization: getJWTHeader() } })
}

const API = {
    register,
    login,
    autoLogin,
    updateUserProfile,
    uploadProfileImage,
    getAvailableCourses,
    retrieveUserHistory,
    retrieveStudentCourses,
    myCourses,
    submitDeclaration,
    retrieveCourse,
    retrieveDeclaration,
    retrieveDeclarations,
    confirmDeclaration,
    retrieveGradingSystems,
    retrieveGradingSystem,
    submitGradingSystem,
    confirmGradingSystem,
    retrieveStudentGrades,
    retrieveCertificates,
    retrieveCertificate,
    submitCertificate
}

export default API
