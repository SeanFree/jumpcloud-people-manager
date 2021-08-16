const omitEmpty = <T>(obj: T): Partial<T> =>
  Object.entries(obj).reduce((_obj: Partial<T>, [key, value]) => {
    if (value) _obj[key as keyof T] = value

    return _obj
  }, {})

export default omitEmpty
