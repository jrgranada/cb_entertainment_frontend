import { FC } from 'react';
import { Card } from "antd";
import './AlbumCard.scss';

const { Meta } = Card;

const AlbumCard: FC<Album> = (props) => {

    const {
        images = [{ url: "https://images.unsplash.com/photo-1534854638093-bada1813ca19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60" }],
        name = "",
        releaseDate = "",
        totalTracks = 0
    } = props;

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img src={images[0]?.url} alt="Image" />}
        >
            <Meta title={name} description={releaseDate} />
        </Card>
    )
}

export default AlbumCard;