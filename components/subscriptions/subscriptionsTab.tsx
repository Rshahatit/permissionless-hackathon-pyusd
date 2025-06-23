// SubscriptionsTab Component
import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import PortalButton from '../shared/button'
import { subscriptionStyles } from './style'

interface Service {
  id: string
  name: string
  price: number
  period: string
  description: string
  icon: string
  features: string[]
  savings: string
  color: string
}

interface SubscriptionsTabProps {
  subscriptions: Service[]
  setActiveTab: (tab: 'services' | 'subscriptions') => void
}

export const SubscriptionsTab: React.FC<SubscriptionsTabProps> = ({
  subscriptions,
  setActiveTab,
}) => {
  const renderSubscription = ({ item }: { item: Service }) => (
    <View style={subscriptionStyles.subscriptionCard}>
      <View style={subscriptionStyles.subscriptionHeader}>
        <Text style={subscriptionStyles.subscriptionIcon}>{item.icon}</Text>
        <View style={subscriptionStyles.subscriptionInfo}>
          <Text style={subscriptionStyles.subscriptionName}>{item.name}</Text>
          <Text style={subscriptionStyles.subscriptionPrice}>
            ${item.price}/{item.period}
          </Text>
        </View>
        <View style={subscriptionStyles.subscriptionStatus}>
          <Text style={subscriptionStyles.statusText}>Active</Text>
          <Text style={subscriptionStyles.nextBilling}>
            Next:{' '}
            {new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000,
            ).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  )

  return (
    <ScrollView
      style={subscriptionStyles.content}
      showsVerticalScrollIndicator={false}
    >
      {subscriptions.length === 0 ? (
        <View style={subscriptionStyles.emptyState}>
          <Text style={subscriptionStyles.emptyStateIcon}>🔔</Text>
          <Text style={subscriptionStyles.emptyStateTitle}>
            No active subscriptions
          </Text>
          <Text style={subscriptionStyles.emptyStateText}>
            Start subscribing to services to see them here
          </Text>
          <PortalButton
            title="Browse Services"
            onPress={() => setActiveTab('services')}
            style={subscriptionStyles.browseButton}
          />
        </View>
      ) : (
        <FlatList
          data={subscriptions}
          renderItem={renderSubscription}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScrollView>
  )
}
