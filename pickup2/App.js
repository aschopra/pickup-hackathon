import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ListView,
  Alert,
  AppRegistry,
  Image,
  Button,
  ImageBackground,
  DatePickerIOS,
  Picker
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MapView } from 'expo';
console.disableYellowBox = true;
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

var user;
var userObj;
var submitGameForm;

class LoginScreen extends React.Component {
  static navigationOptions = (props) => ({
    title: 'HOME',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerRight: <TouchableOpacity onPress={() => {props.navigation.navigate('Register')}}><Text style={{marginRight: 25, fontWeight: "bold"}}>REGISTER</Text></TouchableOpacity>
  });

  press() {
    this.props.navigation.navigate('LoginScreen');
  }

  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container1}>
        <ImageBackground source={require('./assets/architecture.jpg')} style={styles.backgroundImage}>
          <View style={styles.content}>
            <Text style={styles.logo}>PICKUP!</Text>
            <View style={styles.emptySpace}></View>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => {this.press()} } style={styles.buttonContainer}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={ () => {this.register()} }>
                <Text style={styles.buttonText}>REGISTER</Text>
              </TouchableOpacity>
          </View>
      </View>
    </ImageBackground>
    </View>
    )
  }
}

class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      name: '',
      age: '',
      skill: '',
      position: '',
      imgUrl: ''
    }
  }

  static navigationOptions = (props) => ({
    title: "REGISTER",
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft: <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}}><Text style={{marginLeft: 25, fontWeight: "bold"}}>LOGIN</Text></TouchableOpacity>
  })

  login() {
    this.props.navigation.navigate('LoginScreen');
  }

  handleSubmit() {
    // console.log("this state", this.state)
      fetch('http://2aa7cc7e.ngrok.io/create/user', {
      method: 'POST',
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        age: this.state.age,
        skill: this.state.skill,
        position: this.state.postion,
        imgUrl: this.state.imgUrl
      })
      })
    .then((response) => {
      console.log("resonse from post ", response)
      return response.json()
      })
    .then((responseJson) => {
      if (responseJson.success) {
        console.log("Registration Success!", responseJson)
        this.setState({
          username: '',
          password: '',
          name: '',
          age: '',
          position: '',
          skill: '',
          imgUrl: ''
        })
      } else {
        alert(responseJson.error)
      }
    })
    .catch((err) => {
      console.log("Registration Error! (Network)", err)
    });
    this.login()
  }

  render() {
    return (
      <DismissKeyboard>
      <View style={styles.container}>
        <Image
          style={{width: 150, height: 150, marginBottom: 20, marginTop: 15}}
          // source={{uri: 'http://www.nationalfanthem.com/ShirtPieces/Crying_Michael_Jordan_Meme_Sad_Chicago_Bulls_Fan--ZM--BLK.jpg'}}/>
            source={require('./mjtransparent.png')}
         />

        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your username"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter a password"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            value = {this.state.password}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your name"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({name: text})}
            value = {this.state.name}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Profile Picture"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({imgUrl: text})}
            value = {this.state.imgUrl}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your position"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({position: text})}
            value = {this.state.position}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your age"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({age: text})}
            value = {this.state.age}
          />
        </View>
        <View style={{height: 50}}>
          <TextInput
            style = {{width: 300, height: 40, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Enter your skill level"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({skill: text})}
            value = {this.state.skill}
          />
        </View>


        <View style={{backgroundColor: '#f4511e', borderRadius: 4, borderWidth: 0.5}}>
          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', height: 40, width: 300, fontSize: 30, textAlign:'center'}}>JUST DO IT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
    )
  }
}

class Login extends React.Component {
  static navigationOptions = (props) => ({
    title: "LOGIN",
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft: <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}}><Text style={{marginLeft: 25, fontWeight: "bold"}}>HOME</Text></TouchableOpacity>
  })

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMsg: ''
    }
  }


  redirect() {
    this.props.navigation.navigate('Map');
  }

  redirectLogin() {
    this.props.navigation.navigate('LoginScreen');
  }

  handleSubmit() {
    fetch('http://2aa7cc7e.ngrok.io/login', {
    method: 'POST',
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    })
    })
    .then((response) => {
    console.log("resonse from post ", response)
    return response.json()
    })
    .then((responseJson) => {
      console.log("responseJson", responseJson)
    if (responseJson.success) {
      console.log("Login Success!", responseJson)
      this.setState({
        username: '',
        password: '',
      })
      user = responseJson.player._id
      userObj = responseJson.player
      console.log("user id saved in global", user)
      console.log("user saved in global", userObj)
      this.redirect()
    } else {
      alert("Not valid username/password!")
      this.redirectLogin()
    }
    })
    .catch((err) => {
    console.log("Login Error! (Network)", err)
    });
  }


  render() {
    return (
      <DismissKeyboard>
      <View style={styles.container}>
        <Image
          style={{width: 150, height: 150, marginBottom: 20, marginTop: 45}}
          source={require('./mjtransparent.png')}
        />

        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 20}}>
          <TextInput
            style={{height: 40, width: 300, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Username"
            placeholderTextColor='white'
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
          />
        </View>
        <View style={{ borderRadius: 4, borderWidth: 0.5, borderColor: 'black', width: 300, marginBottom: 20}}>
          <TextInput
            style={{height: 40, width: 300, borderColor: 'white', borderWidth: 2, color: 'white', padding: 10}}
            placeholder="Password"
            placeholderTextColor='white'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            value = {this.state.password}
          />
        </View>

        <View style={{backgroundColor: '#f4511e', borderRadius: 4, borderWidth: 0.5}}>
          <TouchableOpacity onPress={(e) => this.handleSubmit(e)}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', height: 40, width: 300, fontSize: 30, textAlign:'center'}}>GO!</Text>
            </View>
        </TouchableOpacity>
      </View>
      </View>
        </DismissKeyboard>
    )
  }
}

