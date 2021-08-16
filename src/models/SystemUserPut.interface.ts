import Address from './Address.interface'
import SystemUser from './SystemUser.interface'

export default interface SystemUserPut extends Partial<SystemUser> {
  address?: Address
  password?: string
}
