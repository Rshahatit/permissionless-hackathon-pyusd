// screens/Settings.tsx
import React, { Dispatch, FC, SetStateAction } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { modernStyles } from '../style/modernStyles'
import Chain from '../lib/chains'
import PortalButton from '../components/shared/button'

interface SettingsProps {
  chain: Chain
  setChain: Dispatch<SetStateAction<Chain>>
  pyusdBalance: number
  address: string
}

const Settings: FC<SettingsProps> = ({
  chain,
  setChain,
  pyusdBalance,
  address,
}) => {
  const networkOptions = [
    {
      id: Chain.Mainnet,
      name: 'Mainnet',
      description: 'Production network with real funds',
      icon: '🌐',
      color: '#10B981',
    },
    {
      id: Chain.Devnet,
      name: 'Devnet',
      description: 'Test network for development',
      icon: '🧪',
      color: '#F59E0B',
    },
  ]

  const settingsOptions = [
    {
      title: 'Wallet Address',
      value: address
        ? `${address.slice(0, 8)}...${address.slice(-8)}`
        : 'No wallet connected',
      action: () => {
        if (address) {
          Alert.alert('Wallet Address', address)
        }
      },
      icon: '🏠',
    },
    {
      title: 'Balance',
      value: `${pyusdBalance.toFixed(2)} PYUSD`,
      action: () => {},
      icon: '💰',
    },
    {
      title: 'Backup Wallet',
      value: 'Secure your wallet',
      action: () =>
        Alert.alert('Backup', 'Navigate to wallet screen to backup'),
      icon: '🔐',
    },
    {
      title: 'About PayFlow',
      value: 'Version 1.0.0',
      action: () =>
        Alert.alert(
          'About',
          'PayFlow - PYUSD Subscription Payments\nBuilt for the Portal Hackathon',
        ),
      icon: 'ℹ️',
    },
  ]

  return (
    <ScrollView
      style={modernStyles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={modernStyles.headerSection}>
        <Text style={modernStyles.screenTitle}>Settings</Text>
        <Text style={modernStyles.subtitle}>Manage your app preferences</Text>
      </View>

      {/* Network Selection */}
      <View style={modernStyles.section}>
        <Text style={modernStyles.sectionTitle}>Network</Text>
        <Text style={modernStyles.sectionDescription}>
          Choose which Solana network to use for transactions
        </Text>

        <View style={modernStyles.networkContainer}>
          {networkOptions.map((network) => (
            <TouchableOpacity
              key={network.id}
              style={[
                modernStyles.networkCard,
                chain === network.id && modernStyles.selectedNetworkCard,
              ]}
              onPress={() => setChain(network.id)}
            >
              <View style={modernStyles.networkCardContent}>
                <View
                  style={[
                    modernStyles.networkIcon,
                    { backgroundColor: network.color },
                  ]}
                >
                  <Text style={modernStyles.networkIconText}>
                    {network.icon}
                  </Text>
                </View>
                <View style={modernStyles.networkInfo}>
                  <Text
                    style={[
                      modernStyles.networkName,
                      chain === network.id && modernStyles.selectedNetworkName,
                    ]}
                  >
                    {network.name}
                  </Text>
                  <Text
                    style={[
                      modernStyles.networkDescription,
                      chain === network.id &&
                        modernStyles.selectedNetworkDescription,
                    ]}
                  >
                    {network.description}
                  </Text>
                </View>
                {chain === network.id && (
                  <View style={modernStyles.selectedIndicator}>
                    <Text style={modernStyles.selectedIndicatorText}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Wallet Information */}
      <View style={modernStyles.section}>
        <Text style={modernStyles.sectionTitle}>Wallet Information</Text>

        <View style={modernStyles.settingsContainer}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={modernStyles.settingsItem}
              onPress={option.action}
            >
              <View style={modernStyles.settingsItemContent}>
                <Text style={modernStyles.settingsIcon}>{option.icon}</Text>
                <View style={modernStyles.settingsInfo}>
                  <Text style={modernStyles.settingsTitle}>{option.title}</Text>
                  <Text style={modernStyles.settingsValue}>{option.value}</Text>
                </View>
              </View>
              <Text style={modernStyles.settingsArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={modernStyles.section}>
        <Text style={modernStyles.sectionTitle}>Actions</Text>

        <View style={modernStyles.actionsContainer}>
          <PortalButton
            title="Reset App Data"
            onPress={() => {
              Alert.alert(
                'Reset App Data',
                'This will clear all app data. Are you sure?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Reset', style: 'destructive' },
                ],
              )
            }}
            style={modernStyles.destructiveButton}
            textColor="#DC2626"
          />
        </View>
      </View>

      {/* Footer */}
      <View style={modernStyles.footerSection}>
        <Text style={modernStyles.footerText}>
          PayFlow uses Portal's MPC technology for secure wallet management
        </Text>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

export default Settings
