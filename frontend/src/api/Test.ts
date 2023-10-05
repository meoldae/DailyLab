import { HttpJson } from "./Http";

interface props {
    data : string
}

const RequestTest =async (param: object, success: (data : {data : props}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`/diary`, JSON.stringify(param)).then(success).catch(fail);
}

export { RequestTest };