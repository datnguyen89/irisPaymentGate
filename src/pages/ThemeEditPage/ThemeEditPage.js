import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CheckThemeComponent,
  CheckThemeLink,
  CheckThemeNotice,
  TestButton,
  ThemeEditPageWrapper,
} from './ThemeEditPageStyled'
import { SketchPicker } from 'react-color'
import { Button, Col, ConfigProvider, Divider, Input, InputNumber, Row } from 'antd'
import { BorderBoxWrapper, CommonH4, CommonP, FlexDiv } from '../../components/CommonStyled/CommonStyled'

const APP_THEME = require('../../theme')

const ThemeEditPage = props => {
  // region props, hook, state =================
  const [editingTheme, setEditingTheme] = useState(APP_THEME)
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
    <ThemeEditPageWrapper>
      <Row gutter={[16, 16]} justify={'center'}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <FlexDiv justifyContent={'center'}>
            <CheckThemeComponent
              primary={editingTheme.PRIMARY_COLOR}
              primaryHover={editingTheme.PRIMARY_COLOR_HOVER}
              primaryActive={editingTheme.PRIMARY_COLOR_ACTIVE}
            >
              Component
            </CheckThemeComponent>
            <TestButton primary={editingTheme.PRIMARY_COLOR} className={'test'} type={'primary'}>Primary button</TestButton>
          </FlexDiv>
        </Col>
        <Col span={4}>
          <h4>Primary Color</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.PRIMARY_COLOR}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, PRIMARY_COLOR: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <h4>Primary Color Hover</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.PRIMARY_COLOR_HOVER}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, PRIMARY_COLOR_HOVER: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <h4>Primary Color Active</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.PRIMARY_COLOR_ACTIVE}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, PRIMARY_COLOR_ACTIVE: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]} justify={'center'}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <FlexDiv justifyContent={'center'}>
            <CheckThemeNotice
              primary={editingTheme.INFO_COLOR}
            >
              Info
            </CheckThemeNotice>
            <CheckThemeNotice
              primary={editingTheme.SUCCESS_COLOR}
            >
              Success
            </CheckThemeNotice>
            <CheckThemeNotice
              primary={editingTheme.WARNING_COLOR}
            >
              Warning
            </CheckThemeNotice>
            <CheckThemeNotice
              primary={editingTheme.ERROR_COLOR}
            >
              Error
            </CheckThemeNotice>
          </FlexDiv>
        </Col>
        <Col span={4}>
          <h4>Info Color</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.INFO_COLOR}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, INFO_COLOR: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <h4>Success Color</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.SUCCESS_COLOR}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, SUCCESS_COLOR: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <h4>Warning Color</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.WARNING_COLOR}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, WARNING_COLOR: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <h4>Error Color</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.ERROR_COLOR}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, ERROR_COLOR: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]} justify={'center'}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <FlexDiv justifyContent={'center'}>
            <CheckThemeLink
              primary={editingTheme.LINK_COLOR}
              primaryHover={editingTheme.LINK_HOVER_COLOR}
              primaryActive={editingTheme.LINK_ACTIVE_COLOR}
            >
              https://google.com
            </CheckThemeLink>
          </FlexDiv>
        </Col>
        <Col span={4}>
          <h4>Link Color</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.LINK_COLOR}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, LINK_COLOR: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <h4>Link Hover Color</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.LINK_HOVER_COLOR}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, LINK_HOVER_COLOR: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <h4>Link Active Color</h4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.LINK_ACTIVE_COLOR}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, LINK_ACTIVE_COLOR: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]} justify={'center'}>
        <Col span={4}>
          <CommonH4
            fontSize={editingTheme.FONT_SIZE_BASE}
            textAlign={'center'}>
            Font size base
          </CommonH4>
          <Input
            style={{ width: '100%', marginTop: 8 }}
            value={editingTheme.FONT_SIZE_BASE}
            onChange={e => {
              let newTheme = { ...editingTheme, FONT_SIZE_BASE: e.currentTarget.value }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row justify={'center'} gutter={[16, 16]}>
        <Col span={4}>
          <BorderBoxWrapper
            borderRadius={editingTheme.BORDER_RADIUS_BASE}
            borderBase={editingTheme.BORDER_COLOR_BASE}
            borderActive={editingTheme.BORDER_COLOR_ACTIVE}
            backgroudActive={editingTheme.BACKGROUND_COLOR_ACTIVE}
            active={false}>
            Item normal
          </BorderBoxWrapper>
        </Col>

        <Col span={4}>
          <BorderBoxWrapper
            borderRadius={editingTheme.BORDER_RADIUS_BASE}
            borderBase={editingTheme.BORDER_COLOR_BASE}
            borderActive={editingTheme.BORDER_COLOR_ACTIVE}
            backgroudActive={editingTheme.BACKGROUND_COLOR_ACTIVE}
            active={true}>
            Item active
          </BorderBoxWrapper>
        </Col>
      </Row>
      <Row
        style={{ marginTop: 16 }}
        justify={'center'}
        gutter={[16, 16]}>
        <Col span={4}>
          <CommonH4>Border radius base</CommonH4>
          <Input
            style={{ width: '100%', marginTop: 8 }}
            value={editingTheme.BORDER_RADIUS_BASE}
            onChange={e => {
              let newTheme = { ...editingTheme, BORDER_RADIUS_BASE: e.currentTarget.value }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <CommonH4>Border color base</CommonH4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.BORDER_COLOR_BASE}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, BORDER_COLOR_BASE: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <CommonH4>Border color active</CommonH4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.BORDER_COLOR_ACTIVE}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, BORDER_COLOR_ACTIVE: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
        <Col span={4}>
          <CommonH4>Background color active</CommonH4>
          <SketchPicker
            // presetColors={['#1890ff', '#25b864', '#ff6f00']}
            width={250}
            color={editingTheme.BACKGROUND_COLOR_ACTIVE}
            onChange={({ hex }) => {
              let newTheme = { ...editingTheme, BACKGROUND_COLOR_ACTIVE: hex }
              setEditingTheme(newTheme)
            }}
          />
        </Col>
      </Row>
      <Divider />
      <CommonP
        style={{ wordBreak: 'break-word' }}
        whiteSpace={'pre-wrap'}>
        {JSON.stringify(editingTheme)}
      </CommonP>
    </ThemeEditPageWrapper>
  )
}

ThemeEditPage.propTypes = {}

export default ThemeEditPage