import React, {useState} from 'react'
import CodeMirror from '@uiw/react-codemirror'

function Editor(props) {
  const {data, setData} = props
  const onChange = React.useCallback((value, viewUpdate) => {
    setData(value, viewUpdate)
  }, [])

  return (
    <>
      <CodeMirror
        height="300px"
        width="100%"
        value={data}
        onChange={onChange}
      />
      <small>Separated by ',' or ' ' or '='</small>
    </>
  )
}
export default Editor
