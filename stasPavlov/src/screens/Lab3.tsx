import React, {useState, useMemo, useCallback, useEffect} from 'react'
import {StyleSheet, TouchableOpacity, View, Alert, TextInput} from 'react-native'
import BoldText from '../components/customs/text/BoldText'
import MediumText from '../components/customs/text/MediumText'
import SemiBoldText from '../components/customs/text/SemiBoldText'
import {colors} from '../constants/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    button: {
        backgroundColor: colors.gray,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
})

const expensiveFunction = (x : number) => {
    for (let i = 0; i < 100000000; i++) {
        x++
    }
    return x
}

const Lab3: React.FC = () => {
    const [num, setNum] = useState(0)
    const [memoNum, setMemoNum] = useState(0)
    const iterate = () => {
        setNum(expensiveFunction(0))
    }
    const memoizeExpensiveFunction = useMemo(() => expensiveFunction(0), [])
    const iterateWithMemo = () => {
        setMemoNum(memoizeExpensiveFunction)
    }
    const clearState = () => {
        setNum(0)
        setMemoNum(0)
    }
    const [text, setText] = useState('')
    const memoizedCallback = useCallback(() => {
        Alert.alert('Стейт изменился', text)
    }, [text])
    useEffect(() => {
        memoizedCallback()
    }, [memoizedCallback])
    return (
        <View style={styles.container}>
            <BoldText style={{fontSize: 20}}>useMemo</BoldText>
            <View style={{flexDirection: 'row'}}>
                <View style={{margin: 10}}>
                    <BoldText>Without memo</BoldText>
                    <SemiBoldText>{num}</SemiBoldText>
                    <TouchableOpacity style={styles.button} onPress={iterate}>
                        <MediumText>Click to run</MediumText>
                    </TouchableOpacity>
                </View>
                <View style={{margin: 10}}>
                    <BoldText>With memo</BoldText>
                    <SemiBoldText>{memoNum}</SemiBoldText>
                    <TouchableOpacity style={styles.button} onPress={iterateWithMemo}>
                        <MediumText>Click to run</MediumText>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={clearState}>
                <MediumText>clear state</MediumText>
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
                <BoldText style={{fontSize: 20}}>useCallback</BoldText>
                <TextInput style={styles.button} placeholder={'Напишите что-нибудь'} value={text} onChangeText={setText}/>
            </View>
        </View>
    )
}

export default Lab3
