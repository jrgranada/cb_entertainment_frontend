import { FC } from 'react';
import { Card } from "antd";

const { Meta } = Card;

const ArtistCard: FC<Artist> = (props) => {

    const defaulImage = "https://images.unsplash.com/photo-1534854638093-bada1813ca19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60";
    const {
        images = [{ url: "https://images.unsplash.com/photo-1534854638093-bada1813ca19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60" }],
        name = "",
        popularity = 0,
    } = props;

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img src={images[0] ? images[0].url : defaulImage} alt="Image" />}
        >
            <Meta title={name} description={popularity} />
        </Card>
    )
}

export default ArtistCard;