import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';

import {Button} from '../components/Button';
import {useCalculator} from '../hooks/useCalculator';
import {styles} from '../theme/appTheme';

export const CalculatorScreen = () => {
  const {
    previousNumber,
    number,
    clean,
    buildNumber,
    positiveNegative,
    del,
    divide,
    multiply,
    substract,
    add,
    calculate,
  } = useCalculator();

  return (
    <View style={styles.calculatorContainer}>
      {previousNumber !== '0' && (
        <Text style={styles.tinyResult}>{previousNumber}</Text>
      )}
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {number}
      </Text>
      <View style={styles.row}>
        <Button text="C" color="#9B9B9B" onPress={clean} />
        <Button text="+/-" color="#9B9B9B" onPress={positiveNegative} />
        <Button text="del" color="#9B9B9B" onPress={del} />
        <Button text="/" color="#FF9427" onPress={divide} />
      </View>
      <View style={styles.row}>
        <Button text="7" onPress={buildNumber} />
        <Button text="8" onPress={buildNumber} />
        <Button text="9" onPress={buildNumber} />
        <Button text="X" color="#FF9427" onPress={multiply} />
      </View>
      <View style={styles.row}>
        <Button text="4" onPress={buildNumber} />
        <Button text="5" onPress={buildNumber} />
        <Button text="6" onPress={buildNumber} />
        <Button text="-" color="#FF9427" onPress={substract} />
      </View>
      <View style={styles.row}>
        <Button text="1" onPress={buildNumber} />
        <Button text="2" onPress={buildNumber} />
        <Button text="3" onPress={buildNumber} />
        <Button text="+" color="#FF9427" onPress={add} />
      </View>
      <View style={styles.row}>
        <Button text="0" width onPress={buildNumber} />
        <Button text="." onPress={buildNumber} />
        <Button text="=" color="#FF9427" onPress={calculate} />
      </View>
    </View>
  );
};
