/*
 * @Descripttion:
 * @version:
 * @@Company:
 * @Author: FY01
 * @Date: 2022-01-21 16:52:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-25 13:47:35
 */
import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import toast from '../../utils/Toast';
import request from '../../utils/request';
import {ACCOUNT_VALIDATEVCODE} from '../../utils/pathMap';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const VCodeTest: React.FC<{
  phoneNumbers: string;
  navigation: {[propName: string]: any};
}> = ({phoneNumbers, navigation}) => {
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const onVCodeSubmitEditing = async () => {
    /**
     * 1.validate VCode
     * 2.send http request : phoneNumbers and input value
     * 3.response: did value match VCode? the user is new or not?
     *    is new : go to the complete page
     *    is old : to the base page
     */
    if (value.length !== 6) {
      let t = new toast();
      t.show('请输入正确的验证码', 'bottom');
      return;
    } else {
      try {
        let result = await request.post(ACCOUNT_VALIDATEVCODE, {
          phone: phoneNumbers,
          vcode: value,
        });
        if (result.code !== '10000') {
          let t = new toast();
          t.show('验证码不正确，请重新输入', 'bottom');
          return;
        }
        if (result.data.isNew) {
          // new user ==> userInfo
          navigation.navigate('UserInfo');
        } else {
          // old user
        }
        // console.log(result);
      } catch (error) {
        let t = new toast();
        t.show('network error,try again later', 'bottom');
      }
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        onSubmitEditing={onVCodeSubmitEditing}
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default VCodeTest;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#4c669f',
  },
});
