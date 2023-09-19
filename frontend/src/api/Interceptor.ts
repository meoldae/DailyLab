import { AxiosError, InternalAxiosRequestConfig } from "axios";

/* 
  http가 request를 보내기 전에 호출되는 함수이다.
  cookie에 저장된 access_token을 인증 헤더에 삽입하여 요청마다 보내준다.
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

  export {onRequest, onErrorRequest};