// screens/Subscriptions.tsx
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native'
import { styles } from '../style/stylesheet'
// import { transferToken } from '../lib/portal'
import Chain from '../lib/chains'
import PortalButton from '../components/shared/button'

interface SubscriptionsProps {
  address: string
  chain: Chain
  pyusdBalance: number
  setPyusdBalance: Dispatch<SetStateAction<number>>
}

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

interface PaymentMethod {
  id: string
  name: string
  description: string
  benefits: string[]
}

// ServicesTab Component
const ServicesTab: React.FC<{
  services: Service[]
  handleSubscribe: (service: Service) => void
}> = ({ services, handleSubscribe }) => {
  const renderService = ({ item }: { item: Service }) => (
    <View style={subscriptionStyles.serviceCard}>
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

      <View style={subscriptionStyles.pricingSection}>
        <View style={subscriptionStyles.priceContainer}>
          <Text style={subscriptionStyles.price}>${item.price}</Text>
          <Text style={subscriptionStyles.period}>/{item.period}</Text>
        </View>
        <Text style={subscriptionStyles.savings}>{item.savings}</Text>
      </View>

      <View style={subscriptionStyles.featuresSection}>
        <Text style={subscriptionStyles.featuresTitle}>Features included:</Text>
        {item.features.map((feature, idx) => (
          <View key={idx} style={subscriptionStyles.featureItem}>
            <Text style={subscriptionStyles.checkmark}>✓</Text>
            <Text style={subscriptionStyles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

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

// SubscriptionsTab Component
const SubscriptionsTab: React.FC<{
  subscriptions: Service[]
  setActiveTab: (tab: 'services' | 'subscriptions') => void
}> = ({ subscriptions, setActiveTab }) => {
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

// PaymentModal Component
const PaymentModal: React.FC<{
  visible: boolean
  selectedService: Service | null
  paymentMethod: string
  setPaymentMethod: (method: string) => void
  paymentMethods: PaymentMethod[]
  onClose: () => void
  onConfirm: () => void
}> = ({
  visible,
  selectedService,
  paymentMethod,
  setPaymentMethod,
  paymentMethods,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={subscriptionStyles.modalOverlay}>
        <View style={subscriptionStyles.modalContent}>
          <View style={subscriptionStyles.modalHeader}>
            <Text style={subscriptionStyles.modalTitle}>Complete Payment</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={subscriptionStyles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          {selectedService && (
            <>
              <View style={subscriptionStyles.selectedServiceCard}>
                <Text style={subscriptionStyles.selectedServiceIcon}>
                  {selectedService.icon}
                </Text>
                <View style={subscriptionStyles.selectedServiceInfo}>
                  <Text style={subscriptionStyles.selectedServiceName}>
                    {selectedService.name}
                  </Text>
                  <Text style={subscriptionStyles.selectedServicePrice}>
                    ${selectedService.price}/{selectedService.period}
                  </Text>
                </View>
              </View>

              <Text style={subscriptionStyles.paymentMethodTitle}>
                Payment Method
              </Text>

              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    subscriptionStyles.paymentMethodCard,
                    paymentMethod === method.id &&
                      subscriptionStyles.selectedPaymentMethod,
                  ]}
                  onPress={() => setPaymentMethod(method.id)}
                >
                  <View style={subscriptionStyles.paymentMethodInfo}>
                    <Text style={subscriptionStyles.paymentMethodName}>
                      {method.name}
                    </Text>
                    <Text style={subscriptionStyles.paymentMethodDescription}>
                      {method.description}
                    </Text>
                  </View>
                  {paymentMethod === method.id && (
                    <Text style={subscriptionStyles.selectedIndicator}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}

              {paymentMethod === 'pyusd' && (
                <View style={subscriptionStyles.benefitsCard}>
                  <Text style={subscriptionStyles.benefitsTitle}>
                    🛡️ PYUSD Benefits Applied
                  </Text>
                  <Text style={subscriptionStyles.benefitsText}>
                    {selectedService.savings} • Instant settlement • Lower
                    network fees
                  </Text>
                </View>
              )}

              <View style={subscriptionStyles.totalSection}>
                <Text style={subscriptionStyles.totalLabel}>Total</Text>
                <Text style={subscriptionStyles.totalAmount}>
                  ${selectedService.price}
                </Text>
              </View>

              <PortalButton
                title="Confirm Subscription"
                onPress={onConfirm}
                style={subscriptionStyles.confirmButton}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

// Main Subscriptions Component
const Subscriptions: FC<SubscriptionsProps> = ({
  pyusdBalance,
  setPyusdBalance,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('pyusd')
  const [subscriptions, setSubscriptions] = useState<Service[]>([])
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'services' | 'subscriptions'>(
    'services',
  )

  const services: Service[] = [
    {
      id: 'prime-video',
      name: 'Prime Video',
      price: 8.99,
      period: 'monthly',
      description: 'Stream thousands of movies and TV shows',
      icon: '📺',
      features: [
        '4K Ultra HD',
        'Ad-free streaming',
        'Download content',
        'Multi-device access',
      ],
      savings: '15% off with PYUSD',
      color: '#3B82F6',
    },
    {
      id: 'ny-times',
      name: 'The New York Times',
      price: 4.25,
      period: 'weekly',
      description: 'Premium journalism and breaking news',
      icon: '📰',
      features: [
        'Unlimited articles',
        'The Athletic included',
        'Crosswords & games',
        'Audio articles',
      ],
      savings: '20% off with PYUSD',
      color: '#1F2937',
    },
    {
      id: 'spotify',
      name: 'Spotify Premium',
      price: 9.99,
      period: 'monthly',
      description: 'Music streaming without limits',
      icon: '🎵',
      features: [
        'Ad-free music',
        'Offline downloads',
        'High quality audio',
        'Spotify Connect',
      ],
      savings: '10% off with PYUSD',
      color: '#16A34A',
    },
    {
      id: 'starbucks',
      name: 'Starbucks Plus',
      price: 15.0,
      period: 'monthly',
      description: 'Daily coffee subscription',
      icon: '☕',
      features: [
        'One drink per day',
        'Skip the line ordering',
        'Bonus stars',
        'Exclusive offers',
      ],
      savings: '25% off with PYUSD',
      color: '#15803D',
    },
  ]

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pyusd',
      name: 'PYUSD Wallet',
      description: 'Pay with your stablecoin balance',
      benefits: ['Instant settlement', 'Lower fees', 'Exclusive discounts'],
    },
    {
      id: 'paypal',
      name: 'PayPal Account',
      description: 'Pay with your PayPal balance',
      benefits: ['Buyer protection', 'Easy refunds', 'Familiar interface'],
    },
  ]

  const handleSubscribe = (service: Service) => {
    if (pyusdBalance < service.price) {
      Alert.alert(
        'Insufficient Balance',
        'Please add funds to your PYUSD wallet to continue.',
      )
      return
    }
    setSelectedService(service)
    setShowPaymentModal(true)
  }

  const processPayment = async () => {
    if (!selectedService) {
      return
    }

    try {
      if (paymentMethod === 'pyusd') {
        // For demo purposes, we'll simulate the payment
        // In production, you'd use your transferToken function to pay the merchant

        // const txHash = await transferToken(
        //   chain,
        //   'MERCHANT_ADDRESS_HERE',
        //   'PYUSD',
        //   selectedService.price
        // )

        // Simulate successful payment
        setSubscriptions([...subscriptions, selectedService])
        setPyusdBalance((prev) => prev - selectedService.price)
        Alert.alert(
          'Success!',
          `Successfully subscribed to ${selectedService.name}`,
        )
      } else {
        // PayPal payment simulation
        Alert.alert('PayPal Payment', 'Redirecting to PayPal...')
      }

      setShowPaymentModal(false)
      setSelectedService(null)
    } catch (error) {
      Alert.alert('Payment Failed', 'Please try again.')
      console.error('Payment error:', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={subscriptionStyles.header}>
        <Text style={styles.screenTitle}>PayFlow Subscriptions</Text>
        <View style={subscriptionStyles.balanceCard}>
          <Text style={subscriptionStyles.balanceLabel}>PYUSD Balance</Text>
          <Text style={subscriptionStyles.balanceAmount}>
            ${pyusdBalance.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={subscriptionStyles.tabContainer}>
        <TouchableOpacity
          style={[
            subscriptionStyles.tab,
            activeTab === 'services' && subscriptionStyles.activeTab,
          ]}
          onPress={() => setActiveTab('services')}
        >
          <Text
            style={[
              subscriptionStyles.tabText,
              activeTab === 'services' && subscriptionStyles.activeTabText,
            ]}
          >
            Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            subscriptionStyles.tab,
            activeTab === 'subscriptions' && subscriptionStyles.activeTab,
          ]}
          onPress={() => setActiveTab('subscriptions')}
        >
          <Text
            style={[
              subscriptionStyles.tabText,
              activeTab === 'subscriptions' && subscriptionStyles.activeTabText,
            ]}
          >
            My Subscriptions ({subscriptions.length})
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'services' ? (
        <ServicesTab services={services} handleSubscribe={handleSubscribe} />
      ) : (
        <SubscriptionsTab
          subscriptions={subscriptions}
          setActiveTab={setActiveTab}
        />
      )}

      <PaymentModal
        visible={showPaymentModal}
        selectedService={selectedService}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        paymentMethods={paymentMethods}
        onClose={() => setShowPaymentModal(false)}
        onConfirm={processPayment}
      />
    </View>
  )
}

const subscriptionStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  benefitsBanner: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitItem: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    width: '48%',
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceIconText: {
    fontSize: 24,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  pricingSection: {
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  period: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  savings: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  featuresSection: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkmark: {
    color: '#059669',
    fontSize: 14,
    marginRight: 8,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: '#111827',
  },
  subscriptionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subscriptionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  subscriptionPrice: {
    fontSize: 14,
    color: '#6B7280',
  },
  subscriptionStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  nextBilling: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  browseButton: {
    backgroundColor: '#3B82F6',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    fontSize: 24,
    color: '#6B7280',
  },
  selectedServiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  selectedServiceIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  selectedServiceInfo: {
    flex: 1,
  },
  selectedServiceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  selectedServicePrice: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  paymentMethodDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  selectedIndicator: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  benefitsCard: {
    backgroundColor: '#ECFDF5',
    borderColor: '#D1FAE5',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  benefitsText: {
    fontSize: 12,
    color: '#065F46',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  confirmButton: {
    backgroundColor: '#3B82F6',
  },
})

export default Subscriptions
