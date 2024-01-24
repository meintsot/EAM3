import axios from "axios";
import {LoginUserRequestDTO, LoginUserResponseDTO, RegisterUserDTO} from "../../../backend/models/types/user";
import {RetrieveUserHistoryResponse, UserHistoryDTO} from "../../../backend/models/types/userHistory";
import {UserData} from "../model";
import {CourseDTO} from "../../../backend/models/types/course";

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

const retrieveUserHistory = async (payload: PaginationRequest): Promise<RetrieveUserHistoryResponse> => {
  const res = await api.get<RetrieveUserHistoryResponse>("/user/history",
      { params: payload, headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` }})
  return res.data
};

const getAvailableCourses = async (): Promise<CourseDTO[]> => {
  const res = await api.get<CourseDTO[]>("/availableCourses")
  return res.data
};

const uploadProfileImage = async (formData: FormData): Promise<string> => {
    const res = await api.post<{ fileURL: string }>('/profile-image', formData, {
        headers: {
            'Content-Type': undefined, // Let the browser set the content type
        },
    });
    return res.data.fileURL;
};

const API = {
    register,
    login,
    autoLogin,
    uploadProfileImage,
    getAvailableCourses,
    retrieveUserHistory
}

export default API
