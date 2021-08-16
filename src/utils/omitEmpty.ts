import { ValueOf } from 'helpers/ValueOf'

const omitEmpty = <T>(obj: T): Partial<T> =>
  Object.entries(obj).reduce((_obj: Partial<T>, [key, value]) => {
    if (value) _obj[key as keyof T] = value
    if (value instanceof Object) {
      _obj[key as keyof T] = Array.isArray(value)
        ? (value.map(omitEmpty) as any)
        : (omitEmpty(value) as ValueOf<T>)
    }

    return _obj
  }, {})

export default omitEmpty
