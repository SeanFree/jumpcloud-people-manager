import React, { FC } from 'react'
import { Button, Flexbox, Heading, TextInput } from 'components'
import SystemUserPut from 'models/SystemUserPut.interface'
import SystemUserPost from 'models/SystemUserPost.interface'
import zipcodeRegex from 'helpers/zipcodeRegex'

interface PersonalInformationFieldsProps {
  disabled: boolean
  userUnderEdit: SystemUserPut | null
}

const PersonalInformationFields: FC<PersonalInformationFieldsProps> = ({
  disabled,
  userUnderEdit,
}: PersonalInformationFieldsProps) => {
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
          content="Personal Information"
        />
      </Flexbox>
      <Flexbox columns={2} align="start" as="fieldset" fullWidth gap="m">
        <TextInput<SystemUserPut | SystemUserPost>
          className="system-user-form__street"
          defaultValue={userUnderEdit?.address?.streetAddress}
          disabled={disabled}
          id="streetaddress"
          name="streetAddress"
          label="Street Address"
        />
        <TextInput<SystemUserPut | SystemUserPost>
          className="system-user-form__po-box"
          defaultValue={userUnderEdit?.address?.poBox}
          disabled={disabled}
          id="pobox"
          name="poBox"
          label="PO Box"
        />
      </Flexbox>
      <Flexbox align="start" as="fieldset" columns={3} fullWidth gap="m">
        <TextInput<SystemUserPut | SystemUserPost>
          defaultValue={userUnderEdit?.address?.locality}
          disabled={disabled}
          id="city"
          name="locality"
          label="City"
        />
        <TextInput<SystemUserPut | SystemUserPost>
          defaultValue={userUnderEdit?.address?.region}
          disabled={disabled}
          id="state"
          name="region"
          label="State"
        />
        <TextInput<SystemUserPut | SystemUserPost>
          defaultValue={userUnderEdit?.address?.postalCode}
          disabled={disabled}
          id="zipcode"
          name="postalCode"
          label="Zip Code"
          pattern={zipcodeRegex}
        />
      </Flexbox>
    </>
  )
}

export default PersonalInformationFields
