import { View, Image } from "react-native";
import Layout from "../../components/Layout";
import SText from "../../components/SText";

const GenerateBarcode = () => {
    return ( 
        <Layout>
            <View className="p-2 space-y-12">
                <View className="bg-white rounded-lg shadow-sm w-full aspect-square mt-8">
                    <Image source={require("../../assets/images/qr-code.png")} className="w-10/12 aspect-square mx-auto my-auto" style={{height: undefined}}/>
                </View>
                <View>
                    <SText text='share-barcode' classes="text-xl text-black font-bold text-justify"/>
                    <SText text='share-barcode-description' classes="text-black text-lg font-medium text-justify py-4"/>
                </View>
            </View>
        </Layout>
    );
}
 
export default GenerateBarcode;