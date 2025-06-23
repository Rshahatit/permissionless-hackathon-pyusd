import React, { useEffect, useState } from 'react'
import { StatusBar, View, TouchableOpacity, Text } from 'react-native'
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import { styles } from './style/stylesheet'
import { modernStyles } from './style/modernStyles'
import Portal, { PortalContextProvider } from '@portal-hq/core'
import Screen from './lib/screens'
import Home from './screens/Home'
import Chain from './lib/chains'
import { createPortalInstance } from './lib/portal'
import Wallet from './screens/Wallet'
import Subscriptions from './screens/Subscriptions'
import Settings from './screens/Settings'

function App(): JSX.Element {
  const [address, setAddress] = useState<string>('')
  const [chain, setChain] = useState<Chain>(Chain.Devnet)
  const [portal, setPortal] = useState<Portal | null>(null)
  const [screen, setScreen] = useState<Screen>(Screen.Home)
  const [pyusdBalance, setPyusdBalance] = useState<number>(125.5)

  useEffect(() => {
    if (!portal) {
      const portal = createPortalInstance(
        'cd3481c2-8e64-4afd-9ae1-4d42a893b070',
      )
      setPortal(portal)
    } else {
      ;(async () => {
        const addresses = await portal.addresses

        if (addresses?.solana) {
          console.log(`Solana address: ${addresses.solana}`)
          setAddress(addresses.solana)
        }
      })()
    }
  }, [portal])

  const navigationItems = [
    { screen: Screen.Home, icon: '🏠', label: 'Home' },
    { screen: Screen.Subscriptions, icon: '📱', label: 'Services' },
    { screen: Screen.Wallet, icon: '👛', label: 'Wallet' },
    { screen: Screen.Settings, icon: '⚙️', label: 'Settings' },
  ]

  const renderTabBar = () => (
    <View style={modernStyles.tabBar}>
      {navigationItems.map((item) => (
        <TouchableOpacity
          key={item.screen}
          style={modernStyles.tabItem}
          onPress={() => setScreen(item.screen)}
        >
          <Text style={modernStyles.tabIcon}>{item.icon}</Text>
          <Text
            style={[
              modernStyles.tabLabel,
              screen === item.screen
                ? modernStyles.activeTabLabel
                : modernStyles.inactiveTabLabel,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  return (
    <SafeAreaProvider>
      <PortalContextProvider value={portal as Portal}>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <View
              style={[
                styles.container,
                {
                  paddingTop: insets ? insets.top : 0,
                },
              ]}
            >
              <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

              <View style={styles.container}>
                {screen === Screen.Home && (
                  <Home
                    setAddress={setAddress}
                    setScreen={setScreen}
                    pyusdBalance={pyusdBalance}
                  />
                )}
                {screen === Screen.Wallet && (
                  <Wallet
                    address={address}
                    chain={chain}
                    setScreen={setScreen}
                    pyusdBalance={pyusdBalance}
                    setPyusdBalance={setPyusdBalance}
                  />
                )}
                {screen === Screen.Subscriptions && (
                  <Subscriptions
                    address={address}
                    chain={chain}
                    pyusdBalance={pyusdBalance}
                    setPyusdBalance={setPyusdBalance}
                  />
                )}
                {screen === Screen.Settings && (
                  <Settings
                    chain={chain}
                    setChain={setChain}
                    pyusdBalance={pyusdBalance}
                    address={address}
                  />
                )}
              </View>

              {renderTabBar()}
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
      </PortalContextProvider>
    </SafeAreaProvider>
  )
}

export default App
