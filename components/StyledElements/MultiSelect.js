import styled, { css } from "styled-components";
import { useState } from "react";

const OptionList = styled.ul`
  display: none;
  list-style: none;
  border: 0.5px solid black;
  border-radius: 0.5rem;
  padding: 5px 0;
  margin: 0;
  background-color: #fff;
  ${(props) =>
    props.$open &&
    css`
      display: block;
      width: 100%;
    `};
`;

const MultiSelectContainer = styled.div`
  margin-bottom: 10px;
  position: relative;
  &:hover ${OptionList} {
    display: block;
    width: 100%;
  }
`;

const SelectPlaceholder = styled.div`
  border: 0.5px solid black;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  color: #423e3e;
  padding: 5px 6px 5px 5px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: #fff;
  ${(p) =>
    p.$isSelected &&
    css`
      background-color: var(--color-green-300);
      font-weight: bold;
      border: 1px solid black;
    `};
`;

const Options = styled.li`
  display: flex;
  align-items: center;
  padding: 0.8px 2px;
  cursor: pointer;
  font-size: 0.7rem;
  &:hover,
  :focus,
  :focus:hover {
    background-color: var(--color-green-300);
  }
  ${(p) =>
    p.$isActive &&
    css`
      background-color: var(--color-green-300);
    `};
`;

const Checkbox = styled.input`
  accent-color: var(--color-green);
`;

export default function MultiSelectDropdown({
  options,
  selected,
  toggleOption,
  category,
  label,
}) {
  const [open, setOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(-1);

  return (
    <MultiSelectContainer
      tabIndex="0"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          setOpen(!open);
          setActiveOption(-1);
        }
        if (event.key === "Tab") {
          activeOption === -1 && setActiveOption(0);
        }
      }}
    >
      {selected.length > 0 ? (
        <SelectPlaceholder $isSelected={true}>
          <label>
            {label} {selected.length} ↓
          </label>
        </SelectPlaceholder>
      ) : (
        <SelectPlaceholder $isSelected={false}>
          <label>{label} ↓</label>
        </SelectPlaceholder>
      )}
      <OptionList $open={open}>
        {options.map((option, index) => {
          const isSelected = selected.includes(option);
          return (
            <>
              <Options
                $isActive={index === activeOption}
                onClick={() => toggleOption(category, option)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    toggleOption(category, option);
                  }
                  if (event.key === "Tab") {
                    if (
                      (index == options.length - 1 && !event.shiftKey) ||
                      (index == 0 && event.shiftKey)
                    ) {
                      setOpen(false);
                      setActiveOption(-1);
                    } else {
                      if (!event.shiftKey) {
                        setActiveOption(index + 1);
                      } else {
                        setActiveOption(index - 1);
                      }
                    }
                  }
                }}
                tabIndex="0"
              >
                <Checkbox
                  type="checkbox"
                  checked={isSelected}
                  tabIndex="-1"
                ></Checkbox>
                <span>{option}</span>
              </Options>
            </>
          );
        })}
      </OptionList>
    </MultiSelectContainer>
  );
}
