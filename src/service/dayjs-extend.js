// outsource dependencies
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import isToday from 'dayjs/plugin/isToday'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

// NOTE extend dayjs by required plugins globally
dayjs.extend(utc)
dayjs.extend(isToday)
dayjs.extend(duration)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(isSameOrAfter)