class MapScreen extends React.Component {
  static navigationOptions = (props) => ({
    title: "Pick Your Court Young Blood",
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft: null
  })

  constructor(props) {
    super(props);
    this.state = {
      lat: 37.77,
      long: -122.401,
      latDelta: .02,
      longDelta: .015
    }
  }

  joinGame() {
    this.props.navigation.navigate('JoinScreen');
  }

  createGame() {
    this.props.navigation.navigate('CreateScreen');
  }

  handleInstanbul() {
    this.props.navigation.navigate('ProfileScreen');
  }

  displayCreateGame(e) {
    console.log(e.nativeEvent)
    e.preventDefault()
    Alert.alert(
      'Join or Create a Game',
      'BBB you already know',
      [
        {text: 'Create Game', onPress: () => this.createGame()},
        {text: 'Join Game', onPress: () => this.joinGame()},
      ],
      { cancelable: false }
    )
  }

  render() {
    return(
      <View style={{
          flex: 1
        }}>
        <MapView
        style={{flex: 7}}
        region={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: this.state.latDelta,
          longitudeDelta: this.state.longDelta
        }}>
        <MapView.Marker
          coordinate = {{latitude: 37.779, longitude: -122.4058}}
          title = {"Gene Friend Recreation Center"}
          onSelect={(e)=>this.displayCreateGame(e)}
          >
            <Image
              style={{width: 50, height: 50}}
              source={{uri: "https://images.vexels.com/media/users/3/135385/isolated/preview/212a5985af3fc8329ada7bc2a45bad82-basketball-circle-icon-by-vexels.png"}}
            />
        </MapView.Marker>
        <MapView.Marker
          coordinate = {{latitude: 37.777, longitude: -122.406}}
          title = {"Victoria Manalo Draves Park"}
          onSelect={(e)=>this.displayCreateGame(e)}
          >
          <Image
            style={{width: 50, height: 50}}
            source={{uri: "https://images.vexels.com/media/users/3/135385/isolated/preview/212a5985af3fc8329ada7bc2a45bad82-basketball-circle-icon-by-vexels.png"}}
          />
        </MapView.Marker>
        <MapView.Marker
          coordinate = {{latitude: 37.772, longitude: -122.398}}
          title = {"Mission Creek Park Basketball Court"}
          onSelect={(e)=>this.displayCreateGame(e)}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: "https://images.vexels.com/media/users/3/135385/isolated/preview/212a5985af3fc8329ada7bc2a45bad82-basketball-circle-icon-by-vexels.png"}}
          />
        </MapView.Marker>
        <MapView.Marker
          coordinate = {{latitude: 37.773, longitude: -122.3936}}
          title = {"Mission Creek Park Pavilion"}
          onSelect={(e)=>this.displayCreateGame(e)}
          >
          <Image
            style={{width: 50, height: 50}}
            source={{uri: "https://images.vexels.com/media/users/3/135385/isolated/preview/212a5985af3fc8329ada7bc2a45bad82-basketball-circle-icon-by-vexels.png"}}
          />
        </MapView.Marker>
      </MapView>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f4511e'}}>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: 4,
              justifyContent: 'center'
            }}
              onPress={() => this.handleInstanbul()}>
            <Text style={{fontWeight: 'bold', color: "white"}}>{<Icon name="user" size={20}/>}{'  '}PROFILE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: 4,
              justifyContent: 'center'
            }}
              onPress={() => this.handleCurrent()}>
            <Text style={{fontWeight: 'bold', color: "white"}}>GAMES{'  '}{<Icon name="trophy" size={20}/>}</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

