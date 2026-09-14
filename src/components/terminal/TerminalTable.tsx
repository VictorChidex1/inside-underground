import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TerminalTableColumn<T> {
  key: string
  header: string
  align?: 'left' | 'center' | 'right'
  className?: string
  render?: (item: T, index: number) => React.ReactNode
}

export interface TerminalTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TerminalTableColumn<T>[]
  data: T[]
  keyExtractor: (item: T, index: number) => string | number
  emptyMessage?: string
  responsiveStack?: boolean
}

export function TerminalTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No records found in database.',
  responsiveStack = true,
  className,
  ...props
}: TerminalTableProps<T>) {
  if (data.length === 0) {
    return (
      <div
        className={cn(
          'rounded border border-[#1E1E1E] bg-[#0A0A0A] p-6 text-center font-mono text-xs text-[#737373]',
          className
        )}
        {...props}
      >
        <span className="text-[#00FF66] mr-1.5">[INFO]</span>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded border border-[#1E1E1E] bg-[#080808] font-mono text-xs shadow-sm',
        className
      )}
      {...props}
    >
      {/* Desktop & Tablet Table View */}
      <div className={cn('overflow-x-auto', responsiveStack && 'hidden md:block')}>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#1E1E1E] bg-[#0D0D0D] text-[11px] font-semibold text-[#808080]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-3.5 py-2.5 uppercase tracking-wider',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141414]">
            {data.map((item, index) => (
              <tr
                key={keyExtractor(item, index)}
                className="transition-colors hover:bg-[#0F0F0F]"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-3.5 py-2.5 text-[#EDEDED]',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                      col.className
                    )}
                  >
                    {col.render
                      ? col.render(item, index)
                      : (item as Record<string, unknown>)[col.key] != null
                      ? String((item as Record<string, unknown>)[col.key])
                      : '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      {responsiveStack && (
        <div className="divide-y divide-[#1E1E1E] md:hidden">
          {data.map((item, index) => (
            <div
              key={keyExtractor(item, index)}
              className="p-3 space-y-2 hover:bg-[#0D0D0D] transition-colors"
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="flex items-center justify-between text-xs gap-2"
                >
                  <span className="text-[11px] uppercase tracking-wider text-[#737373]">
                    {col.header}
                  </span>
                  <div
                    className={cn(
                      'text-[#EDEDED] font-medium text-right',
                      col.className
                    )}
                  >
                    {col.render
                      ? col.render(item, index)
                      : (item as Record<string, unknown>)[col.key] != null
                      ? String((item as Record<string, unknown>)[col.key])
                      : '—'}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
