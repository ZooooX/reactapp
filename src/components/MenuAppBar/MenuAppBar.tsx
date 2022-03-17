import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Button
} from '@mui/material';

const pages = ['Promo'];

const MenuAppBar = () => {

  const sayHello = () => {
    console.log('hello');
  }
  return (
    <AppBar position="static" style={{minHeight:"5%", height:"5%", backgroundColor : 'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={sayHello}
          >
            WILDERS APP
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            WILDERS APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={sayHello}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuAppBar;
