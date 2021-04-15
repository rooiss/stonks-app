import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(
  {
    root: {},
  },
  { name: 'TickerList' },
)
interface TickerListProps {}
export const TickerList = ({}: TickerListProps) => {
  const classes = useStyles()
  return <div className={classes.root}></div>
}
