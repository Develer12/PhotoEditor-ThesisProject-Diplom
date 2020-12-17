import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useBetween } from "use-between";
import styled, { css } from 'styled-components';
import { MenuContext } from '../context/navState';
import { Ajax } from './../../../../hooks/Ajax';
import { EditedImgStorage } from './../../../../hooks/EditedImgStorage';
import arrow from '../arrow.svg';

const Menu = styled.nav`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 293;
  display: block;
  width: 400px;
  max-width: 100%;
  margin-top: 0px;
  padding-top: 100px;
  padding-right: 0px;
  align-items: stretch;
  background-color: #001698;
  transform: translateX(-100%);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${(props) =>
    props.open &&
    css`transform: translateX(0);`
  }
`;

export const MenuLink = styled.button`
  position: relative;
  display: block;
  text-align: left;
  max-width: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 16%;
  background-image: url(${ arrow });
  background-position: 88% 50%;
  background-size: 36px;
  background-repeat: no-repeat;
  transition: background-position 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
  text-decoration: none;
  color: #fff;
  font-size: 32px;
  line-height: 120%;
  font-weight: 500;
  :hover {
    background-position: 90% 50%;
  }
`;

export const SideMenu = ({ children }) => {
  const filterRef = useRef(null);
  const { isMenuOpen } = useContext(MenuContext);
  const { loading, request, error, clearError } = Ajax();
  const { updateEdited } = useBetween(EditedImgStorage);

  const uploadFile = async (filter) => {
    try {
      filter = filter;
      console.log(filter)
      let body = { filter };

      const data// = await request('/api/editor/filter', 'PUT', 'multipart/form-data', body);
      if(data) {
        //updateEdited(data, props.indx, settings);
      }
    } 
    catch (e) {
      console.log(e.message)
    }
  }

  return(
    <Menu open={ isMenuOpen }>
      <MenuLink onClick={ uploadFile.bind(this) }>Главная</MenuLink>
      <MenuLink href="/articles">Статьи</MenuLink>
      <MenuLink href="/about">О сайте</MenuLink>
      <MenuLink href="/contact">Контакт</MenuLink>
    </Menu>
  );
};

SideMenu.propTypes = {
  children: PropTypes.node,
};