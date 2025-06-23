// screens/Home.tsx
import React, { Dispatch, FC, SetStateAction } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Screen from '../lib/screens'
import PortalButton from '../components/shared/button'
import { modernStyles } from '../style/modernStyles'

interface HomeProps {
  setAddress: Dispatch<SetStateAction<string>>
  setScreen: Dispatch<SetStateAction<Screen>>
  pyusdBalance: number
}

const Home: FC<HomeProps> = ({ setAddress, setScreen, pyusdBalance }) => {
  const features = [
    {
      icon: '💳',
      title: 'PYUSD Payments',
      description: 'Pay for subscriptions with stablecoins',
      color: '#3B82F6',
    },
    {
      icon: '⚡',
      title: 'Instant Settlement',
      description: 'No waiting for bank transfers',
      color: '#10B981',
    },
    {
      icon: '🌍',
      title: 'Global Access',
      description: 'Pay for services worldwide',
      color: '#8B5CF6',
    },
    {
      icon: '🔒',
      title: 'Secure Wallet',
      description: 'Portal MPC technology',
      color: '#F59E0B',
    },
  ]

  const quickActions = [
    {
      title: 'Browse Services',
      subtitle: 'Find subscription services',
      icon: '🛍️',
      action: () => setScreen(Screen.Subscriptions),
      color: '#3B82F6',
    },
    {
      title: 'Manage Wallet',
      subtitle: 'View balance & send funds',
      icon: '👛',
      action: () => setScreen(Screen.Wallet),
      color: '#10B981',
    },
  ]

  return (
    <ScrollView
      style={modernStyles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={modernStyles.headerSection}>
        <View style={modernStyles.welcomeContainer}>
          <Text style={modernStyles.welcomeText}>Welcome to</Text>
          <Text style={modernStyles.appTitle}>PayFlow</Text>
          <Text style={modernStyles.subtitle}>
            Subscription payments made simple with PYUSD
          </Text>
        </View>

        {/* Balance Card */}
        <View style={modernStyles.balanceCardLarge}>
          <View style={modernStyles.balanceHeader}>
            <Text style={modernStyles.balanceLabel}>Your Balance</Text>
            <View style={modernStyles.pyusdBadge}>
              <Text style={modernStyles.pyusdBadgeText}>PYUSD</Text>
            </View>
          </View>
          <Text style={modernStyles.balanceAmountLarge}>
            ${pyusdBalance.toFixed(2)}
          </Text>
          <Text style={modernStyles.balanceSubtext}>
            Ready to spend on subscriptions
          </Text>
        </View>
      </View>

      {/* Features Grid */}
      <View style={modernStyles.section}>
        <Text style={modernStyles.sectionTitle}>Why Choose PayFlow?</Text>
        <View style={modernStyles.featuresGrid}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={[
                modernStyles.featureCard,
                { borderLeftColor: feature.color },
              ]}
            >
              <Text style={modernStyles.featureIcon}>{feature.icon}</Text>
              <View style={modernStyles.featureContent}>
                <Text style={modernStyles.featureTitle}>{feature.title}</Text>
                <Text style={modernStyles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={modernStyles.section}>
        <Text style={modernStyles.sectionTitle}>Quick Actions</Text>
        <View style={modernStyles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <View key={index} style={modernStyles.quickActionCard}>
              <View
                style={[
                  modernStyles.quickActionIcon,
                  { backgroundColor: action.color },
                ]}
              >
                <Text style={modernStyles.quickActionIconText}>
                  {action.icon}
                </Text>
              </View>
              <View style={modernStyles.quickActionContent}>
                <Text style={modernStyles.quickActionTitle}>
                  {action.title}
                </Text>
                <Text style={modernStyles.quickActionSubtitle}>
                  {action.subtitle}
                </Text>
              </View>
              <PortalButton
                title="Open"
                onPress={action.action}
                style={[
                  modernStyles.quickActionButton,
                  { backgroundColor: action.color },
                ]}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Getting Started */}
      <View style={modernStyles.section}>
        <View style={modernStyles.gettingStartedCard}>
          <Text style={modernStyles.gettingStartedTitle}>
            🚀 Getting Started
          </Text>
          <Text style={modernStyles.gettingStartedText}>
            Create or recover your wallet to start paying for subscriptions with
            PYUSD. Enjoy lower fees, instant payments, and exclusive discounts.
          </Text>
          <View style={modernStyles.walletActionsContainer}>
            <PortalButton
              title="Create Wallet"
              onPress={() => setScreen(Screen.Wallet)}
              style={modernStyles.primaryWalletButton}
            />
            <PortalButton
              title="Recover Wallet"
              onPress={() => setScreen(Screen.Wallet)}
              style={modernStyles.secondaryWalletButton}
              textColor="#3B82F6"
            />
          </View>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

export default Home
