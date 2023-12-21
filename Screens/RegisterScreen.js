import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const navigate = useNavigation()
    const handleRegister = () => {
        const user = {
            name: Name,
            email: email,
            password: Password
        }
        axios.post("http://localhost:3000/register", user).then((response) => {
            console.log(response);
            Alert.alert(
                "Register Successfully",
                "you have been registerd successfully"
            );
            setName("")
            setEmail("")
            setPassword("")
        }).catch((error) => {
            console.log(error);
            Alert.alert(
                "Registerd failed",
                "An error occured during registrion"
            );
            console.log("error", error);
        })
    }
    return <>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View style={{ marginTop: 50 }}>
                <Image style={{ width: 150, height: 100, resizeMode: "contain" }}
                    source={{
                        uri: "https://play-lh.googleusercontent.com/G6jK9S77RN0laf9_6nhDo3AVxbRP9SgMmt8ZmQjKQ2hibn9xhOY-W5YFn_7stJD1CA=w480-h960-rw"
                    }} />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>Register To Your Account
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, borderColor: "#D0D0D0", borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>

                        <Ionicons style={{ marginLeft: 8 }} name="person" size={24} color="gray" />
                        <TextInput
                            value={Name}
                            onChangeText={(text) => setName(text)}
                            placeholderTextColor={"gray"} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: Password ? 16 : 16 }} placeholder='enter Your Name' />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
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

                <View style={{ marginTop: 45 }} />
                <Pressable
                    onPress={handleRegister}
                    style={{ width: 200, backgroundColor: "black", padding: 15, marginTop: 40, marginLeft: "auto", marginRight: "auto", borderRadius: 6 }}>
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, color: "white" }}>
                        Register
                    </Text>
                </Pressable>
                <Pressable onPress={() => navigate.goBack()} style={{ marginTop: 10, }}>
                    <Text style={{ textAlign: "center", fontSize: 16 }}>Already have an account?Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    </>
}

export default RegisterScreen

const styles = StyleSheet.create({})