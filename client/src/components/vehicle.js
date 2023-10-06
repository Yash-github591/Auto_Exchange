import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'

function Vehicle({
  createdAt,
  _id,
  model,
  price,
  location,
  coverImage,
  owner,
}) {
  const createdDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  })

  const BASE_URL = process.env.REACT_APP_BASE_URL

  return (
    <Link to={`/vehicles/${_id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          borderRadius: '10px',
          margin: 'auto',
          '&:hover': {
            boxShadow: '10px 10px 10px 0px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <CardMedia
          component="img"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
          }}
          image={`${BASE_URL}/` + coverImage}
          alt={'Image not found'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {model}
          </Typography>
          <Typography color={'red'} gutterBottom variant="h7" component="div">
            Added: {createdDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ₹{price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            owner: {owner.username}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default Vehicle
