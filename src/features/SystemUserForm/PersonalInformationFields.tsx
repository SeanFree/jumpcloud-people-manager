import { FC } from 'react';
import { Button, Flexbox, Heading, TextInput } from "components";
import SystemUserPut from "models/SystemUserPut.interface";
import SystemUser from 'models/SystemUser.interface';

interface PersonalInformationFieldsProps {
  disabled: boolean;
  isEditForm?: boolean;
  onDelete?: Function;
  userUnderEdit?: SystemUserPut | null;
}

const PersonalInformationFields: FC<PersonalInformationFieldsProps> = ({
  disabled,
  isEditForm,
  onDelete,
  userUnderEdit
}) => {
  return (
    <>
      <header className="system-user-form__header">
        <Heading
          as="h3"
          className="system-user-form__heading"
          content="Personal Information"
        />
      </header>
      <Flexbox
        align="start"
        as="fieldset"
        fullWidth
        gap="m"
      >
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
      <Flexbox
        align="start"
        as="fieldset"
        fullWidth
        gap="m"
      >
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
  );
};

export default PersonalInformationFields;
