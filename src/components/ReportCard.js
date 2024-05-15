import { Text, TouchableOpacity, View } from "react-native";
import SText from "./SText";
import {formatDate, formatTime} from "../utils/utils";
import { appLocale } from "../config/config";

const ReportCard = ({navigation, report, closedStatus, index}) => {
    return ( 
        <View key={index} className="flex-row justify-between items-center bg-white rounded-2xl px-3 py-6">
            <View>
              <SText text='code' classes="mx-3 text-center font-bold"/>
              <Text className="mx-3 text-center font-bold">#{report.id}</Text>
            </View>
            <View className="flex-1 mx-3 space-y-5">
              <View style={{backgroundColor: report.accident.status.color}} className="rounded-md self-start">
                <Text className="text-xs px-6 py-1 ">{appLocale == 'en' ? report.accident.status.name_en : report.accident.status.name_ar}</Text>
              </View>
              <Text>{report.description}</Text>
              <View className="flex-row justify-between">
                <Text className="text-xs">{formatDate(report.created_at)}</Text>
                <Text className="text-xs">{formatTime(report.created_at)}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ReportDetails', {report: report, closedStatus: closedStatus})} 
              className="bg-light-green py-2 rounded-md items-center mt-8">
                <SText text='view-report-details' classes="font-semibold"/>
              </TouchableOpacity>
            </View>
        </View>
     );
}

export default ReportCard;