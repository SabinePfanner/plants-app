import styled, { css } from "styled-components";
import { useState } from "react";

export function CustomSelect({ label, values, onChange, defaultValue }) {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen(!isOpen);
  }
  function handleValueChange(value) {
    setCurrentValue(value);
  }
  function handleChange(value) {
    handleValueChange(value);
    // call method, if it exists
    if (onChange) onChange(value);
    // close, after all tasks are finished
    setIsOpen(false);
  }

  const SelectLabelButton = styled.button`
    padding: 0.5rem;
    font-size: 0.9rem;
    background-color: #fff;
    border-radius: 0.5rem;
    border: 2px solid black;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  `;
  const DropdownStyle = styled.div`
    margin: -0.5rem 0 0 0;
    padding: 0.5rem 0.8rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    background: #fafafa;
    ${(p) =>
      p.isVisible !== true &&
      css`
        max-height: 0;
        visibility: hidden;
      `}
  `;
  const DropdownItem = styled.div`
    margin: 0.3rem 0;
    font-size: 0.9rem;
    cursor: pointer;
    ${(props) =>
      props.active &&
      css`
        color: var(--color-green);
        font-weight: 500;
      `}
    &:hover, :focus, :focus:hover {
      background-color: var(--color-green);
      color: #fff;
      outline: none;
    }
  `;
  return (
    <>
      <SelectLabelButton onClick={handleToggle}>
        {currentValue !== "" ? currentValue : label}
      </SelectLabelButton>
      <DropdownStyle isVisible={isOpen}>
        {values.map((value, index) => (
          <DropdownItem
            onClick={() => handleChange(value)}
            active={value === currentValue}
            key={index}
          >
            {value}
          </DropdownItem>
        ))}
      </DropdownStyle>
    </>
  );
}
