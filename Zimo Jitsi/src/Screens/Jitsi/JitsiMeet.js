import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import JitsiMeet, { JitsiMeetView } from '@vidit-me/react-native-jitsi-meet';

const conferenceOptions = {
    room: 'ZIMO Jitsi Meeting',
    userInfo: {
        displayName: 'ZIMO Jitsi',
        email: 'ZIMO@zimojitsi.com',
        avatar: 'https://picsum.photos/200',
    },
    featureFlags: {
        'live-streaming.enabled': true,
    },
};

const Jitsi = () => {
    const [showJitsiView, setShowJitsiView] = useState(false);


    const startJitsiAsNativeController = async () => {
        await JitsiMeet.launchJitsiMeetView(conferenceOptions)
    };
    if (showJitsiView) {
        return (
            <JitsiMeetView
                style={styles.jitsiMeetView}
                options={conferenceOptions}
                onConferenceTerminated={(_) => setShowJitsiView(false)}
                onConferenceJoined={(_) => console.log('joined')}
                onConferenceWillJoin={(_) => console.log('will join')}
            />
        );
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={startJitsiAsNativeController}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Join Meeting
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '70%',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#343a40',
    },
    buttonText: {
        color: '#FFF'
    },
    jitsiMeetView: {
        flex: 1,
    },
});

export default Jitsi;