class JoinGame extends React.Component {
  static navigationOptions = (props) => ({
    title: 'PICK A GAME',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft: <TouchableOpacity onPress={() => {props.navigation.navigate('Map')}}><Text style={{marginLeft: 25, fontWeight: "bold"}}>COURTS</Text></TouchableOpacity>
  })

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        // {
        // time: "10AM",
        // gameType: "3v3",
        // skillLevel: "Mad Skills",
        // numberPlayers: "5",
        // totalPlayers: "6",
        // host: 'juan',
        // imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        // }, {
        // time: "11AM",
        // gameType: "4v4",
        // skillLevel: "Sad Skills",
        // numberPlayers: "3",
        // totalPlayers: "8",
        // host: 'will',
        // imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        // }, {
        // time: "1PM",
        // gameType: "5v5",
        // skillLevel: "Sad Skills",
        // numberPlayers: "8",
        // totalPlayers: "10",
        // host: 'asheesh',
        // imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        // } , {
        // time: "1PM",
        // gameType: "5v5",
        // skillLevel: "Sad Skills",
        // numberPlayers: "8",
        // totalPlayers: "10",
        // host: 'asheesh',
        // imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        // }, {
        // time: "1PM",
        // gameType: "5v5",
        // skillLevel: "Sad Skills",
        // numberPlayers: "8",
        // totalPlayers: "10",
        // host: 'asheesh',
        // imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        // }, {
        // time: "1PM",
        // gameType: "5v5",
        // skillLevel: "Sad Skills",
        // numberPlayers: "8",
        // totalPlayers: "10",
        // host: 'asheesh',
        // imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        // }, {
        // time: "1PM",
        // gameType: "5v5",
        // skillLevel: "Sad Skills",
        // numberPlayers: "8",
        // totalPlayers: "10",
        // host: 'asheesh',
        // imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        // }, {
        // time: "1PM",
        // gameType: "5v5",
        // skillLevel: "Sad Skills",
        // numberPlayers: "8",
        // totalPlayers: "10",
        // host: 'asheesh',
        // imgUrl: 'http://i.imgur.com/yqtj8vi.jpg'
        // }
      ])
    }
  }

  componentDidMount() {
    fetch('http://2aa7cc7e.ngrok.io/login', {
      method: 'GET',
      headers: {
      "Content-Type": "application/json"
      }
      })
    .then((response) => response.json())
    //maybe clear state here before new state is moved in
    .then((responseJson) => {
      console.log("Messages Response: ", responseJson)
      if (!responseJson.success) {
        alert('Did not successfully set state with messages')
        console.log(responseJson, "1")
      } else {
        console.log(responseJson)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let yeet = ds.cloneWithRows(responseJson.games)
        this.setState({
          dataSource: yeet
        })
      }
    })
    .catch((err) => {
        console.log("Error fetching messages!", err)
    })
  }

  render() {
    return (
      <View style={{backgroundColor: '#f4511e' }}>
        {/* <View>
          <Text style={{textAlign: 'center'}}>TIME SLOTS</Text>
        </View> */}
        <ListView
        renderRow={(game) => (
          <View style={{backgroundColor: '#00264d', borderWidth: 1, borderColor: '#f4511e', borderRadius: 10, height: 125}}>
            <TouchableOpacity>
            <View style={{display: 'flex', flexDirection: "row",
                alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{paddingTop: 15, paddingLeft: 25, color: 'white', fontWeight: 'bold'}}>
                {game.time}
              </Text>
              <View style={{borderRightWidth: 2, borderLeftWidth: 2, borderColor: '#f4511e'}}>
              <Text style={{textAlign: 'center', margin: 10, color: 'white', fontWeight: 'bold'}}>
                {"\n"}
                {game.gameType} {"\n"}{"\n"}
                Skill Level: {game.skillLevel} {"\n"}{"\n"}
                {game.numberPlayers} / {game.totalPlayers} Players
                {"\n"}
              </Text>
              </View>
              <View style={{marginTop: 10, paddingRight: 20}}>
                <Text style={{color: 'white', fontWeight: 'bold' , paddingLeft: 10, marginBottom: 5}}>Host</Text>
                <Image style={{width: 60, height: 60, borderRadius: 30, borderColor: "white", borderWidth: 2 }} source={{uri: game.imgUrl}}></Image>
              </View>
            </View>
            </TouchableOpacity>
          </View>
        )}
      dataSource={this.state.dataSource}
      />
      </View>
    )
  }
}

