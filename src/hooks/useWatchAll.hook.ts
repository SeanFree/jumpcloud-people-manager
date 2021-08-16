import { FieldPathValue, Path, useWatch } from 'react-hook-form'

const useWatchAll = <T>(fieldNames: Path<T>[]): FieldPathValue<T, Path<T>>[] =>
  fieldNames.map(
    (name: Path<T>): FieldPathValue<T, Path<T>> => useWatch<T>({ name })
  )

export default useWatchAll
