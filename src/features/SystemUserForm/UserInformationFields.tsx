import { FC } from 'react'
import { Button, Flexbox, Heading, TextInput } from 'components'
import SystemUser from 'models/SystemUser.interface'
import SystemUserPut from 'models/SystemUserPut.interface'

interface UserInformationFieldsProps {
  disabled: boolean
  isEditForm: boolean
  onDelete: Function
  userUnderEdit?: SystemUserPut | null
}

const UserInformationFields: FC<UserInformationFieldsProps> = ({
  disabled,
  isEditForm,
  onDelete,
  userUnderEdit,
}) => {
  return (
    <>
      <Flexbox
        as="header"
        className="system-user-form__header"
        fullWidth
        justify="between"
      >
        <Heading
          as="h3"
          className="system-user-form__heading"
          content="User Information"
        />
        {isEditForm && (
          <Button
            ariaLabel={`Delete ${
              userUnderEdit?.displayname || userUnderEdit?.username
            }`}
            className="system-user-form__btn-delete-user"
            content="Delete user"
            iconName="person_remove"
            onClick={() => onDelete()}
            size="s"
            variant="danger"
          />
        )}
      </Flexbox>
      <Flexbox align="start" as="fieldset" fullWidth gap="m">
        <TextInput<SystemUser>
          autoFocus
          disabled={disabled}
          id="firstname"
          name="firstname"
          label="First Name"
        />
        <TextInput<SystemUser>
          disabled={disabled}
          id="firstname"
          name="middlename"
          label="Middle Name"
        />
        <TextInput<SystemUser>
          disabled={disabled}
          id="lastname"
          name="lastname"
          label="Last Name"
        />
      </Flexbox>
      <Flexbox align="start" as="fieldset" fullWidth gap="m">
        <TextInput<SystemUser>
          disabled={disabled}
          id="username"
          name="username"
          label="Username"
          required
        />
        <TextInput<SystemUser>
          disabled={disabled}
          id="email"
          name="email"
          label="Email Address"
          required
        />
        <TextInput<SystemUser>
          disabled={disabled}
          id="displayname"
          name="displayname"
          label="Display Name"
        />
      </Flexbox>
    </>
  )
}

export default UserInformationFields
