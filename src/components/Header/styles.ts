import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.header`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 12px;
  margin-bottom: 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  div {
    display: flex;
    align-items: center;

    > div {
      font-family: 'Roboto Mono', monospace;
      font-weight: bold;
      font-size: 22px;

      background: #a751b7;

      border-radius: 5px;

      height: 30px;
      width: 30px;

      display: flex;
      justify-content: center;
      align-items: center;

      margin-right: 16px;

      user-select: none;
    }
  }

  span {
    font-size: 12px;
  }

  ul {
    list-style: none;

    display: flex;

    li {
      a {
        position: relative;
        text-decoration: none;
        color: #ffe;

        transition: all 0.2s ease-in-out;

        :hover {
          color: #a751b7;

          ::after {
            width: 100%;
          }
        }

        ::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;

          width: 0;
          transition: all 0.2s ease-in-out;

          border-bottom: 3px solid ${darken(0.3, '#a751b7')};
        }
      }

      & + li {
        margin-left: 14px;
      }
    }
  }
`;
