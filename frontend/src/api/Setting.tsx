import { SetAccessToken } from "@/atom/UserAtom";

const setAccessToken = (data: string) => {
  SetAccessToken(data as string);
}

export default setAccessToken;

