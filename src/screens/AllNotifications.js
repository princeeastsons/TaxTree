import React, { useState, useEffect } from 'react';
import { View, BackHandler, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { UpdateNotificationsRead, dashboardlist, dashboardlist2 } from '../Redux/Actions/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../Style';
import { clientInfo, ManagerInfo } from '../Redux/Actions/TaxLeaf';

const AllNotifications = () => {
    const [showwhat1, setshowwhat1] = useState('');
    const [showwhat2, setshowwhat2] = useState('');
    const [loader, setLoader] = useState(false);
    const [infoData, setInfoData] = useState({});
    const [dashboardList, setDashboardList] = useState([]);
    const [dashboardList2, setDashboardList2] = useState([]);
    const [dashboardMessageList, setDashboardMessageList] = useState([]);
    const { MY_INFO } = useSelector(state => state.TaxLeafReducer);
    const { DASHBOARD_LIST } = useSelector(state => state.DashboardReducer);
    const { DASHBOARD_MESSAGE_LIST } = useSelector(state => state.DashboardReducer);
    const { DASHBOARD_LIST_TWO } = useSelector(state => state.DashboardReducer);
    const { MANAGER_INFO } = useSelector(state => state.TaxLeafReducer);
    const { LOGIN_DATA } = useSelector(state => state.TaxLeafReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [refreshCount, setRefreshCount] = useState(0);
    const jsonData = MY_INFO.guestInfo;
    const officeInfo = MY_INFO.officeInfo;

    console.log('AllNotificationsAllNotificationsAllNotificationsAllNotificationsAllNotificationsAllNotifications')

    useEffect(() => {
        setLoader(true);
        // setInterval(() => {

        dispatch(clientInfo(LOGIN_DATA, navigation))
            .then(() => dispatch(dashboardlist(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation)))
            .then(() => dispatch(dashboardlist2(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation)))
            .then(() => dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation)))
            .finally(() => {
                setLoader(false);
            });
        // }, 5000);
    }, [LOGIN_DATA, jsonData?.clientId, jsonData?.clientType, officeInfo?.id]);

    const fetchData = async () => {
        setLoader(true);
        try {
            await dispatch(clientInfo(LOGIN_DATA, navigation));
            await dispatch(dashboardlist(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation));
            await dispatch(dashboardlist2(jsonData?.clientId, jsonData?.clientType, officeInfo?.id, navigation));
            await dispatch(ManagerInfo(jsonData?.clientId, jsonData?.clientType, navigation));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoader(false);
        }
    };

    const handleReload = () => {
        fetchData(); // Call fetchData function to reload all APIs
    };


    useEffect(() => {


        setDashboardList(DASHBOARD_LIST);
        setDashboardList2(DASHBOARD_LIST_TWO);
        setDashboardMessageList(DASHBOARD_MESSAGE_LIST);

    }, [DASHBOARD_LIST, DASHBOARD_MESSAGE_LIST, DASHBOARD_LIST_TWO]);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // setLoader(true);
            console.log("HeadTAbsHeadTAbs")
            // showwhatfunc1(showwhat1)
            setshowwhat1("")
            setshowwhat2("")
            // setTimeout(() => {
            //   setLoader(false);
            // }, 2000);

        });
        return unsubscribe;
    }, [navigation,]);


    const HolidaysNewsType = 'Holidays';
    const TaxNewsType = 'Tax Deadlines';
    const EventsType = 'Events';
    const OrderType = 'order';
    const GovernmentType = 'government_payment';
    const TaxReturnsType = 'tax_returns';
    const BookKeepingType = 'bookkeeping';

    const HolidaysfilteredList =
        dashboardList &&
        dashboardList.filter(item => item.newsType === HolidaysNewsType);

    const TaxfilteredList =
        dashboardList &&
        dashboardList.filter(item => item.newsType === TaxNewsType);

    const EventsfilteredList =
        dashboardList &&
        dashboardList.filter(item => item.newsType === EventsType);


    const orderfilteredList =
        dashboardList2 &&
        dashboardList2.filter(item => item.section === OrderType);

    const GovfilteredList =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === GovernmentType);

    const taxreturnfilteredList =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === TaxReturnsType);

    const BookKeepingfilteredList =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === BookKeepingType);



    let UnreadTaxDeadCount = 0;
    let UnreadMessagesCount = 0;
    let UnreadHolidaysCount = 0;
    let UnreadEventCount = 0;
    let UnreadOrderCount = 0;
    let UnreadTaxReturnCount = 0;
    let UnreadBookCount = 0;
    let UnreadGovCount = 0;
    let AllUnreadNotifications = 0;



    // Iterate over the array
    if (dashboardMessageList && Array.isArray(dashboardMessageList)) {
        // Iterate over each item in dashboardMessageList
        for (const item of dashboardMessageList) {
            // Check if the property "isNotificationRead" is false
            if (item && item.isNotificationRead === false) {
                // Increment counter
                UnreadMessagesCount++;
            }
        }

    } else {
        // Handle the case when dashboardMessageList is undefined or not an array
        //console.error('Error: dashboardMessageList is not properly defined');
    }


    const HolidaysfilteredList1 =
        dashboardList &&
        dashboardList.filter(item => item.newsType === HolidaysNewsType && item.isNotificationRead === false);

    UnreadHolidaysCount = HolidaysfilteredList1 && HolidaysfilteredList1.length || 0;


    const TaxfilteredList1 =
        dashboardList &&
        dashboardList.filter(item => item.newsType === TaxNewsType && item.isNotificationRead === false);


    UnreadTaxDeadCount = TaxfilteredList1 && TaxfilteredList1.length || 0;


    const EventsfilteredList1 =
        dashboardList &&
        dashboardList.filter(item => item.newsType === EventsType && item.isNotificationRead === false);

    UnreadEventCount = EventsfilteredList1 && EventsfilteredList1.length || 0;


    const orderfilteredList1 =
        dashboardList2 &&
        dashboardList2.filter(item => item.section === OrderType && item.isNotificationRead === false);

    UnreadOrderCount = orderfilteredList1 && orderfilteredList1.length || 0;




    const GovfilteredList1 =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === GovernmentType && item.isNotificationRead === false);


    UnreadGovCount = GovfilteredList1 && GovfilteredList1.length || 0;



    const taxreturnfilteredList1 =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === TaxReturnsType && item.isNotificationRead === false);


    UnreadTaxReturnCount = taxreturnfilteredList1 && taxreturnfilteredList1.length || 0;


    const BookKeepingfilteredList1 =
        dashboardList2 &&
        dashboardList2.filter(item => item.reference === BookKeepingType && item.isNotificationRead === false);

    UnreadBookCount = BookKeepingfilteredList1 && BookKeepingfilteredList1.length || 0;



    console.log("TaxDeadCount", UnreadTaxDeadCount);
    console.log("messageCount", UnreadMessagesCount);
    console.log("HolidaysCount", UnreadHolidaysCount);
    console.log("EventsCount", UnreadEventCount);


    AllUnreadNotifications = UnreadTaxDeadCount + UnreadMessagesCount + UnreadHolidaysCount + UnreadEventCount + UnreadOrderCount +
        UnreadTaxReturnCount + UnreadBookCount + UnreadGovCount;


    console.log(AllUnreadNotifications, 'AllUnreadNotificationsAllUnreadNotifications')



    const checkMessagenotification = () => {

        const actionList = dashboardMessageList && dashboardMessageList
            .filter(item => item.isNotificationRead === false)
            .map(item => ({ id: item.id }));

        console.log(actionList, 'actionList');

        setLoader(true)

        setTimeout(() => {
            dispatch(UpdateNotificationsRead(actionList, [], []))

        }, 2000);

        setLoader(false)
        console.log('Click on Messages')
    }

    const checkOrdersnotification = () => {

        const orderList = dashboardList2 &&
            dashboardList2.filter(item => item.section === OrderType && item.isNotificationRead === false)
                .map(item => ({ ID: item.id }));



        dispatch(UpdateNotificationsRead([], [], orderList))

        console.log(orderList, 'orderList');

        console.log('Click on Orders')

    }

    const checkTaxReturnsnotification = () => {
        const TaxReturn =
            dashboardList2 &&
            dashboardList2.filter(item => item.reference === TaxReturnsType && item.isNotificationRead === false)
                .map(item => ({ ID: item.id }));

        setLoader(true)

        setTimeout(() => {
            dispatch(UpdateNotificationsRead([], [], TaxReturn))

        }, 2000);
        setLoader(false)

        console.log('Click on TaxReturns', TaxReturn)

    }
    const checkTaxDeadnotification = () => {

        const TaxDeadLine =
            dashboardList &&
            dashboardList.filter(item => item.newsType === TaxNewsType && item.isNotificationRead === false)
                .map(item => ({ ID: item.id }));

        setLoader(true)

        setTimeout(() => {
            dispatch(UpdateNotificationsRead([], TaxDeadLine, []))

        }, 2000);
        setLoader(false)

        console.log('Click on TaxDead', TaxDeadLine)

    }

    const checkHolidaysnotification = () => {
        const HolidayLine =
            dashboardList &&
            dashboardList.filter(item => item.newsType === HolidaysNewsType && item.isNotificationRead === false)
                .map(item => ({ ID: item.id }));


        setLoader(true)

        setTimeout(() => {
            dispatch(UpdateNotificationsRead([], HolidayLine, []))

        }, 2000);
        setLoader(false)
        console.log('Click on Holiday', HolidayLine)

    }

    const checkEventsnotification = () => {
        const EventLine =
            dashboardList &&
            dashboardList.filter(item => item.newsType === EventsType && item.isNotificationRead === false)
                .map(item => ({ ID: item.id }));

        setLoader(true)

        setTimeout(() => {
            dispatch(UpdateNotificationsRead([], EventLine, []))

        }, 2000);
        setLoader(false)

        console.log('Click on Event', EventLine)

    }
    const checkBooknotification = () => {
        const BookKeeping =
            dashboardList2 &&
            dashboardList2.filter(item => item.reference === BookKeepingType && item.isNotificationRead === false)
                .map(item => ({ ID: item.id }));

        setLoader(true)

        setTimeout(() => {
            dispatch(UpdateNotificationsRead([], [], BookKeeping))

        }, 2000);
        setLoader(false)

        console.log('Click on Book', BookKeeping)

    }

    const checkGovnotification = () => {
        const GoveLine =
            dashboardList2 &&
            dashboardList2.filter(item => item.reference === GovernmentType && item.isNotificationRead === false)
                .map(item => ({ ID: item.id }));

        setLoader(true)

        setTimeout(() => {
            dispatch(UpdateNotificationsRead([], [], GoveLine))

        }, 2000);
        setLoader(false)

        console.log('Click on Gov', GoveLine)

    }




    return (
        <View style={styles.container}>
            {/* <Text>All Notifications</Text> */}
            <ScrollView >

                {TaxfilteredList && TaxfilteredList.length > 0 ? (
                    TaxfilteredList.map(item => (

                        <View key={item.id} style={{
                            borderRadius: 10,
                            backgroundColor: "#f7f9fa",
                            alignSelf: "center",
                            marginTop: 10,
                            padding: 10,
                            width: wp(90),
                            flexDirection: 'row'
                        }}>
                            <View
                                style={{
                                    width: wp(15),

                                }}
                            >
                                <Image source={require('../Assets/img/icons/bell-green.png')}
                                    style={{
                                        alignSelf: 'center',
                                        height: 30,
                                        resizeMode: 'contain',
                                        width: 30,
                                    }} />
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -2,
                                        right: 10,
                                        height: 20,

                                        width: 20,
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: Color.white,
                                        backgroundColor: 'red',
                                        borderRadius: 50,
                                    }}>
                                    <Text
                                        style={{
                                            color: Color.white,
                                            alignSelf: 'center',
                                            fontFamily: 'Poppins-SemiBold',
                                            fontSize: 10,
                                        }}>
                                        1
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: wp(65),
                                    //  backgroundColor:'red'
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins-Bold',
                                        color: Color.headerIconBG,
                                        padding: 3,


                                    }}>
                                    {item.subject}
                                </Text>
                                <View
                                    style={{
                                        borderBottomWidth: 1,

                                        borderBottomColor: '#e4edee',
                                    }}
                                ></View>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'Poppins-SemiBold',
                                        color: Color.headerIconBG,
                                        padding: 3,
                                    }}>
                                    Message:
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'Poppins-SemiBold',
                                            color: Color.headerIconBG,
                                            padding: 3,
                                        }}>
                                        {item.message}
                                    </Text>
                                </Text>
                            </View>

                        </View>
                    ))
                ) : (
                    <View style={{
                        borderRadius: 10,
                        backgroundColor: "#f7f9fa",
                        alignSelf: "center",
                        marginTop: 10,
                        padding: 10,
                        width: wp(90),

                    }}>

                        <Text style={styles.subHead}>
                            No Tax Deadlines
                        </Text>

                    </View>
                )}


                {/* <Text style={styles.subHead}> Message Not Found</Text> */}

                {/* </View> */}
                {/* </TouchableOpacity> */}


                <TouchableOpacity onPress={() => setshowwhat1('')}>


                    {dashboardMessageList && dashboardMessageList.length > 0 ? (

                        dashboardMessageList.sort((a, b) => b.id - a.id).map(item => (
                            // <View
                            //     key={item.id}
                            //     style={{
                            //         alignSelf: "center", marginTop: 10, width: wp(80)
                            //     }}>
                            //     <Text
                            //         style={{
                            //             backgroundColor: '#23c6c8',
                            //             fontSize: 12,
                            //             width: wp(15),
                            //             padding: 3,
                            //             textAlign: 'center',
                            //         }}>
                            //         Action
                            //     </Text>
                            //     <Text
                            //         style={{
                            //             fontSize: 12,
                            //             fontWeight: '700',
                            //             padding: 3,
                            //         }}>
                            //         Notification:
                            //         <Text
                            //             style={{
                            //                 fontSize: 10,
                            //                 fontWeight: 'normal',
                            //                 padding: 3,
                            //             }}>
                            //             You have created new action #{item.id}
                            //         </Text>
                            //     </Text>
                            // </View>


                            <View key={item.id} style={{
                                borderRadius: 10,
                                backgroundColor: "#f7f9fa",
                                alignSelf: "center",
                                marginTop: 10,
                                padding: 10,
                                width: wp(90),
                                flexDirection: 'row'
                            }}>
                                <View
                                    style={{
                                        width: wp(15),

                                    }}
                                >

                                    <Image source={require('../Assets/img/icons/bell-green.png')}
                                        style={{
                                            alignSelf: 'center',
                                            height: 30,
                                            resizeMode: 'contain',
                                            width: 30,
                                        }} />
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: -2,
                                            right: 10,
                                            height: 20,

                                            width: 20,
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: Color.white,
                                            backgroundColor: 'red',
                                            borderRadius: 50,
                                        }}>
                                        <Text
                                            style={{
                                                color: Color.white,
                                                alignSelf: 'center',
                                                fontFamily: 'Poppins-SemiBold',
                                                fontSize: 10,
                                            }}>
                                            1
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: wp(65),
                                        //  backgroundColor:'red'
                                    }}
                                >

                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: 'Poppins-Bold',
                                            color: Color.headerIconBG,
                                            padding: 3,


                                        }}>
                                        Action
                                    </Text>
                                    <View
                                        style={{
                                            borderBottomWidth: 1,

                                            borderBottomColor: '#e4edee',
                                        }}
                                    ></View>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'Poppins-SemiBold',
                                            color: Color.headerIconBG,
                                            padding: 3,
                                        }}>
                                        Notification:
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                fontFamily: 'Poppins-SemiBold',
                                                color: Color.headerIconBG,
                                                padding: 3,
                                            }}>
                                            A new action with ID #{item.id} has been created.
                                        </Text>
                                    </Text>
                                </View>

                            </View>
                        ))
                    ) : (
                        <View style={{
                            borderRadius: 10,
                            backgroundColor: "#f7f9fa",
                            alignSelf: "center",
                            marginTop: 10,
                            padding: 10,
                            width: wp(90),

                        }}>

                            <Text style={styles.subHead}>
                                No Messages
                            </Text>

                        </View>

                    )}




                    {/* <View style={styles.subContainer}> */}
                    {/* <Text style={styles.subHead}>Proposal Results Found</Text> */}

                    {/* </View> */}
                </TouchableOpacity>

                {EventsfilteredList && EventsfilteredList.length > 0 ? (
                    EventsfilteredList.map(item => (
                        // <View key={item.id} style={{ alignSelf: "center", marginTop: 10, width: wp(80) }}>
                        //     <Text
                        //         style={{
                        //             backgroundColor: '#23c6c8',
                        //             fontSize: 12,
                        //             padding: 3,
                        //         }}>
                        //         {item.subject}
                        //     </Text>
                        //     <Text
                        //         style={{
                        //             fontSize: 12,
                        //             fontWeight: '700',
                        //             padding: 3,
                        //         }}>
                        //         Message:
                        //         <Text
                        //             style={{
                        //                 fontSize: 10,
                        //                 fontWeight: 'normal',
                        //                 padding: 3,
                        //             }}>
                        //             {item.message}
                        //         </Text>
                        //     </Text>
                        // </View>
                        <View key={item.id} style={{
                            borderRadius: 10,
                            backgroundColor: "#f7f9fa",
                            alignSelf: "center",
                            marginTop: 10,
                            padding: 10,
                            width: wp(90),
                            flexDirection: 'row'
                        }}>
                            <View
                                style={{
                                    width: wp(15),

                                }}
                            >
                                <Image source={require('../Assets/img/icons/bell-green.png')}
                                    style={{
                                        alignSelf: 'center',
                                        height: 30,
                                        resizeMode: 'contain',
                                        width: 30,
                                    }} />
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -2,
                                        right: 10,
                                        height: 20,

                                        width: 20,
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: Color.white,
                                        backgroundColor: 'red',
                                        borderRadius: 50,
                                    }}>
                                    <Text
                                        style={{
                                            color: Color.white,
                                            alignSelf: 'center',
                                            fontFamily: 'Poppins-SemiBold',
                                            fontSize: 10,
                                        }}>
                                        1
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: wp(65),
                                    //  backgroundColor:'red'
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins-Bold',
                                        color: Color.headerIconBG,
                                        padding: 3,


                                    }}>
                                    {item.subject}
                                </Text>
                                <View
                                    style={{
                                        borderBottomWidth: 1,

                                        borderBottomColor: '#e4edee',
                                    }}
                                ></View>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'Poppins-SemiBold',
                                        color: Color.headerIconBG,
                                        padding: 3,
                                    }}>
                                    Message:
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'Poppins-SemiBold',
                                            color: Color.headerIconBG,
                                            padding: 3,
                                        }}>
                                        {item.message}
                                    </Text>
                                </Text>
                            </View>

                        </View>
                    ))
                ) : (
                    <View style={{
                        borderRadius: 10,
                        backgroundColor: "#f7f9fa",
                        alignSelf: "center",
                        marginTop: 10,
                        padding: 10,
                        width: wp(90),

                    }}>

                        <Text style={styles.subHead}>
                            No Events
                        </Text>

                    </View>

                )}

                <TouchableOpacity onPress={() => setshowwhat1('')}>
                    <View style={{}}>

                        {HolidaysfilteredList && HolidaysfilteredList.length > 0 ? (
                            HolidaysfilteredList.map(item => (
                                // <View key={item.id} style={{ alignSelf: "center", marginTop: 10, width: wp(80) }}>
                                //     <Text
                                //         style={{
                                //             backgroundColor: '#23c6c8',
                                //             fontSize: 12,
                                //             padding: 3,
                                //         }}>
                                //         {item.subject}
                                //     </Text>
                                //     <Text
                                //         style={{
                                //             fontSize: 12,
                                //             fontWeight: '700',
                                //             padding: 3,
                                //         }}>
                                //         Message:
                                //         <Text
                                //             style={{
                                //                 fontSize: 10,
                                //                 fontWeight: 'normal',
                                //                 padding: 3,
                                //             }}>
                                //             {item.message}
                                //         </Text>
                                //     </Text>
                                // </View>

                                <View key={item.id} style={{
                                    borderRadius: 10,
                                    backgroundColor: "#f7f9fa",
                                    alignSelf: "center",
                                    marginTop: 10,
                                    padding: 10,
                                    width: wp(90),
                                    flexDirection: 'row'
                                }}>
                                    <View
                                        style={{
                                            width: wp(15),

                                        }}
                                    >
                                        <Image source={require('../Assets/img/icons/bell-green.png')}
                                            style={{
                                                alignSelf: 'center',
                                                height: 30,
                                                resizeMode: 'contain',
                                                width: 30,
                                            }} />
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: -2,
                                                right: 10,
                                                height: 20,

                                                width: 20,
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: Color.white,
                                                backgroundColor: 'red',
                                                borderRadius: 50,
                                            }}>
                                            <Text
                                                style={{
                                                    color: Color.white,
                                                    alignSelf: 'center',
                                                    fontFamily: 'Poppins-SemiBold',
                                                    fontSize: 10,
                                                }}>
                                                1
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            width: wp(65),
                                            //  backgroundColor:'red'
                                        }}
                                    >

                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily: 'Poppins-Bold',
                                                color: Color.headerIconBG,
                                                padding: 3,


                                            }}>
                                            {item.subject}
                                        </Text>
                                        <View
                                            style={{
                                                borderBottomWidth: 1,

                                                borderBottomColor: '#e4edee',
                                            }}
                                        ></View>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins-SemiBold',
                                                color: Color.headerIconBG,
                                                padding: 3,
                                            }}>
                                            Message:
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontFamily: 'Poppins-SemiBold',
                                                    color: Color.headerIconBG,
                                                    padding: 3,
                                                }}>
                                                {item.message}
                                            </Text>
                                        </Text>
                                    </View>

                                </View>

                            ))
                        ) : (
                            <View style={{
                                borderRadius: 10,
                                backgroundColor: "#f7f9fa",
                                alignSelf: "center",
                                marginTop: 10,
                                padding: 10,
                                width: wp(90),

                            }}>

                                <Text style={styles.subHead}>
                                    No Holidays
                                </Text>

                            </View>

                        )}

                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}


