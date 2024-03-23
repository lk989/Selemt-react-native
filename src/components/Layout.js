import { View } from "react-native";
import Header from "./Header";

const Layout = ({ children }) => {
    return ( 
        <View>
            <Header/>
            <View className="p-4 gap-8">
                { children }
            </View>
        </View>
    );
}
 
export default Layout;