import React, { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Divider, Flexbox, Heading, TextInput } from 'components'
import Address from 'models/Address.interface'
import SystemUserPut from 'models/SystemUserPut.interface'
import SystemUserPost from 'models/SystemUserPost.interface'
import zipcodeRegex from 'helpers/zipcodeRegex'

interface AddressFieldsProps {
  disabled?: boolean
}

const EMPTY_ADDRESS: Partial<Address> = {
  _id: '',
  country: '',
  extendedAddress: '',
  id: '',
  locality: '',
  poBox: '',
  postalCode: '',
  region: '',
  streetAddress: '',
  type: '',
}

const AddressFields: FC<AddressFieldsProps> = ({
  disabled = false,
}: AddressFieldsProps) => {
  const { control, register, unregister } = useFormContext()
  const { fields } = useFieldArray({
    control,
    name: 'addresses',
  })

  return (
    <>
      {(fields.length ? (fields as Address[]) : [EMPTY_ADDRESS]).map(
        (field: any, i) => (
          <Flexbox as="span" direction="column" fullWidth gap="l" key={i}>
            <Flexbox
              as="header"
              className="system-user-form__header"
              fullWidth
              justify="between"
            >
              <Heading
                as="h3"
                className="system-user-form__heading system-user-form__heading--address"
                content={`${field.type || ''} Address`.trim()}
              />
            </Flexbox>
            <Flexbox columns={2} align="start" as="fieldset" fullWidth gap="m">
              <TextInput<SystemUserPut | SystemUserPost>
                customRegister={register}
                customUnregister={unregister}
                disabled={disabled}
                id={`steetaddress-${i}`}
                label="Street Address"
                name={`steetaddress-${i}`}
              />
              <TextInput<SystemUserPut | SystemUserPost>
                customRegister={register}
                customUnregister={unregister}
                disabled={disabled}
                id={`pobox-${i}`}
                label="PO Box"
                name={`poBox-${i}`}
              />
            </Flexbox>
            <Flexbox align="start" as="fieldset" columns={3} fullWidth gap="m">
              <TextInput
                customRegister={register}
                customUnregister={unregister}
                id={`locality-${i}`}
                label="City"
                name={`locality-${i}`}
              />
              <TextInput<SystemUserPut | SystemUserPost>
                customRegister={register}
                customUnregister={unregister}
                disabled={disabled}
                id={`state-${i}`}
                label="State"
                name={`region-${i}`}
              />
              <TextInput<SystemUserPut | SystemUserPost>
                customRegister={register}
                customUnregister={unregister}
                disabled={disabled}
                id={`zipcode-${i}`}
                name={`postalCode-${i}`}
                label="Zip Code"
                pattern={zipcodeRegex}
              />
            </Flexbox>
            <Divider />
          </Flexbox>
        )
      )}
    </>
  )
}

export default AddressFields
