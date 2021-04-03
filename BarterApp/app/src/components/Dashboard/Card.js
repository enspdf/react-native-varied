import React from 'react';
import {StyleSheet} from 'react-native';
import {Box, Text} from '../theme';
import {SEGMENT, ICON_SIZE, PADDING} from '../../Constants';
import theme from '../theme';
import {menus, styles} from './Dashboard';
import Tab from './Tab';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Card({navigation}) {
  const {navigate} = navigation;

  const onSwitch = (routeNumber, routeName) => {
    const isCurrentRoute = routeNumber === 1 ? true : false;

    if (!isCurrentRoute) {
      navigate(routeName);
    }
  };

  return (
    <Box justifyContent="flex-end" flex={1}>
      <Box flex={1} paddingHorizontal="m" paddingVertical="m">
        <Box
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row">
          <Box></Box>
          <TouchableOpacity>
            <Box
              width={120}
              borderRadius="s"
              backgroundColor="primaryLight"
              justifyContent="center"
              paddingVertical="s"
              alignItems="center">
              <Text variant="body">New Card</Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box marginTop="xl">
          <Box
            backgroundColor="barter"
            borderRadius="l"
            height={220}
            paddingVertical="l">
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              paddingRight="l">
              <Box
                backgroundColor="barter4"
                borderTopRightRadius="l"
                borderBottomRightRadius="l"
                paddingLeft="m"
                paddingRight="m">
                <Text variant="body" color="white" fontWeight="400">
                  Limited use card
                </Text>
              </Box>
              <Box>
                <Text variant="title2" color="white">
                  $560
                </Text>
              </Box>
            </Box>
            <Box marginTop="m" paddingHorizontal="l">
              <Text variant="body" color="white" fontSize={12}>
                SAMUEL ANTHONY
              </Text>
              <Text variant="body" color="white" fontSize={20} marginTop="s">
                413 7234 1231 5453
              </Text>
            </Box>
            <Box
              justifyContent="space-between"
              flexDirection="row"
              paddingHorizontal="l"
              marginTop="m"
              alignItems="center">
              <Box flexDirection="row" alignItems="center">
                <Box marginRight="s">
                  <Text
                    variant="body"
                    fontSize={9}
                    lineHeight={18}
                    color="white">
                    Valid {'\n'}Till
                  </Text>
                </Box>
                <Box>
                  <Text color="white" variant="body">
                    01/24
                  </Text>
                </Box>
              </Box>
              <Box>
                <Text
                  variant="title1"
                  fontSize={25}
                  color="white"
                  textTransform="uppercase">
                  Visa
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box height={70} backgroundColor="danger" marginBottom="m">
        <Box style={{...styles.tabs}}>
          {menus.map(({icon, text, routeName}, index) => (
            <Box {...{index}} style={{...styles.tab}} key={index}>
              <Tab
                onPress={(index, route) => onSwitch(index, route)}
                {...{index, text, routeName}}>
                {icon}
              </Tab>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
