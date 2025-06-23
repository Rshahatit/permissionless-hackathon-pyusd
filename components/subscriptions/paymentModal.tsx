// PaymentModal Component
import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
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

interface PaymentMethod {
  id: string
  name: string
  description: string
  benefits: string[]
}

interface PaymentModalProps {
  visible: boolean
  selectedService: Service | null
  paymentMethod: string
  setPaymentMethod: (method: string) => void
  paymentMethods: PaymentMethod[]
  onClose: () => void
  onConfirm: () => void
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
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
          {/* Modal Header */}
          <View style={subscriptionStyles.modalHeader}>
            <Text style={subscriptionStyles.modalTitle}>Complete Payment</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={subscriptionStyles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          {selectedService && (
            <>
              {/* Selected Service Card */}
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

              {/* Payment Method Selection */}
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

              {/* PYUSD Benefits Card */}
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

              {/* Total Section */}
              <View style={subscriptionStyles.totalSection}>
                <Text style={subscriptionStyles.totalLabel}>Total</Text>
                <Text style={subscriptionStyles.totalAmount}>
                  ${selectedService.price}
                </Text>
              </View>

              {/* Confirm Button */}
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
