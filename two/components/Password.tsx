import { LayoutAnimation, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordschema = Yup.object().shape({
  passwordlength: Yup.number()
    .min(4, 'should be min of 4 character')
    .max(16, 'should not more than 16 character').
    required('length is reaquired')
})

export default function Password() {
  const [password, setpassword] = useState('')
  const [ispassgenerate, setispassgenerate] = useState(false)
  const [lowercase, setlowercase] = useState(true)
  const [upercase, setuppercase] = useState(false)
  const [number, setnumber] = useState(false)
  const [symbols, setsymbols] = useState(false)

  const generatedpasswordstring = (passwordlength: number) => {
    let characterlist = '';
    const uppercaselet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercastlet = 'abcdefghijklmnopqrstuvwxyz'
    const digits = '1234567890'
    const specialchars = '!@#$%^&*()/*-+'
    if (upercase) {
      characterlist += uppercaselet
    }
    if (lowercase) {
      characterlist += lowercastlet

    }
    if (number) {
      characterlist += digits
    }
    if (symbols) {
      characterlist += specialchars
    }
    const passswordres = createpassword(characterlist, passwordlength)
    setpassword(passswordres)
    setispassgenerate(true)

  }
  const createpassword = (characters: string, passwordlength: number) => {
    //
    let result = ''
    for (let i = 0; i < passwordlength; i++) {
      const characterindex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterindex)
    }
    return result
  }

  const resetpasswordstate = () => {
    setpassword('')
    setispassgenerate(false)
    setlowercase(true)
    setuppercase(false)
    setnumber(false)
    setsymbols(false)
  }
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik

            initialValues={{ passwordlength: '' }}
            validationSchema={passwordschema}
            onSubmit={value => {
              console.log(value)
              generatedpasswordstring(+value.passwordlength)//todo
            }}

          >

            {({

              values,

              errors,

              touched,
              isValid,

              handleChange,

              handleBlur,

              handleSubmit,
              handleReset,

              /* and other goodies */

            }) => (

              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn} >
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordlength && errors.passwordlength&&
                    (<Text style={styles.errorText}>
                      {errors.passwordlength}
                    </Text>)
                    }
                    
                  </View>
                  <TextInput 
                    style={styles.inputStyle}
                    value={values.passwordlength}
                    onChangeText={handleChange('passwordlength')}
                    placeholder='EX 8'
                    keyboardType='numeric'
                    />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading} >Inclue lowercase</Text>
                  <BouncyCheckbox disableBuiltInState
                  isChecked={lowercase}
                  onPress={()=>setlowercase(!lowercase)}
                  fillColor='#29AB87'/>
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading} >Inclue uppercase</Text>
                  <BouncyCheckbox disableBuiltInState
                  isChecked={upercase}
                  onPress={()=>setuppercase(!upercase)}
                  fillColor='#29AB87'/>
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading} >Inclue number</Text>
                  <BouncyCheckbox disableBuiltInState
                  isChecked={number}
                  onPress={()=>setnumber(!number)}
                  fillColor='#29AB87'/>
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading} >Inclue symbols</Text>
                  <BouncyCheckbox disableBuiltInState
                  isChecked={symbols}
                  onPress={()=>setsymbols(!symbols)}
                  fillColor='#29AB87'/>
                </View>
                <View style={styles.inputWrapper}></View>

                <View style={styles.formActions}>
                  <TouchableOpacity disabled={!isValid }
                  style={styles.primaryBtn}
                  onPress={()=>{
                    handleSubmit()
                  }}>
                    <Text style={styles.primaryBtnTxt}>generatedPassword</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={()=>{
                      handleReset()
                      resetpasswordstate()

                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>

            )}

          </Formik>
        </View>
        {ispassgenerate ?(
          <View style={[styles.card,styles.cardElevated]}>
            <Text style={styles.subTitle}>Result :</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ):null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
});
