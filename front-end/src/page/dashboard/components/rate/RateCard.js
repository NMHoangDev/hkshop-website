import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Rating } from "@mui/material";
import { margin, style } from "@mui/system";
import styles from "./RateCard.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

export default function RateCard({
  name,
  imageUrlList,
  comment,
  dateRate,
  avatar,
  star,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={cx("wrapper")}>
      <Card sx={{ maxWidth: "100%", width: "100%" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={avatar}
              srcSet={avatar}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
          subheader={dateRate}
        />
        <div>
          <Rating
            name="half-rating-read"
            defaultValue={star}
            precision={0.5}
            readOnly
            sx={{ margin: "4px 0px 4px 10px" }}
          />
        </div>
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {comment}
          </Typography>
        </CardContent>
        {imageUrlList.map((imageUrl) => {
          return (
            <img
              src={imageUrl}
              alt={"hinh anh"}
              loading="lazy"
              style={{ width: "100px", height: "100px" }}
            />
          );
        })}
      </Card>
    </div>
  );
}