class CreateGame extends React.Component {
  static navigationOptions = (props) => ({
    title: 'Ready to Ball?',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerLeft: null
    // headerRight: {<TouchableOpacity onPress = {(event) => {submitGameForm(event)}}><Text>Create Game</Text></TouchableOpacity>}
  })

  constructor(props) {
    super(props);
    this.state = {
      time: '5:00',
      gameType: '5v5',
      players: [],
      host: '',
      skillLevel: 'hof',
      totalPlayers: '6'
    };
    this.setDate = this.setDate.bind(this);
    submitGameForm = this.handleSubmit.bind(this)
  }

  setDate(newDate) {
    this.setState({time: newDate})
  }

  redirectMap() {
    this.props.navigation.navigate('Map');
  }

  handleSubmit(e) {
    e.preventDefault()
    fetch('http://2aa7cc7e.ngrok.io/create/game', {
    method: 'POST',
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
      players: [userObj.name],
      gameType: this.state.gameType,
      time: this.state.time,
      host: userObj.name,
      skillLevel: this.state.skillLevel,
      userId: user,
      totalPlayers: this.state.totalPlayers
    })
    })
  .then((response) => {
    console.log("resonse from post ", response)
    return response.json()
    })
  .then((responseJson) => {
    if (responseJson.success) {
      console.log("Game Created Success!", responseJson)
      this.setState({
        players: '',
        gameType: '',
        time: '',
        host: '',
        skillLevel: '',
      })
    } else {
      alert(responseJson.error)
    }
  })
  .catch((err) => {
    console.log("Game Creation Error! (Network)", err)
  });
  this.redirectMap()
}

  render() {
    return (
      <View style={{flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#00264d'}}>

        <View style={{flex: 1, borderWidth: 2, alignItems: 'center', borderColor: 'white', flexDirection: 'row'}}>
          {/* <DatePickerIOS
            mode="time"
            date={this.state.time}
            onDateChange={this.setDate}
          /> */}
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, position: 'absolute', top: 5, left: 10}}>Select Game Time</Text>
          <Picker style={{height: 50, width: 100, position:'absolute', top:10, left:20}} itemStyle = {{color: 'white'}}
                  selectedValue={this.state.time}
                  onValueChange={(itemValue, itemIndex) => this.setState({time: itemValue})}>
            <Picker.Item label="12:00" value="12:00"/>
            <Picker.Item label="1:00" value="1:00" />
            <Picker.Item label="2:00" value="2:00" />
            <Picker.Item label="3:00" value="3:00" />
            <Picker.Item label="4:00" value="4:00" />
            <Picker.Item label="5:00" value="5:00" />
            <Picker.Item label="6:00" value="6:00" />
            <Picker.Item label="7:00" value="7:00" />
            <Picker.Item label="8:00" value="8:00" />
            <Picker.Item label="9:00" value="9:00" />
            <Picker.Item label="10:00" value="10:00" />
            <Picker.Item label="11:00" value="11:00" />
          </Picker>

          <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 20, position: 'absolute', top: 5, right: 10}}>Game Type</Text>
          <View style={{position: 'absolute', right: 20, top: 10}}>
            <Picker style={{height: 50, width: 100}}
                    itemStyle = {{color: 'white'}}
                    selectedValue={this.state.gameType}
                    onValueChange={(itemValue, itemIndex) => this.setState({gameType: itemValue})}>
              <Picker.Item label="1v1" value="1v1" />
              <Picker.Item label="3v3" value="3v3" />
              <Picker.Item label="5v5" value="5v5" />
            </Picker>
        </View>
        </View>
        <View style={{flex: 1, borderWidth: 2, alignItems: 'center', borderColor: 'white', flexDirection: 'row'}}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: "center", position: 'absolute', top: 5, left: 10}}>Skill Level</Text>
          <View style={{flex: 2, position:'absolute', left:5, top:5}}>
            <Picker style={{height: 50, width: 100}}
                    itemStyle = {{color: 'white'}}
                    selectedValue={this.state.skillLevel}
                    onValueChange={(itemValue, itemIndex) => this.setState({skillLevel: itemValue})}>
              <Picker.Item label="Rookie" value="rookie" />
              <Picker.Item label="Pro" value="pro" />
              <Picker.Item label="HoF" value="hof" />
            </Picker>
          </View>
          <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', position: 'absolute', top: 5, right: 10}}>Player Count</Text>
            <View style={{position:'absolute', right:10, top:5}}>
              <Picker style={{height: 50, width: 100}}
                      itemStyle = {{color: 'white'}}
                      selectedValue={this.state.totalPlayers}
                      onValueChange={(itemValue, itemIndex) => this.setState({totalPlayers: itemValue})}>
                <Picker.Item label="2" value="2" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="10" value="10" />
              </Picker>
          </View>
        </View>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: 'white', borderRadius: 10}}>
          <TouchableOpacity style={{borderWidth: 4, borderColor: 'white', borderRadius: 10, padding: 60}} onPress={(e) => this.handleSubmit(e)}><Text style={{fontSize: 30, color: 'white'}} >Submit</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}


