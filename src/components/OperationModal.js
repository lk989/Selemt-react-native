const OperationModal = () => {
  const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);

    return (
        <Modal
            visible={isBarcodeModalVisible}
            onRequestClose={() => setIsBarcodeModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
            transparent>
            <View className="relative flex justify-end h-full">
                <View className="bg-white rounded-t-2xl shadow-lg flex p-2">
                <SText text='choose-operation' classes="text-black py-2 font-bold text-lg text-center mt-8"/>
                <TouchableOpacity
                className="bg-light-green mx-6 my-2 rounded flex-row items-center px-4 py-0.5 mb-2"
                underlayColor='#fff'
                onPress={() => {setIsBarcodeModalVisible(false); setIsOperationModalVisible(true);}}>
                    <SText text='initiate-report' classes="text-center text-s text-black p-2"/>
                <Icon name='car-crash' type='font-awesome-5' color='#fff' size={16}/>
                </TouchableOpacity>
                <TouchableOpacity
                className="bg-light-green mx-6 my-2 rounded flex-row justify-start items-center px-4 py-0.5 mb-5"
                underlayColor='#fff'
                onPress={() => {setIsBarcodeModalVisible(false); setIsObjectionModalVisible(true);}}>
                    <SText text='Raise-objection' classes="text-center text-s text-black p-2"/>
                <Icon name='alert-circle' type='ionicon' color='#fff' size={20}/>
                </TouchableOpacity>
                </View>
            </View>
            </Modal>
    );
}
 
export default OperationModal;