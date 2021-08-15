import { FC, useEffect, useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Button, Divider, Flexbox, Heading, TextInput } from 'components'
import { AppContext } from 'features'
import DispatchStatus from 'models/DispatchStatus.enum'
import SystemUserPost from 'models/SystemUserPost.interface'
import SystemUserPut from 'models/SystemUserPut.interface'
import { useAppDispatch, useAppSelector } from 'store'
import { $createUser, $deleteUser, $updateUser } from 'store/users/users.thunks'
import { UserStatusKey } from 'store/users/users.slice'
import {
  selectCreateUserStatus,
  selectDeleteUserStatus,
  selectUpdateUserStatus,
  selectUserByEmail,
  selectUserByUsername,
} from 'store/users/users.selectors'

import './SystemUserForm.scss'
import UserInformationFields from './UserInformationFields'

interface SystemUserFormProps {
  handleSubmit: Function
}

const SystemUserForm: FC<SystemUserFormProps> = ({ handleSubmit }) => {
  const dispatch = useAppDispatch()
  const {
    setNotificationMessage,
    setSidePanelAction,
    userUnderEdit,
    setUserUnderEdit,
  } = useContext(AppContext)
  const {
    clearErrors,
    setError,
    setValue,
    formState: { dirtyFields, isValid },
  } = useFormContext()

  const email = useWatch({ name: 'email' })
  const username = useWatch({ name: 'username' })
  const firstname = useWatch({ name: 'firstname' })
  const lastname = useWatch({ name: 'lastname' })
  const displayname = useWatch({ name: 'displayname' })

  const emailMatch = useAppSelector(selectUserByEmail(email as string))
  const usernameMatch = useAppSelector(selectUserByUsername(username as string))
  const createUserStatus = useAppSelector(selectCreateUserStatus)
  const updateUserStatus = useAppSelector(selectUpdateUserStatus)
  const deleteUserStatus = useAppSelector(selectDeleteUserStatus)

  const isEditForm = !!userUnderEdit
  const disableInput =
    createUserStatus === DispatchStatus.PENDING ||
    updateUserStatus === DispatchStatus.PENDING ||
    deleteUserStatus === DispatchStatus.PENDING

  const submitDisabled =
    disableInput ||
    (isEditForm
      ? !isValid || !Object.keys(dirtyFields).length
      : !isValid || !!usernameMatch || !!emailMatch)

  const onSubmit = handleSubmit((values: SystemUserPut | SystemUserPost) => {
    isEditForm
      ? dispatch($updateUser(values as SystemUserPut))
      : dispatch($createUser(values as SystemUserPost))
  })

  const onDelete = () => dispatch($deleteUser(userUnderEdit?._id as string))

  const onCancel = () => setSidePanelAction('')

  useEffect(() => {
    if (
      createUserStatus === DispatchStatus.SUCCESS ||
      createUserStatus === DispatchStatus.FAILED
    ) {
      let content: string
      let type: string

      if (createUserStatus === DispatchStatus.SUCCESS) {
        content = `${displayname || username} successfully created.`
        type = 'success'
      } else {
        content = 'Unable to create user.'
        type = 'error'
      }

      setSidePanelAction('')
      setNotificationMessage({
        content,
        statusKey: UserStatusKey.createUser,
        type,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createUserStatus])

  useEffect(() => {
    if (updateUserStatus === DispatchStatus.SUCCESS) {
      setSidePanelAction('')
      setNotificationMessage({
        content: `${displayname || username} successfully updated.`,
        statusKey: UserStatusKey.updateUser,
        type: 'success',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserStatus])

  useEffect(() => {
    if (deleteUserStatus === DispatchStatus.SUCCESS) {
      setSidePanelAction('')
      setNotificationMessage({
        statusKey: UserStatusKey.deleteUser,
        content: `${displayname || username} successfully deleted.`,
        type: 'success',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteUserStatus])

  useEffect(() => {
    return () => setUserUnderEdit(undefined)
  }, [setUserUnderEdit])

  useEffect(() => {
    if (firstname && lastname) {
      setValue('displayname', `${firstname} ${lastname}`)
    }
  }, [firstname, isEditForm, lastname, setValue])

  useEffect(() => {
    if (emailMatch && !isEditForm) {
      setError('email', {
        type: 'manual',
        message: `User with email "${email}" already exists.`,
      })
    } else {
      clearErrors('email')
    }
  }, [email, emailMatch, isEditForm, clearErrors, setError])

  useEffect(() => {
    if (usernameMatch && !isEditForm) {
      setError('username', {
        type: 'manual',
        message: `User with username "${username}" already exists.`,
      })
    } else {
      clearErrors('username')
    }
  }, [isEditForm, clearErrors, setError, username, usernameMatch])

  return (
    <form
      className="system-user-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()

        onSubmit(e)
      }}
    >
      <Flexbox align="start" as="section" direction="column" gap="l">
        <UserInformationFields
          disabled={disableInput}
          onDelete={onDelete}
          userUnderEdit={userUnderEdit}
          isEditForm={isEditForm}
        />
        <Divider />
        <Flexbox fullWidth gap="m" justify="end">
          <Button
            ariaLabel="Cancel create new user"
            disabled={disableInput}
            content="Cancel"
            iconName="cancel"
            onClick={onCancel}
            type="reset"
            variant="secondary"
          />
          <Button
            ariaLabel="Save new user"
            disabled={submitDisabled}
            content="Save"
            iconName="check_circle_outline"
            onClick={onSubmit}
            type="submit"
            variant="primary"
          />
        </Flexbox>
      </Flexbox>
    </form>
  )
}

export default SystemUserForm
