import React from 'react';
import { IonItem, IonLabel, IonImg  } from '@ionic/react';
import { ProductProps } from './ProductProps';

interface ProductPropsExt extends ProductProps {
    onEdit: (_id?: string) => void;
}

const Product: React.FC<ProductPropsExt> = ({ _id, description, price, size, availability, date, photo, onEdit }) => {
    return (
        <IonItem onClick={() => onEdit(_id)}>
            <IonLabel>{description} {price} {size} {availability} {date}</IonLabel>
            <IonImg class='imgs' src={photo}/>
        </IonItem>
    );
};

export default Product;
