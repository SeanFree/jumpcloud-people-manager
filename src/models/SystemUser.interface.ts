import Address from './Address.interface'
import Attribute from './Attribute.interface'
import MFA from './MFA.interface'
import PhoneNumber from './PhoneNumber.interface'
import SSHKey from './SSHKey.interface'
import UserState from './UserState.enum'

export default interface SystemUser {
  _id: string
  account_locked: boolean
  account_locked_date: Date
  activated: boolean
  addresses: Address[]
  allow_public_key: boolean
  attributes: Attribute[]
  badLoginAttempts: number
  company: string
  costCenter: string
  created: Date | string
  department: string
  description: string
  disableDeviceMaxLoginAttempts: boolean
  displayname: string
  email: string
  employeeIdentifier: boolean
  employeeType: string
  enable_managed_uid: boolean
  enable_user_portal_multifactor: boolean
  external_dn: string
  external_source_type: string
  externally_managed: boolean
  firstname: string
  id: string
  jobTitle: string
  lastname: string
  ldap_binding_user: boolean
  location: string
  mfa: MFA
  middlename: string
  password_expired: boolean
  password_never_expires: boolean
  passwordless_sudo: boolean
  phoneNumbers: PhoneNumber[]
  samba_service_user: boolean
  ssh_keys: SSHKey[]
  state: UserState
  sudo: boolean
  suspended: boolean
  systemUsername: string
  totp_enabled: boolean
  unix_guid: number
  unix_uid: number
  username: string
}
