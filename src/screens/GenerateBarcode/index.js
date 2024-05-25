// ? libraries imports
import { View, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { SvgXml } from 'react-native-svg';
import Base64 from 'Base64'

// ? components imports
import { BASE_URL } from '../../config/config';
import Layout from "../../components/Layout";
import SText from "../../components/SText";

const GenerateBarcode = ({navigation}) => {

    const [qrCodeImage, setQrCodeImage] = useState(null);
    const [flag, setFlag] = useState(false);
    const intervalId = useRef(0);
    const qrCodeIdRef = useRef(null);

    useEffect(() => {
        axios.post(`${BASE_URL}generate-qr-code`)
            .then(function (response) {
                let svg = Base64.atob(response.data.qrCode)
                setQrCodeImage(svg);
                qrCodeIdRef.current = response.data.id;
            })
            .catch(function (error) {
                console.error("Error fetching QR code:", error.response.data.message);
            });
    }, []);

    useEffect(() => {
        clearInterval(intervalId.current);
        if (!flag) {
            intervalId.current = setInterval(getFlag, 2000);
        }
        return () => clearInterval(intervalId.current);
    }, [flag]);
    
    async function getFlag() {
        const currentQrCodeId = qrCodeIdRef.current;
        const response = await fetch(`${BASE_URL}check-scanned-qr-code`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ barcode_id: currentQrCodeId })
                });
        const res = await response.json();
        if (res != 0) {
            setFlag(true);
            navigation.navigate('AccidentPersonalInfo', {accident_id: response.data, party: '1'});
        }
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (currentQrCodeId) {
    //             axios.post(`${BASE_URL}check-scanned-qr-code`, {barcode_id: currentQrCodeId})
    //                 .then(function (response) {
    //                     if (response.data != 0) {
    //                         setFlag(true);
    //                         navigation.navigate('AccidentPersonalInfo', {accident_id: response.data, party: '1'});
    //                     }
    //                 })
    //                 .catch(function (error) {
    //                     console.error("Error checking boolean data:", error.response.data.message);
    //                 });
    //         }
    //     }, 2000); 
    //     return () => clearInterval(interval);
    // }, [flag]);

    return (
        <Layout navigation={navigation} buttons={['home']}>
            <View className="p-2 space-y-12">
                <View className="bg-white rounded-lg shadow-sm w-full aspect-square mt-8">
                    {qrCodeImage && (
                        <SvgXml xml={qrCodeImage} width="80%" height="80%" className="mx-auto my-auto" />
                    )}
                    
                </View>
                <View>
                    <SText text='share-barcode' classes="text-xl text-black font-bold text-justify" />
                    <SText text='share-barcode-description' classes="text-black text-lg font-medium text-justify py-4" />
                </View>
            </View>
        </Layout>
    );
}

export default GenerateBarcode;