// style/modernStyles.ts
import { StyleSheet } from 'react-native'

export const modernStyles = StyleSheet.create({
  // Base Layout
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Header Sections
  headerSection: {
    padding: 20,
    paddingTop: 10,
  },

  welcomeContainer: {
    marginBottom: 24,
  },

  welcomeText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },

  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },

  // Balance Cards
  balanceCardLarge: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  balanceLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },

  pyusdBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  pyusdBadgeText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },

  balanceAmountLarge: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },

  balanceSubtext: {
    fontSize: 14,
    color: '#64748B',
  },

  // Sections
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },

  sectionDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 20,
  },

  // Feature Cards
  featuresGrid: {
    gap: 12,
  },

  featureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
  },

  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },

  featureDescription: {
    fontSize: 14,
    color: '#64748B',
  },

  // Quick Actions
  quickActionsContainer: {
    gap: 16,
  },

  quickActionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  quickActionIconText: {
    fontSize: 24,
  },

  quickActionContent: {
    flex: 1,
  },

  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },

  quickActionSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },

  quickActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
  },

  // Getting Started Card
  gettingStartedCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  gettingStartedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },

  gettingStartedText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 20,
  },

  walletActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  primaryWalletButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
  },

  secondaryWalletButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },

  // Network Selection
  networkContainer: {
    gap: 12,
  },

  networkCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  selectedNetworkCard: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },

  networkCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  networkIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  networkIconText: {
    fontSize: 20,
  },

  networkInfo: {
    flex: 1,
  },

  networkName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },

  selectedNetworkName: {
    color: '#3B82F6',
  },

  networkDescription: {
    fontSize: 14,
    color: '#64748B',
  },

  selectedNetworkDescription: {
    color: '#1D4ED8',
  },

  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedIndicatorText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Settings Items
  settingsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  settingsIcon: {
    fontSize: 20,
    marginRight: 16,
  },

  settingsInfo: {
    flex: 1,
  },

  settingsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },

  settingsValue: {
    fontSize: 14,
    color: '#64748B',
  },

  settingsArrow: {
    fontSize: 18,
    color: '#CBD5E1',
    marginLeft: 12,
  },

  // Actions
  actionsContainer: {
    gap: 12,
  },

  destructiveButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },

  // Footer
  footerSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Navigation
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },

  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },

  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },

  activeTabLabel: {
    color: '#3B82F6',
  },

  inactiveTabLabel: {
    color: '#64748B',
  },
})
