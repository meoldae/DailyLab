import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { refreshToken } from "./User";
import { SetAccessToken } from "@/atom/UserAtom";
import { HttpJson } from "./Http";

/* 
  http가 request를 보내기 전에 호출되는 함수이다.
  localStorage에 저장된 access_token을 인증 헤더에 삽입하여 요청마다 보내준다.
*/
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem('userAtom') != null ? `Bearer ` + JSON.parse(localStorage.getItem('userAtom')!).userAtom.accessToken : "";
    /* 토큰이 있을 경우 헤더에 삽입한다. 없을 경우 빈 문자열을 넣는다(null은 안됨) */

    config.headers.Authorization = accessToken;
    return config;
  };
  const onErrorRequest = (err: AxiosError | Error): Promise<AxiosError> => {

    return Promise.reject(err);
  };

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
}

/* http response가 catch로 넘어가기 전에 호출되는 함수이다.*/
const onErrorResponse = async (err: AxiosError | Error): Promise<AxiosError> => {
  const _err = err as unknown as AxiosError; // err 객체의 타입은 unknown이므로 타입 단언을 해주어야 한다
  const { response } = _err; // err 객체에서 response 를 구조 분해 할당
  const originalConfig = _err.config as InternalAxiosRequestConfig; // 기존의 요청 정보를 저장한다.

  if (response && response.status === 401) {
    await refreshToken(({data}) => {
      originalConfig.headers.Authorization = data.data as string;
      localStorage.setItem("useAtom", `"userAtom" : {"accessToken" : "${data.data as string}"}`);
      SetAccessToken(data.data as string);
      
      return HttpJson.request(originalConfig);
    }, (error) => console.log(error));
  }

  return Promise.reject(err);
};

export {onRequest, onErrorRequest, onResponse, onErrorResponse};