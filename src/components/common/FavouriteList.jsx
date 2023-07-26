import { Box, ListItem, ListItemButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import boardApi from '../../api/boardApi'
import { setFavouriteList } from '../../redux/features/favouriteSlice'

const FavouriteList = () => {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.favourites.value)
  const [activeIndex, setActiveIndex] = useState(0)
  const { boardId } = useParams()

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getFavourites()
        dispatch(setFavouriteList(res))
      } catch (err) {
        alert(err)
      }
    }
    getBoards()
  }, [dispatch]);

  useEffect(() => {
    const index = list.findIndex(e => e.id === boardId)
    setActiveIndex(index)
  }, [list, boardId])

  return (
    <>
      <ListItem>
        <Box sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant='body2' fontWeight='700'>
            Favourites
          </Typography>
        </Box>
      </ListItem>

      {list.map((item, idx) => (
        <ListItem key={idx}>
          <ListItemButton
            selected={idx === activeIndex}
            component={Link}
            to={`/boards/${item.id}`}
            sx={{
              pl: '0px',
              cursor: 'pointer!important',
            }}
          >
            <Typography
              variant='body2'
              fontWeight='700'
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {item.icon} {item.title}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}

    </>
  )
}

export default FavouriteList