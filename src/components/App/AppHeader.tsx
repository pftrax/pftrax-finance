import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon } from '@rimauswap-libs/uikit'
import { Link } from 'react-router-dom'
import Settings from './Settings'
import Transactions from './Transactions'
import SubNav from '../Menu/SubNav'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  showSubmenu?: boolean
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  button{
    width:22px;
    height:22px;
    svg{
      width:18px;
    }
  }
  .heading{
    h2{
      font-size:16px;
      margin-bottom:0px;
    }
    div{
      font-size:12px;
    }
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 24px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
    .heading{
      h2{
        font-size:20px;
        margin-bottom:8px;
      }
      div{
        font-size:14px;
      }
    }
    button{
      width:32px;
      height:32px;
      svg{
        width:24px;
      }
    }
  }
  
`

const AppHeader: React.FC<Props> = ({ title, showSubmenu = false, subtitle, helper, backTo, noConfig = false }) => {
  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex className="heading" flexDirection="column">
          {
            showSubmenu?
              <SubNav />
            :<>
              <Heading as="h2" mb="8px">
                {title}
              </Heading>
              <Flex alignItems="center">
                {helper && <QuestionHelper text={helper} mr="4px" />}
                <Text color="textSubtle" fontSize="14px">
                  {subtitle}
                </Text>
              </Flex>
            </>
          }
          
         
        </Flex>
      </Flex>
        {!noConfig && (
          <Flex
            flexDirection={['column', 'row']}
            justifyContent="space-between"
          >
            <Settings />
            <Transactions />
          </Flex>
        )}
    </AppHeaderContainer>
  )
}

export default AppHeader
