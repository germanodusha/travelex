import Field from './Field'
import PhoneInput from './PhoneInput'

const isPhone = (value) => value.length > 10

const PhoneField = ({ errorMessage, ...props }) => (
  <Field
    type="phone"
    validate={(value) => !isPhone(value) && errorMessage}
    component={PhoneInput}
    {...props}
  />
)

export default PhoneField
