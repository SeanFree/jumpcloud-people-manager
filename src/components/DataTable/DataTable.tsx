import React, {
  ReactNode,
  ReactElement,
  SyntheticEvent,
  useState,
  useEffect,
} from 'react'
import { Flexbox, Typography } from 'components'
import { useClassNames } from 'hooks'
import { ValueOf } from 'helpers/ValueOf'
import './DataTable.scss'
import Icon from 'components/Icon/Icon'

enum ColumnSortDirection {
  ascending = 1,
  descending = -1,
}

export interface DataTableColumn<DataSourceType> {
  icon?: ReactElement | ((value: ValueOf<DataSourceType>) => ReactElement)
  key: keyof DataSourceType
  label: string
  sortable?: boolean
}

interface DataTableProps<DataSourceType> {
  className?: string
  columns: DataTableColumn<DataSourceType>[]
  data: DataSourceType[]
  id: string
  onRowClick?: (item: DataSourceType) => any
  onRowKeyDown?: (
    event: SyntheticEvent<HTMLTableRowElement, KeyboardEvent>,
    item: DataSourceType
  ) => any
  renderCell?: (
    value: ValueOf<DataSourceType>,
    column: DataTableColumn<DataSourceType>
  ) => ReactNode
}

const sortItems = (
  items: any[],
  key: string,
  direction: ColumnSortDirection
) => [...items.sort((a, b) => a[key].localeCompare(b[key]) * direction)]

const DataTable = <DataSourceType,>({
  className,
  columns,
  data,
  id,
  onRowClick,
  onRowKeyDown,
  renderCell,
}: DataTableProps<DataSourceType>): ReactElement => {
  const [sortBy, setSortBy] = useState(columns[0].key)
  const [sortDirection, setSortDirection] = useState(
    ColumnSortDirection.ascending
  )
  const [sortedData, setSortedData] = useState<any[]>(
    sortItems(data, sortBy as string, sortDirection)
  )
  const classNames = useClassNames({
    [className as string]: !!className,
    'data-table': true,
  })
  const rowClassNames = useClassNames({
    'data-table__row': true,
    'data-table__row--clickable': !!onRowClick,
    'data-table__row--tabbable': !!onRowKeyDown,
  })

  const handleSort = (key: keyof DataSourceType) => {
    setSortDirection(
      key !== sortBy
        ? ColumnSortDirection.ascending
        : sortDirection === ColumnSortDirection.ascending
        ? ColumnSortDirection.descending
        : ColumnSortDirection.ascending
    )
    setSortBy(key)
  }

  useEffect(() => {
    setSortedData(sortItems(data, sortBy as string, sortDirection))
  }, [data, sortBy, sortDirection])

  return (
    <table className={classNames} id={id}>
      <tbody className="data-table__body">
        <tr className="data-table__header">
          {columns.map(({ key, label }, i) => (
            <th
              className="data-table__heading"
              key={i}
              onClick={() => handleSort(key)}
            >
              <Flexbox as="span" gap="xs">
                <Typography
                  as="span"
                  content={label}
                  size="s"
                  weight="semibold"
                />
                {sortBy === key && (
                  <Icon
                    name={
                      sortDirection === ColumnSortDirection.ascending
                        ? 'expand_less'
                        : 'expand_more'
                    }
                  />
                )}
              </Flexbox>
            </th>
          ))}
        </tr>
        {sortedData.map((rowItem, i) => (
          <tr
            className={rowClassNames}
            key={i}
            onClick={() => onRowClick && onRowClick(rowItem)}
            tabIndex={onRowKeyDown ? 0 : -1}
            onKeyDown={(e) => onRowKeyDown && onRowKeyDown(e, rowItem)}
          >
            {columns.map((column, j) => (
              <td className="data-table__cell" key={j}>
                <Flexbox gap="s" nowrap>
                  {column.icon &&
                    (React.isValidElement(column.icon)
                      ? column.icon
                      : column.icon(rowItem[column.key]))}
                  <Typography
                    as="span"
                    content={
                      <>
                        {renderCell
                          ? renderCell(rowItem[column.key], column)
                          : rowItem[column.key]}
                      </>
                    }
                  />
                </Flexbox>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
