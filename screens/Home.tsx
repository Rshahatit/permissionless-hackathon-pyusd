import React, { Dispatch, FC, SetStateAction } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../style/stylesheet'
import HomeComponent from '../components/home'
import Screen from '../lib/screens'
import PortalButton from '../components/shared/button'

interface HomeProps {
  setAddress: Dispatch<SetStateAction<string>>
  setScreen: Dispatch<SetStateAction<Screen>>
}

const Home: FC<HomeProps> = ({ setAddress, setScreen }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Home</Text>

      <HomeComponent setAddress={setAddress} setScreen={setScreen} />
      <PortalButton
        title="View Subscriptions"
        onPress={() => setScreen(Screen.Subscriptions)}
        style={{ marginTop: 10 }}
      />
    </View>
  )
}

export default Home
