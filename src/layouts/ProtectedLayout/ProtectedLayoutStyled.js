import styled from 'styled-components'

export const ProtectedLayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const ProtectedLayoutContent = styled.div`
  height: 90%;
  width: 60%;
  @media screen and (max-width: 1919px) {
    width: 70%;
  }
  @media screen and (max-width: 1440px) {
    width: 90%;
  }
  @media screen and (max-width: 1024px) {
    width: 98%;
  }
 
`