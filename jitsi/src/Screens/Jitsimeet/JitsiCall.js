import JitsiMeet, { JitsiMeetView } from '@vidit-me/react-native-jitsi-meet';
import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

const conferenceOptions = {
    room: 'ReactNativeJitsiRoom',
    userInfo: {
        displayName: 'React Native Jitsi Meet Example',
        email: 'example@test.com',
        avatar: 'https://picsum.photos/200',
    },
    featureFlags: {
        'live-streaming.enabled': true,
    },
};

function App() {
    const [showJitsiView, setShowJitsiView] = useState(false);
    const [muted, setMuted] = React.useState(true);

    // const startJitsiAsNativeController = async () => {
        const startJitsiAsNativeController = async () => {
            await JitsiMeet.launchJitsiMeetView(conferenceOptions)
        };
        if (showJitsiView) {
            console.log('start');

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
        else {
            console.log('fail');
        }
    // }
    return (
        <View style={styles.container}>
            <Pressable
                onPress={startJitsiAsNativeController}
                style={({ pressed }) => [
                    styles.pressable,
                    { opacity: pressed ? 0.5 : 1 },
                ]}
            >
                <Text style={styles.pressableText}>
                    Start Jitsi on top of RN Application
                </Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    JitsiMeet.sendActions({ SET_VIDEO_MUTED: { muted: !muted } });
                    setMuted(!muted);
                }
                }
                style={({ pressed }) => [
                    styles.pressable,
                    { opacity: pressed ? 0.5 : 1 },
                ]}
            >
                <Text style={styles.pressableText}>
                    Toggle some controller
                </Text>
            </Pressable>
            <Pressable
                onPress={() => setShowJitsiView(true)}
                style={({ pressed }) => [
                    styles.pressable,
                    { opacity: pressed ? 0.5 : 1 },
                ]}
            >
                <Text style={styles.pressableText}>Start Jitsi as a RN View</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressable: {
        width: '80%',
        borderRadius: 15,
        height: 50,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    pressableText: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    jitsiMeetView: {
        flex: 1,
    },
});

export default App;