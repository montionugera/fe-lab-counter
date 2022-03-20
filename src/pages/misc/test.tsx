import React from 'react'
import SimpleLayout from '../../layouts/simple-layout'
import { Content } from 'antd/lib/layout/layout'
import { ImageUpload } from '../../components/Forms/imageUpload'
import Editor from 'rich-markdown-editor'
import { uploadFile } from '../../data/svc/file'

const exampleText = `
# Hello Advocate Pod

## H2

### H3

#### H4

This is a markdown paragraph.

- unordered lists
- lists
[this is a link](google.com)
1. numbered
2. lists

\`\`\`javascript
const foo = 'foo'; // code
\`\`\`

---

`
const TestPage = () => {
    return (
        <SimpleLayout title="Home">
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                <div>
                    <div> Upload Pic</div>
                    <ImageUpload></ImageUpload>
                    <div>
                        editor
                        <Editor
                            defaultValue={exampleText}
                            readOnly={false}
                            onClickLink={() => {
                                console.log('click')
                            }}
                            uploadImage={uploadFile}
                            onChange={(getValFn) => {
                                console.log(getValFn())
                            }}
                        />
                        ===
                    </div>
                </div>
            </Content>
        </SimpleLayout>
    )
}

export default TestPage
