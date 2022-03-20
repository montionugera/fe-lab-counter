import axios from 'axios'
import { RcFile } from 'antd/lib/upload'
export interface SignedURLResponse {
    signed_url: string
}
const fileServiceURL = 'http://localhost:3006'
export const getSignedURL: (
    file: RcFile | File,
) => Promise<SignedURLResponse> = async (file: RcFile | File) => {
    const resp = await axios.post(`${fileServiceURL}/file/gen-presigned-url`, {
        contentType: file.type,
    })
    return resp.data
}

export const uploadFile = async (file: RcFile | File) => {
    const signedUrlResp = await getSignedURL(file)
    await axios.put(signedUrlResp.signed_url, file, {
        headers: {
            'x-amz-acl': 'public-read',
            'Content-Type': file.type,
        },
    })
    const uploadedUrl = signedUrlResp.signed_url.split('?')[0]
    return uploadedUrl
}
