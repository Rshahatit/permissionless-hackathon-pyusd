// screens/Wallet.tsx
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Text, View, ScrollView, TextInput, Alert } from 'react-native'
import { modernStyles } from '../style/modernStyles'
import { styles } from '../style/stylesheet'
import Chain from '../lib/chains'
import { getAssetBalances, transferToken } from '../lib/portal'
import Screen from '../lib/screens'
import PortalButton from '../components/shared/button'
import { usePortal } from '@portal-hq/core'
import { doesWalletExist } from '../lib/portal'

interface WalletProps {
  address: string
  chain: Chain
  setScreen: Dispatch<SetStateAction<Screen>>
  pyusdBalance: number
  setPyusdBalance: Dispatch<SetStateAction<number>>
}

const Wallet: FC<WalletProps> = ({
  address,
  chain,
  pyusdBalance,
  setPyusdBalance,
}) => {
  const portal = usePortal()
  const [solBalance, setSolBalance] = useState<number>(0)
  const [sendAddress, setSendAddress] = useState<string>('')
  const [sendAmount, setSendAmount] = useState<string>('')
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasWallet, setHasWallet] = useState<boolean>(false)

  const createWallet = async () => {
    if (portal) {
      setIsLoading(true)
      try {
        const addresses = await portal.createWallet()
        if (addresses.solana) {
          Alert.alert('Success', 'Wallet created successfully!')
          setHasWallet(true)
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to create wallet')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const sendPyusd = async () => {
    if (!sendAddress || !sendAmount) {
      Alert.alert('Error', 'Please enter recipient address and amount')
      return
    }

    const amount = parseFloat(sendAmount)
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount')
      return
    }

    if (amount > pyusdBalance) {
      Alert.alert('Error', 'Insufficient balance')
      return
    }

    setIsLoading(true)
    try {
      const txHash = await transferToken(chain, sendAddress, 'PYUSD', amount)
      setTransactionHash(txHash)
      setPyusdBalance((prev) => prev - amount)
      setSendAddress('')
      setSendAmount('')
      Alert.alert('Success', 'Transaction sent successfully!')
    } catch (error) {
      Alert.alert('Error', 'Transaction failed')
    } finally {
      setIsLoading(false)
    }
  }

  const updateBalances = async () => {
    if (!address) {
      return
    }

    try {
      const balances = await getAssetBalances(address, chain === Chain.Devnet)
      const solBalance = parseFloat(balances.nativeBalance.balance)
      setSolBalance(solBalance)
    } catch (error) {
      console.error('Error fetching balances:', error)
    }
  }

  useEffect(() => {
    if (portal) {
      doesWalletExist().then((exists) => {
        setHasWallet(exists)
        if (exists && address) {
          updateBalances()
        }
      })
    }
  }, [portal, address])

  const walletActions = [
    {
      title: 'Add Funds',
      subtitle: 'Deposit PYUSD to your wallet',
      icon: '💰',
      action: () => Alert.alert('Add Funds', 'Feature coming soon!'),
      color: '#10B981',
    },
    {
      title: 'Transaction History',
      subtitle: 'View your past transactions',
      icon: '📋',
      action: () => Alert.alert('History', 'Feature coming soon!'),
      color: '#8B5CF6',
    },
    {
      title: 'Backup Wallet',
      subtitle: 'Secure your wallet with backup',
      icon: '🔐',
      action: () => Alert.alert('Backup', 'Feature coming soon!'),
      color: '#F59E0B',
    },
  ]

  if (!hasWallet) {
    return (
      <ScrollView
        style={modernStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={modernStyles.headerSection}>
          <Text style={modernStyles.screenTitle}>Create Wallet</Text>
          <Text style={modernStyles.subtitle}>
            Get started with your PYUSD wallet
          </Text>
        </View>

        <View style={modernStyles.section}>
          <View style={modernStyles.gettingStartedCard}>
            <Text style={modernStyles.gettingStartedTitle}>
              🔐 Secure Wallet
            </Text>
            <Text style={modernStyles.gettingStartedText}>
              Create a secure wallet powered by Portal's MPC technology. Your
              wallet will be protected with advanced cryptography and can be
              recovered with your password.
            </Text>
            <PortalButton
              title={isLoading ? 'Creating...' : 'Create Wallet'}
              onPress={createWallet}
              style={modernStyles.primaryWalletButton}
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView
      style={modernStyles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={modernStyles.headerSection}>
        <Text style={modernStyles.screenTitle}>Wallet</Text>
        <Text style={modernStyles.subtitle}>Manage your digital assets</Text>
      </View>

      {/* Balance Cards */}
      <View style={modernStyles.section}>
        <View style={modernStyles.balanceCardLarge}>
          <View style={modernStyles.balanceHeader}>
            <Text style={modernStyles.balanceLabel}>PYUSD Balance</Text>
            <View style={modernStyles.pyusdBadge}>
              <Text style={modernStyles.pyusdBadgeText}>PYUSD</Text>
            </View>
          </View>
          <Text style={modernStyles.balanceAmountLarge}>
            ${pyusdBalance.toFixed(2)}
          </Text>
          <Text style={modernStyles.balanceSubtext}>
            Available for subscriptions
          </Text>
        </View>
      </View>

      {/* Wallet Address */}
      {address && (
        <View style={modernStyles.section}>
          <Text style={modernStyles.sectionTitle}>Wallet Address</Text>
          <View style={modernStyles.gettingStartedCard}>
            <Text style={modernStyles.settingsValue}>
              {`${address.slice(0, 12)}...${address.slice(-12)}`}
            </Text>
          </View>
        </View>
      )}

      {/* Send PYUSD */}
      <View style={modernStyles.section}>
        <Text style={modernStyles.sectionTitle}>Send PYUSD</Text>
        <View style={modernStyles.gettingStartedCard}>
          <View style={styles.formGroup}>
            <Text style={modernStyles.settingsTitle}>Recipient Address</Text>
            <TextInput
              style={[styles.textInput, { marginTop: 8 }]}
              placeholder="Enter Solana address"
              value={sendAddress}
              onChangeText={setSendAddress}
            />
          </View>

          <View style={[styles.formGroup, { marginTop: 16 }]}>
            <Text style={modernStyles.settingsTitle}>Amount (PYUSD)</Text>
            <TextInput
              style={[styles.textInput, { marginTop: 8 }]}
              placeholder="0.00"
              value={sendAmount}
              onChangeText={setSendAmount}
              keyboardType="numeric"
            />
          </View>

          <PortalButton
            title={isLoading ? 'Sending...' : 'Send PYUSD'}
            onPress={sendPyusd}
            style={[modernStyles.primaryWalletButton, { marginTop: 20 }]}
            disabled={isLoading}
          />
        </View>
      </View>

      {/* Transaction Hash */}
      {transactionHash && (
        <View style={modernStyles.section}>
          <Text style={modernStyles.sectionTitle}>Last Transaction</Text>
          <View style={modernStyles.gettingStartedCard}>
            <Text style={modernStyles.settingsTitle}>Transaction Hash</Text>
            <Text style={modernStyles.settingsValue}>
              {`${transactionHash.slice(0, 12)}...${transactionHash.slice(
                -12,
              )}`}
            </Text>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={modernStyles.section}>
        <Text style={modernStyles.sectionTitle}>Quick Actions</Text>
        <View style={modernStyles.quickActionsContainer}>
          {walletActions.map((action, index) => (
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

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

export default Wallet
