import { Field } from 'formik'
import classNames from 'classnames'
import styles from './Field.module.scss'
import FieldError from './FieldError'

const CustomField = ({ label, name, className, ...props }) => (
  <div>
    <Field
      placeholder={label}
      name={name}
      {...props}
      className={classNames(styles['custominput'], className)}
    />
    <FieldError name={name} />
    <br />
  </div>
)

export default CustomField
