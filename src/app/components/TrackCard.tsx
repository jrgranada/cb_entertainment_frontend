import { FC } from 'react';
import { Card } from "antd";

const { Meta } = Card;

const TrackCard: FC<Track> = (props) => {

    const {
        image = [{ url: "https://images.unsplash.com/photo-1534854638093-bada1813ca19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60" }],
        name = "",
        artistName = "",
    } = props;

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img src={props.album.images[0]?.url} alt="Image" />}
        >
            <Meta title={props.name} description={props.artists[0].name} />
        </Card>
    )
}

export default TrackCard;