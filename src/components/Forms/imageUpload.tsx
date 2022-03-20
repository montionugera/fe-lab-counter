import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { RcFile } from 'antd/lib/upload'
import { uploadFile } from '../../data/svc/file'

function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

export class ImageUpload extends React.Component {
    state = {
        loading: false,
        imageUrl: undefined,
    }
    private uploadInput: React.RefObject<typeof Upload>

    constructor(props) {
        super(props)
        this.uploadInput = React.createRef()
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true })
            return
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            )
        }
    }
    handleUpload = async (file: RcFile) => {
        const uploadedUrl = await uploadFile(file)
        this.setState({ ...this.state, imageUrl: uploadedUrl })
        return ''
    }

    render() {
        const beforeUpload = (file: RcFile) => {
            const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!')
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!')
            }
            const shouldUpload = isJpgOrPng && isLt2M
            return shouldUpload
        }
        const { loading, imageUrl } = this.state
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )
        return (
            <Upload
                ref={this.uploadInput}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={this.handleUpload}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        )
    }
}