export default AllNotifications;


const styles = StyleSheet.create({

    constainer: {
        flex: 1,



    },
    tabsContainer: {
        // backgroundColor: '#fff',
        width: wp(90),
        justifyContent: 'center',
        alignSelf: 'center',
        /// height: 420,
        opacity: 2,
        paddingBottom: 20,
        borderRadius: 10,
        // marginTop: 20,
        // width:'62%'
    },
    part: {
        borderWidth: 0.5,
        borderColor: '#A7B1C2',
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    TabsContainer: {
        justifyContent: 'center',
        alignItems: "center",
        width: wp(22),
        backgroundColor: "",
        height: wp(20)
    },
    moblieSec: {
        // backgroundColor: "red",
        // height: 20,
        width: wp(90),
        // backgroundColor: 'red',
        //backgroundColor: 'red',
        //  justifyContent: 'space-between',
        alignSelf: 'center',
        borderRadius: 50,

        justifyContent: "center",
        // alignItems: "center",
        marginTop: 0,
        // marginBottom: 30,

        flexDirection: 'row',
        // alignSelf: "center",
    },
    emailtoch: {
        //  backgroundColor: "yellow",
        width: wp(12),
        height: wp(12),
        // paddingTop: 5,


        //  justifyContent: 'center',
        borderRadius: 50,
        //marginRight: 6,
        //marginTop: 10,
    },
    emailtochO: {
        //  backgroundColor: "lightgray",
        width: wp(12),
        height: wp(12),
        // paddingTop: 5,
        //  justifyContent: 'center',
        borderRadius: 50,
        //marginRight: 6,
        //marginTop: 10,
    },
    ButtonText: {

        textAlign: 'center',
        paddingTop: 3,
        fontSize: 10,
        fontFamily: 'Poppins-Bold',
    },
    mobiletoch: {
        // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
        // width: 70,
        // height: 45,
        width: wp(12),
        height: wp(12),
        //marginTop: 10,
        // paddingTop: 5,
        borderRadius: 50,
        // justifyContent: 'center',
        // marginLeft: 10
    },
    mobiletoch1: {
        // backgroundColor: showwhat == "My Schools" ? "#2F5597" : "lightgray",
        // width: 70,
        // height: 45,
        width: wp(12),
        height: wp(12),
        //marginTop: 10,
        //  paddingTop: 5,
        borderRadius: 50,
        // justifyContent: 'center',
        // marginRight: 5,
    },
    subHead: {
        //marginLeft: 30,
        //  marginTop: 20,

        fontFamily: 'Poppins-Bold',
        color: Color.headerIconBG,
        textAlign: "center"
    },
    icon: {
        alignSelf: 'center',
        height: 50,
        resizeMode: 'contain',
        width: 50,
        //marginTop: 5 
    },


})