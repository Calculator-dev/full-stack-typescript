import React from 'react'

export interface IErrorTextProps {
    error: string
}

const ErrorText: React.FC<IErrorTextProps> = ({error}) => {

    if(error === "") return null;

  return (
    <div color="red">
        {error}
    </div>
  )
}

export default ErrorText