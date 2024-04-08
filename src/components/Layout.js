import { ScrollView, View } from "react-native";
import Header from "./Header";

const Layout = ({ children }) => {
    return ( 
        <View>
            <Header/>
            <ScrollView className="p-4 gap-8">
                { children }
            </ScrollView>
        </View>
    );
}
 
export default Layout;