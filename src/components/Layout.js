import { View } from "react-native";
import Header from "./Header";

const Layout = ({ navigation, children }) => {
    return ( 
        <View>
            <Header navigation={navigation}/>
            <View className="p-4 gap-8">
                { children }
            </View>
        </View>
    );
}
 
export default Layout;