export function validateCheckout(values) {
  const errors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!/^\+?\d{7,15}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number (digits only, 7–15 characters).'
  }

  if (!values.address.trim()) {
    errors.address = 'Delivery address is required.'
  }

  return errors
}
