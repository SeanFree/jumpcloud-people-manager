import SystemUser from './SystemUser.interface'

export default interface SystemUserPut extends Partial<SystemUser> {
  password?: string
}
