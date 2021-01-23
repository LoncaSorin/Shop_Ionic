import React, { useContext, useEffect, useState } from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon,
    IonImg
} from '@ionic/react';
import { getLogger } from '../core';
import { ProductContext } from './ProductProvider';
import { RouteComponentProps } from 'react-router';
import { ProductProps } from './ProductProps';
import {usePhotoGallery} from "../core/UsePhotoGallery";
import {camera, sadOutline} from "ionicons/icons";
import {useNetwork} from "../core/UseNetState";
import {MyMap} from "../components/MyMap";
import {createAnimation} from '@ionic/react';

const log = getLogger('ProductEdit');

interface ProductEditProps extends RouteComponentProps<{
    id?: string;
}> {}

const ProductEdit: React.FC<ProductEditProps> = ({ history, match }) => {
    const { products, saving, savingError, saveProduct, connectedNetworkStatus } = useContext(ProductContext);
    const [description, setDescription]   = useState('');
    const [price, setPrice]               = useState('');
    const [size, setSize]                 = useState('');
    const [availability, setAvailability] = useState('');
    const [date, setDate]                 = useState('');
    const [version,setVersion]            = useState(0);
    const [hasConflicts,setConflicts]     = useState(false);
    const [lastModified,setLastModified]  = useState(new Date());
    const [longitudine, setLongitudine]   = useState(23.613781929016113);
    const [latitudine, setLatitudine]     = useState(46.77860956692572);
    const [product, setProduct]           = useState<ProductProps>();
    const [photo, setPhoto]               = useState('');
    const {photos, takePhoto}             = usePhotoGallery();
    const routeId = match.params.id || '';

    useEffect(groupAnimation, []);

    useEffect(() => {
        log('useEffect');
        const routeId = match.params.id || '';
        const product = products?.find(pr => pr._id === routeId);
        setProduct(product);
        if (product) {
            setDescription(product.description);
            setPrice(product.price);
            setSize(product.size);
            setAvailability(product.availability);
            setDate(product.date);
            setVersion(product.version + 1);
            setConflicts(false);
            setLastModified(product.lastModified);
            setLongitudine(product.longitudine);
            setLatitudine(product.latitudine);
            setPhoto(product.photo);
        }
    }, [match.params.id, products]);

    const handleSave = () => {
        const editedProduct = product ? {
            ...product,
            description,
            price,
            size,
            availability,
            date,
            version,
            hasConflicts,
            lastModified,
            longitudine,
            latitudine,
            photo
        } : {
            description,
            price,
            size,
            availability,
            date,
            version,
            hasConflicts,
            lastModified,
            longitudine,
            latitudine,
            photo
        };
        saveProduct && saveProduct(editedProduct).then(() => history.goBack());
    };

    const shake = [
        {offset: 0, transform: 'scale(0.8) rotate(0)'},
        {offset: 0.05, transform: 'scale(0.8) rotate(5deg)'},
        {offset: 0.10, transform: 'scale(0.8) rotate(10deg)'},
        {offset: 0.15, transform: 'scale(0.8) rotate(5deg)'},
        {offset: 0.20, transform: 'scale(0.8) rotate(0)'},
        {offset: 0.25, transform: 'scale(0.8) rotate(-5deg)'},
        {offset: 0.30, transform: 'scale(0.8) rotate(-10deg)'},
        {offset: 0.35, transform: 'scale(0.8) rotate(-15deg)'},
        {offset: 0.40, transform: 'scale(0.8) rotate(-10deg)'},
        {offset: 0.45, transform: 'scale(0.8) rotate(-5deg)'},

        {offset: 0.5, transform: 'scale(0.8) rotate(0deg)'},

        {offset: 0.55, transform: 'scale(0.8) rotate(5deg)'},
        {offset: 0.60, transform: 'scale(0.8) rotate(10deg)'},
        {offset: 0.65, transform: 'scale(0.8) rotate(15deg)'},
        {offset: 0.70, transform: 'scale(0.8) rotate(10deg)'},
        {offset: 0.75, transform: 'scale(0.8) rotate(5deg)'},
        {offset: 0.80, transform: 'scale(0.8) rotate(0)'},
        {offset: 0.85, transform: 'scale(0.8) rotate(-5deg)'},
        {offset: 0.90, transform: 'scale(0.8) rotate(-10deg)'},
        {offset: 0.95, transform: 'scale(0.8) rotate(-5deg)'},
        {offset: 1, transform: 'scale(0.8) rotate(0)'}
    ]

    function chainedAnimation() {
        const input1 = document.querySelector('.inputs-1');
        const input2 = document.querySelector('.inputs-2');
        const input3 = document.querySelector('.inputs-3');
        const input4 = document.querySelector('.inputs-4');
        const input5 = document.querySelector('.inputs-5');

        if (input1 && input2 && input3 && input4 && input5) {
            const animationInput1 = createAnimation()
                .addElement(input1)
                .duration(5000)
                .fromTo('transform', 'scale(1)', 'scale(0.8)');

            const animationInput2 = createAnimation()
                .addElement(input2)
                .duration(7000)
                .fromTo('transform', 'scale(1)', 'scale(0.8)');

            const animationInput3 = createAnimation()
                .addElement(input3)
                .duration(7000)
                .fromTo('transform', 'scale(1)', 'scale(0.8)');

            const animationInput4 = createAnimation()
                .addElement(input4)
                .duration(7000)
                .fromTo('transform', 'scale(1)', 'scale(0.8)');

            const animationInput5 = createAnimation()
                .addElement(input5)
                .duration(7000)
                .fromTo('transform', 'scale(1)', 'scale(0.8)');

            (async () => {
                await animationInput1.play();
                await animationInput2.play();
                await animationInput3.play();
                await animationInput4.play();
                await animationInput5.play();
            })();
        }
    }

    useEffect(chainedAnimation, []);

    function groupAnimation() {
        const label1 = document.querySelector('.labels-1');
        const label2 = document.querySelector('.labels-2');
        const label3 = document.querySelector('.labels-3');
        const label4 = document.querySelector('.labels-4');
        const label5 = document.querySelector('.labels-5');
        if (label1 && label2 && label3 && label4 && label5) {
            const animation1 = createAnimation()
                .addElement(label1)
                .keyframes(shake);
            const animation2 = createAnimation()
                .addElement(label2)
                .keyframes(shake);
            const animation3 = createAnimation()
                .addElement(label3)
                .keyframes(shake);
            const animation4 = createAnimation()
                .addElement(label4)
                .keyframes(shake);
            const animation5 = createAnimation()
                .addElement(label5)
                .keyframes(shake);
            const parentAnimation = createAnimation()
                .duration(700)
                .addAnimation([animation1, animation2, animation3, animation4, animation5]);
            parentAnimation.play();
        }
    }

    log('render');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleSave}>
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels labels-1">Description :</IonLabel>
                    <IonInput class="inputs inputs-1" value={description} onIonChange={e => setDescription(e.detail.value || '')} />
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels labels-2">Price :</IonLabel>
                    <IonInput class="inputs inputs-2" value={price} onIonChange={e => setPrice(e.detail.value || '')} />
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels labels-3">Size :</IonLabel>
                    <IonInput class="inputs inputs-3" value={size} onIonChange={e => setSize(e.detail.value || '')} />
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels labels-4">Availability :</IonLabel>
                    <IonInput class="inputs inputs-4" value={availability} onIonChange={e => setAvailability(e.detail.value || '')} />
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels labels-5">Data :</IonLabel>
                    <IonInput class="inputs inputs-5" value={date} onIonChange={e => setDate(e.detail.value || '')} />
                </IonItem>
                {photo && <IonItem>
                    <IonImg src={photo}/>
                </IonItem>}
                <IonLoading isOpen={saving} />
                {savingError && (
                    <div>{savingError.message || 'Failed to save product'}</div>
                )}
                <MyMap
                    lng={longitudine}
                    lat={latitudine}
                    onMapClick={(location: any) => {
                        if(connectedNetworkStatus) {
                            console.log("COORDONATE: " + location.latLng.lng() + " SI " + location.latLng.lat());
                            setLongitudine(parseFloat(location.latLng.lng()));
                            setLatitudine(parseFloat(location.latLng.lat()));
                        }
                    }}
                    onMarkerClick={log('onMarker')}
                />
                <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton onClick={() => {
                        const newPhoto = takePhoto(routeId);
                        console.log(newPhoto);
                        newPhoto.then((i) => {
                            setPhoto(i.webviewPath!);
                            console.log(i.webviewPath);
                            console.log(photo);
                        });
                    }}>
                        <IonIcon icon={camera}/>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default ProductEdit;
