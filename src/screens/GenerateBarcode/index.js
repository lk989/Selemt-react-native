import { View, Image } from "react-native";
import Layout from "../../components/Layout";
import SText from "../../components/SText";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { SvgXml } from 'react-native-svg';
import Base64 from 'Base64'

const GenerateBarcode = ({navigation}) => {

    const [qrCodeImage, setQrCodeImage] = useState(null);
    const [qrCodeId, setQrCodeId] = useState(null);
    const [qrCodeToken, setQrCodeToken] = useState(null);
    const qrCodeIdRef = useRef(null);

    useEffect(() => {
        axios.post(`${BASE_URL}generate-qr-code`)
            .then(function (response) {
                let svg = Base64.atob(response.data.qrCode)
                setQrCodeImage(svg);
                setQrCodeId(response.data.id);
                setQrCodeToken(response.data.token);
                qrCodeIdRef.current = response.data.id;
            })
            .catch(function (error) {
                console.error("Error fetching QR code:", error.response.data.message);
            });
            return () => clearInterval(interval);
        }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentQrCodeId = qrCodeIdRef.current;
            if (currentQrCodeId) {
                axios.post(`${BASE_URL}check-scanned-qr-code`, {barcode_id: currentQrCodeId})
                    .then(function (response) {
                        if (response.data == 1) {
                            console.log(qrCodeId)
                            navigation.navigate('Home');
                        }
                    })
                    .catch(function (error) {
                        console.error("Error checking boolean data:", error.response.data.message);
                    });
            }
        }, 3000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <Layout>
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