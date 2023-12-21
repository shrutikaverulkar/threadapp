import { Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const navigate = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View style={{ marginTop: 50 }}>
                <Image style={{ width: 150, height: 100, resizeMode: "contain" }}
                    source={{
                        uri: "https://play-lh.googleusercontent.com/G6jK9S77RN0laf9_6nhDo3AVxbRP9SgMmtz8ZmQjKQ2hibn9xhOY-W5YFn_7stJD1CA=w480-h960-rw"
                    }} />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>Login To Your Account</Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                        <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor={"gray"} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }} placeholder='enter Your Email' />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                        <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="gray" />
                        <TextInput
                            secureTextEntry={true}
                            value={Password}
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor={"gray"} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: Password ? 16 : 16 }} placeholder='enter Your Password' />
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                    <Text>Keep me Logged in</Text>
                    <Text style={{ fontWeight: "500", color: "#007FFF" }}>Forgot Password</Text>
                </View>
                <View style={{ marginTop: 45 }} />
                <Pressable style={{ width: 200, backgroundColor: "black", padding: 15, marginTop: 40, marginLeft: "auto", marginRight: "auto", borderRadius: 6 }}>
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, color: "white" }}>Login</Text>
                </Pressable>
                <Pressable onPress={() => navigate.navigate("Register")} style={{ marginTop: 10, }}>
                    <Text style={{ textAlign: "center", fontSize: 16 }}>Dont't have an account? Sign Up</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})