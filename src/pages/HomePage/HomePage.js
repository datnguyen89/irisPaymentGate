import React from 'react'
import { HomePageWrapper } from './HomePageStyled'
import FormHeader from '../../components/FormHeader'
import { FormContent, FormContentLeft, FormContentRight } from '../../components/CommonStyled/CommonStyled'
import FormFooter from '../../components/FormFooter'
import BillingInfoBox from '../../components/BillingInfoBox'
import { Link, useNavigate } from 'react-router-dom'
import { PAGES } from '../../constant'
import { useQuery } from '../../hooks/useQuery'

const HomePage = props => {
  // region props, hook, state =================
  const query = useQuery()
  const navigate = useNavigate()
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
    <HomePageWrapper>
      <FormHeader />
      <FormContent>
        <FormContentLeft>
          Home <br />
          <Link to={PAGES.TEST} state={{ secret: 'abcd' }}>Go test</Link>

          <p onClick={() => {
            navigate(PAGES.TEST, { state: { secret: 'abcd' }, replace: true })
          }}>
            Go test navigate
          </p>
        </FormContentLeft>
        <FormContentRight>
          <BillingInfoBox showCountDown={true} />
        </FormContentRight>
      </FormContent>
      <FormFooter />
    </HomePageWrapper>
  )
}

HomePage.propTypes = {}

export default HomePage
