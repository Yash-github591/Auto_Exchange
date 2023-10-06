import { TextField, Button, Box, Typography, Paper } from '@mui/material'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(UserContext)
  const navigate = useNavigate()
  const BASE_URL = process.env.REACT_APP_BASE_URL

  async function register(event) {
    event.preventDefault()

    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        { username, email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        setUserInfo(response.data)
        setRedirect(true)
        alert('User created successfully')
      } else {
        alert('User creation failed')
      }
    } catch (error) {
      alert('An error occurred: ' + error.message)
    }
  }

  if (redirect) {
    navigate('/')
  }

  return (
    <Box width={'90%'} mx={'auto'} maxWidth={'400px'} mt={6}>
      <Paper elevation={3} sx={{ p: 3, mt: '5%', textAlign: 'center' }}>
        <Typography variant="h4" mb={3} color="primary">
          Register
        </Typography>
        <form className="login" onSubmit={register}>
          <TextField
            fullWidth
            margin={'normal'}
            label="Username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            autoFocus
          />
          <TextField
            fullWidth
            margin={'normal'}
            label="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <TextField
            fullWidth
            margin={'normal'}
            label="Password"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            sx={{ mt: 3, background: '#1976D2' }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default RegisterPage
