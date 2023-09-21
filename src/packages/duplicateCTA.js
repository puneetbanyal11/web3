import React from 'react'
import {Button, Space, Typography} from 'antd'

export const DuplicateCTA = (props) => {
  const {onKeepFirst, onCombine} = props
  const {Text} = Typography
  return (
    <Space
      align="center"
      direction="horizontal"
      size="large"
      style={{display: 'flex', justifyContent: 'space-between'}}
    >
      <Text type="danger">Duplicated </Text>
      <Space direction="horizontal" size="small" style={{display: 'flex'}}>
        <Button type="text" danger onClick={() => onKeepFirst(true)}>
          Keep the first One
        </Button>
        <Button type="text" danger onClick={() => onCombine(false)}>
          Combine Balance
        </Button>
      </Space>
    </Space>
  )
}
