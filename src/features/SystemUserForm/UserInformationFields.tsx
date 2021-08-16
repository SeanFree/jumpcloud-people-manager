import React, { FC } from 'react'
import { Button, Divider, Flexbox, Heading, TextInput } from 'components'
import SystemUserPut from 'models/SystemUserPut.interface'
import emailRegex from 'helpers/emailRegex'
import SystemUserPost from 'models/SystemUserPost.interface'

interface UserInformationFieldsProps {
  disabled: boolean
  isEditForm: boolean
  onDelete: () => any
  userUnderEdit?: SystemUserPut | null
}

const UserInformationFields: FC<UserInformationFieldsProps> = ({
  disabled,
  isEditForm,
  onDelete,
  userUnderEdit,
}: UserInformationFieldsProps) => {
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
        <TextInput<SystemUserPut | SystemUserPost>
          autoFocus
          disabled={disabled}
          id="firstname"
          name="firstname"
          label="First Name"
        />
        <TextInput<SystemUserPut | SystemUserPost>
          disabled={disabled}
          id="firstname"
          name="middlename"
          label="Middle Name"
        />
        <TextInput<SystemUserPut | SystemUserPost>
          disabled={disabled}
          id="lastname"
          name="lastname"
          label="Last Name"
        />
      </Flexbox>
      <Flexbox align="start" as="fieldset" fullWidth gap="m">
        <TextInput<SystemUserPut | SystemUserPost>
          disabled={disabled}
          id="username"
          name="username"
          label="Username"
          minLength={3}
          required
        />
        <TextInput<SystemUserPut | SystemUserPost>
          disabled={disabled}
          id="email"
          name="email"
          label="Email Address"
          pattern={emailRegex}
          required
        />
        <TextInput<SystemUserPut | SystemUserPost>
          disabled={disabled}
          id="displayname"
          name="displayname"
          label="Display Name"
        />
      </Flexbox>
      <Divider />
    </>
  )
}

export default UserInformationFields
