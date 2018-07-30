import React from 'react';
import { Button, Image, View, Text, ScrollView } from 'react-native';
import { ImagePicker } from 'expo';


export default class CameraRoll extends React.Component {
  state = {
    image: null,
    textFound: null
  };

  render() {    

    let { image } = this.state;

    return (
      <View >
          <Button
            title="Select Image"
            onPress={this._pickImage}
          />
          {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200, marginTop:30 }} />}

          <View style={{ marginTop:30 }}>
              <Button
              title="Process"
              onPress={this._sendImage}            
              />
          </View>

          <View style={{ flex:1, padding: 10, marginTop: 20 }}>
            <Text>{this.state.textFound}</Text>
          </View>
      </View>
    );
  }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true
        });
        //console.log(result);
        if (!result.cancelled) {
        this.setState({ image: result.uri });
        }
    };

    _sendImage = async () => {

      const data = new FormData();
      data.append('img',{
        uri: this.state.image,
        type: 'image/jpeg',
        name: 'testPic'
      });
      fetch('https://d8c7ef83.ngrok.io',{
        method: 'POST',
        body: data
      }).then(response => {
        return response.json();
      }).then(data=> {
        this.setState({textFound : data['Text']});
        //console.log(data['Text']);
      }
      ).catch(console.log);
    };
}