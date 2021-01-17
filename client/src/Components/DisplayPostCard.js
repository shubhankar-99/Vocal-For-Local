import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid} from "@material-ui/core";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RandomImage from '../Images/3.jpg';
import axios from 'axios'
import * as UploadLikeUrl from "../Constant";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 645,
    [theme.breakpoints.down("md")] : {
    width: 450
    },
    [theme.breakpoints.down("sm")] : {
      width: 350
      },
      [theme.breakpoints.down("xs")] : {
        width: 300 
        },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontSize: 24,
  }
}));

export default function DisplayPostCard({item}) {
  
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [liked ,setLiked] = React.useState(item.liked)
  const [color ,setColor] = React.useState( item.liked && '#FF5349')
  const [likesCount,setLikeCount] = React.useState(item.likesCount)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const postImage = (buffer) => {

    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
    const image =  "data:image/png;base64," + window.btoa( binary );
    return image
  }

  const postLiked = () => {
     
    if(!liked){
      setLiked(true)
      setColor('#FF5349')  
     } else{
      setLiked(false)
      setColor(null)
     }

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
      };

      const url = UploadLikeUrl.Link.baseUrl.UploadLikeUrl + item._id

      axios
        .post(url,null ,config)
        .then((res)=> setLikeCount(res.data.count))
        .catch((err)=> console.log(err))
  }

  return (
    <div style={{marginTop:'4%'}}>
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    
  >
   <Grid item >
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar  className={classes.avatar}>
             {item.ownerName.slice(0,1).toUpperCase()} 
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.title}
        subheader={item.updatedAt.slice(11,16)+ " , " + item.updatedAt.slice(0,10)} 
      />
      <CardMedia
        className={classes.media}
        image = {item.media && postImage(item.media.data)}
        title={item.name} 
      />
      <CardContent> 
        <Typography variant="body2" color="textSecondary" component="p">
          
          {item.ownerName && item.ownerName.toUpperCase()}  / {item.ownerCity} { item.ownerState} 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={postLiked}>
          <FavoriteIcon style={{fill:color}}  />
          {likesCount}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {item.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
    </Grid>
    </div>
  );
}
