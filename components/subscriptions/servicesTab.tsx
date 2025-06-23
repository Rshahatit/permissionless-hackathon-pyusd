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

interface ServicesTabProps {
  services: Service[]
  handleSubscribe: (service: Service) => void
}

export const ServicesTab: React.FC<ServicesTabProps> = ({
  services,
  handleSubscribe,
}) => {
  const renderService = ({ item }: { item: Service }) => (
    <View style={subscriptionStyles.serviceCard}>
      {/* Service Header */}
      <View style={subscriptionStyles.serviceHeader}>
        <View style={subscriptionStyles.serviceIcon}>
          <Text style={subscriptionStyles.serviceIconText}>{item.icon}</Text>
        </View>
        <View style={subscriptionStyles.serviceInfo}>
          <Text style={subscriptionStyles.serviceName}>{item.name}</Text>
          <Text style={subscriptionStyles.serviceDescription}>
            {item.description}
          </Text>
        </View>
      </View>

      {/* Pricing Section */}
      <View style={subscriptionStyles.pricingSection}>
        <View style={subscriptionStyles.priceContainer}>
          <Text style={subscriptionStyles.price}>${item.price}</Text>
          <Text style={subscriptionStyles.period}>/{item.period}</Text>
        </View>
        <Text style={subscriptionStyles.savings}>{item.savings}</Text>
      </View>

      {/* Features Section */}
      <View style={subscriptionStyles.featuresSection}>
        <Text style={subscriptionStyles.featuresTitle}>Features included:</Text>
        {item.features.map((feature, idx) => (
          <View key={idx} style={subscriptionStyles.featureItem}>
            <Text style={subscriptionStyles.checkmark}>✓</Text>
            <Text style={subscriptionStyles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Subscribe Button */}
      <PortalButton
        title="Subscribe Now"
        onPress={() => handleSubscribe(item)}
        style={subscriptionStyles.subscribeButton}
      />
    </View>
  )

  return (
    <ScrollView
      style={subscriptionStyles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Benefits Banner */}
      <View style={subscriptionStyles.benefitsBanner}>
        <Text style={subscriptionStyles.benefitsTitle}>
          Why pay with PYUSD?
        </Text>
        <View style={subscriptionStyles.benefitsGrid}>
          <Text style={subscriptionStyles.benefitItem}>
            ⚡ Instant settlement
          </Text>
          <Text style={subscriptionStyles.benefitItem}>🛡️ Lower fees</Text>
          <Text style={subscriptionStyles.benefitItem}>
            🌍 Global acceptance
          </Text>
        </View>
      </View>

      {/* Services List */}
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  )
}
