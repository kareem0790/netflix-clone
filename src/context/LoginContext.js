import React from 'react'

const LoginContext = React.createContext({
  username: '',
  password: '',
  showError: false,
  errorMsg: '',
  onChangeUsername: () => {},
  onChangePassword: () => {},
  onChangeShowError: () => {},
})

export default LoginContext
