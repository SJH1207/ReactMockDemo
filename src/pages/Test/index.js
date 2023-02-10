import React from 'react'
import { Picker, List } from 'antd-mobile';

import { district } from 'antd-mobile-demo-data';

const Test = () => {
    console.log(district);
    return (
        <div>
            <Picker extra="请选择(可选)"
                data={district}
                title="Areas"
                onOk={e => console.log('ok', e)}
                onDismiss={e => console.log('dismiss', e)}
            >
                <List.Item arrow="horizontal">Multiple & cascader</List.Item>
            </Picker>
        </div>
    )
}

export default Test
