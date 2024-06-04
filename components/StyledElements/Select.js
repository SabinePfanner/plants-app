import styled, { css } from "styled-components";
import { useState } from "react";

export function CustomSelect({
  label,
  values,
  onChange,
  onValueChange,
  labelButtonText,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleChange(value) {
    onValueChange(value);
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
      p.$isVisible !== true &&
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
      props.$active &&
      css`
        color: var(--color-green);
        font-weight: 500;
      `}
    &:hover, :focus, :focus:hover {
      background-color: var(--color-green);
      color: #fff;
      outline: 0;
    }
  `;
  return (
    <>
      <SelectLabelButton onClick={handleToggle}>
        {labelButtonText ? labelButtonText : label}
      </SelectLabelButton>
      <DropdownStyle $isVisible={isOpen}>
        {values.map((value, index) => (
          <DropdownItem
            className="select"
            onClick={() => handleChange(value)}
            $active={value === labelButtonText}
            key={index}
            tabIndex="0"
            onKeyDown={(event) =>
              event.key === "Enter" || event.key === " "
                ? handleChange(value)
                : null
            }
          >
            {value}
          </DropdownItem>
        ))}
      </DropdownStyle>
    </>
  );
}
