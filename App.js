import React from 'react';
import { StyleSheet, Text, View , ScrollView} from 'react-native';
import CameraRoll from './camera'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Text style={{ textAlign: 'center', margin:10, fontSize:24, color:'#024b7c' }}> Text Extraction  </Text>
          
          <ScrollView showsVerticalScrollIndicator={false} >
            <CameraRoll/>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ceebff',
    width: '100%',
  },
  image:{
    marginTop: 20,
    padding: 15,
    width: '100%',
    marginBottom : 30
  }
});