class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    fetch('http://2aa7cc7e.ngrok.io/profile', {
      method: 'GET',
      headers: {
      "Content-Type": "application/json"
      },
      })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Messages Response: ", responseJson)
      if (!responseJson.success) {
        alert('Did not successfully set state with user')
        console.log(responseJson, "1")
      } else if (responseJson.success) {
        console.log(responseJson)
        console.log('user', responseJson.player)
        this.setState({
          user: responseJson.player
        })
      }
    })
    .catch((err) => {
        console.log("Error fetching messages!", err)
    })
    console.log(this.state.user)
  }



  render(){
    console.log("state", this.state)
    let imgUrl = this.state.user.imgUrl;
    return(
      <View style={{backgroundColor: '#f4511e'}}>
        <View style={{backgroundColor: '#00264d', borderWidth: 1, borderColor: '#f4511e', borderRadius: 10, height: 1000}}>
          <Image style={{height: 200, width: 200, borderRadius: 100, borderWidth: 5, borderColor: "white", position: "absolute", right: 90, top: 30}} source={{uri:imgUrl}}/>
          <View style={{borderWidth: 5, borderColor: '#f4511e', borderRadius: 10, height: 300, absolute: "position", top: 250}}>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 30, textAlign: 'center', marginLeft: 10, marginRight: 10}}>
              {'\n'}{'\n'}
              Username: {this.state.user.name}{'\n'}{'\n'}
              Age: {this.state.user.age}{'\n'}{'\n'}
              Skill Level: {this.state.user.skill}
              {'\n'}{'\n'}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  },
  Map: {
    screen: MapScreen
  },
  LoginScreen: {
    screen: Login
  },
  JoinScreen: {
    screen: JoinGame
  },
  CreateScreen: {
    screen: CreateGame
  },
  ProfileScreen: {
    screen: Profile
  }
}, {initialRouteName: 'Login'});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#00264d'
  },
  containerJoinGames: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  messageContainer:{
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    alignSelf: 'stretch',
    borderColor: 'black',
    padding: 5
  },
  textColor: {
    color: 'white'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textShadowColor: "#252525",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 15,
    marginBottom: 20
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  container1: {
    flex: 1
  },
  emptySpace: {
    margin: 30
  }
});
