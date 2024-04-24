import { ScrollView, View } from "react-native";
import Header from "./Header";

const Layout = ({ navigation, children }) => {
    return ( 
        <View className="flex-1">
            <Header navigation={navigation}/>
            <ScrollView className="p-4 gap-8" keyboardShouldPersistTaps='handled' >
                { children }
            </ScrollView>
        </View>
    );
}
 
export default Layout;