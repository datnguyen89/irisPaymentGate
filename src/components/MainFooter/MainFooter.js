import React from 'react'
import { MainFooterWrapper } from './MainFooterStyled'
import { CommonH1 } from '../CommonStyled/CommonStyled'
import moment from 'moment'
import { Link, useLocation } from 'react-router-dom'
import config from '../../config'

const MainFooter = props => {
  // region props, hook, state =================
  const location = useLocation()
  const { state } = location
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============

  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <MainFooterWrapper>
      <CommonH1>
        © {moment().format('YYYY')} {config.copyright}.
        Allright reserved by <Link to={'#'} state={state}>
        {config.reserved}
      </Link>
      </CommonH1>
    </MainFooterWrapper>
  )
}

MainFooter.propTypes = {}

export default MainFooter