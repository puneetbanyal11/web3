import React from 'react'
import {Alert, Space} from 'antd'
import {DuplicateCTA} from './duplicateCTA'

export const ErrorMessage = (props) => {
  const {errors, onKeepFirst, onCombine, isDuplicate} = props
  return (
    <Space direction="vertical" size="small" style={{display: 'flex'}}>
      {isDuplicate ? (
        <DuplicateCTA onKeepFirst={onKeepFirst} onCombine={onCombine} />
      ) : null}
      <Alert
        description={
          <>
            <>
              {errors.map((err, index) => {
                return <div key={err}>{err}</div>
              })}
            </>
          </>
        }
        type="error"
      />
    </Space>
  )
}
