import SystemUser from './SystemUser.interface'

export default interface SystemUserPost extends Partial<SystemUser> {
  username: string
  email: string
}
