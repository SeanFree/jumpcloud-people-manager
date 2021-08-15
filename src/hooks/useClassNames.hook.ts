import { useMemo } from 'react'

interface ClassNameMap {
  [className: string]: boolean
}

const classNames = (map: ClassNameMap): string => {
  return Object.entries(map)
    .reduce(
      (classList, [className, enabled]) =>
        classList.concat(enabled ? ` ${className}` : ''),
      ''
    )
    .trim()
}

const useClassNames = (map: ClassNameMap): string => {
  return useMemo(() => classNames(map), [map])
}

export default useClassNames
