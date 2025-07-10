import { useContext } from 'react'
import { PharmacyContext } from '../../contexts/PharmacyContext'

export const usePharmacy = () => {
  const context = useContext(PharmacyContext)

  if (!context) {
    throw new Error('usePharmacy debe usarse dentro de PharmacyProvider')
  }

  return context
}
