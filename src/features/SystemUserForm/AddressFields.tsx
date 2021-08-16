import React, { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Divider, Flexbox, Heading, TextInput } from 'components'
import SystemUserPut from 'models/SystemUserPut.interface'
import SystemUserPost from 'models/SystemUserPost.interface'
import zipcodeRegex from 'helpers/zipcodeRegex'

interface AddressFieldsProps {
  disabled?: boolean
}

const AddressFields: FC<AddressFieldsProps> = ({
  disabled = false,
}: AddressFieldsProps) => {
  const { control, register } = useFormContext()
  const { fields } = useFieldArray({
    control,
    name: 'addresses',
  })

  return (
    <>
      {(fields.length ? fields : [{}]).map((field: any, i) => (
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
              customFieldProps={register(`addresses.${i}.streetAddress`)}
              disabled={disabled}
              id="streetaddress"
              name="streetAddress"
              label="Street Address"
            />
            <TextInput<SystemUserPut | SystemUserPost>
              customFieldProps={register(`addresses.${i}.poBox`)}
              disabled={disabled}
              id="pobox"
              name="poBox"
              label="PO Box"
            />
          </Flexbox>
          <Flexbox align="start" as="fieldset" columns={3} fullWidth gap="m">
            <TextInput
              customFieldProps={register(`addresses.${i}.locality`)}
              id={`locality-${i}`}
              label="City"
              name="locality"
            />
            <TextInput<SystemUserPut | SystemUserPost>
              customFieldProps={register(`addresses.${i}.region`)}
              disabled={disabled}
              id="state"
              name="region"
              label="State"
            />
            <TextInput<SystemUserPut | SystemUserPost>
              customFieldProps={register(`addresses.${i}.postalCode`)}
              disabled={disabled}
              id="zipcode"
              name="postalCode"
              label="Zip Code"
              pattern={zipcodeRegex}
            />
          </Flexbox>
          <Divider />
        </Flexbox>
      ))}
    </>
  )
}

export default AddressFields
