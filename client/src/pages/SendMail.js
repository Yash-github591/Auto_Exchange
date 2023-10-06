import { Box, Button, Grid, TextField, Typography, Paper } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function SendMail() {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [messageBody, setMessageBody] = useState(
    'I am interested in your vehicle. Please contact me.'
  )
  const { id } = useParams()
  const BASE_URL = process.env.REACT_APP_BASE_URL

  async function handleSubmit(event) {
    event.preventDefault()
    const Owner = await axios.get(`${BASE_URL}/profile/${id}`)

    try {
      const response = await axios.post(
        `${BASE_URL}/sendMail`,
        {
          customerName,
          customerEmail,
          messageBody,
          ownerEmail: Owner.data.email,
          ownerName: Owner.data.username,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      console.log('response: ', response)

      if (response.status === 200) {
        alert('Email sent successfully')
      } else {
        alert('Email sending failed')
      }
    } catch (error) {
      alert('An error occurred: ' + error.message)
    }
  }

  return (
    <Box width={'90%'} mx={'auto'} maxWidth={'400px'} mt={6}>
      <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '12px' }}>
        <Typography variant="h4" textAlign="center" mb={4} color="#2196F3">
          Send Mail to the Owner
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className="login">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={customerName}
                  required={true}
                  onChange={(ev) => setCustomerName(ev.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={customerEmail}
                  required={true}
                  onChange={(ev) => setCustomerEmail(ev.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-textarea"
                  label="Email Body"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={messageBody}
                  required={true}
                  onChange={(ev) => setMessageBody(ev.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                  sx={{ backgroundColor: '#2196F3' }}
                >
                  Send Mail
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default SendMail
