import React from 'react';
import {SectionList, Text, View} from 'react-native';

import {HeaderTitle} from '../components/HeaderTitle';
import {ItemSeparator} from '../components/ItemSeparator';
import {styles} from '../theme/appTheme';

interface House {
  house: string;
  data: string[];
}

const houses: House[] = [
  {
    house: 'DC Comics',
    data: [
      'Batman',
      'Superman',
      'Robin',
      'Batman',
      'Superman',
      'Robin',
      'Batman',
      'Superman',
      'Robin',
      'Batman',
      'Superman',
      'Robin',
    ],
  },
  {
    house: 'Marvel Comics',
    data: [
      'Antman',
      'Thor',
      'Spiderman',
      'Antman',
      'Antman',
      'Thor',
      'Spiderman',
      'Antman',
      'Antman',
      'Thor',
      'Spiderman',
      'Antman',
      'Antman',
      'Thor',
      'Spiderman',
      'Antman',
    ],
  },
  {
    house: 'Anime',
    data: [
      'Kenshin',
      'Goku',
      'Saitama',
      'Kenshin',
      'Goku',
      'Saitama',
      'Kenshin',
      'Goku',
      'Saitama',
      'Kenshin',
      'Goku',
      'Saitama',
      'Kenshin',
      'Goku',
      'Saitama',
    ],
  },
];

export const CustomSectionListScreen = () => {
  return (
    <View style={{...styles.globalMargin, flex: 1}}>
      <SectionList
        sections={houses}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={() => <HeaderTitle title="Section List" />}
        ListFooterComponent={() => (
          <View style={{marginBottom: 70}}>
            <HeaderTitle title={`Total houses: ${houses.length}`} />
          </View>
        )}
        renderItem={({item}) => <Text>{item}</Text>}
        stickySectionHeadersEnabled
        renderSectionHeader={({section}) => (
          <View style={{backgroundColor: 'white'}}>
            <HeaderTitle title={section.house} />
          </View>
        )}
        renderSectionFooter={({section}) => (
          <HeaderTitle title={`Total: ${section.data.length}`} />
        )}
        // SectionSeparatorComponent={() => <ItemSeparator />}
        ItemSeparatorComponent={() => <ItemSeparator />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
