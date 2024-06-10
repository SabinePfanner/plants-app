import styled, { css } from "styled-components";

const OptionList = styled.ul`
  display: none;
  left: 0;
  width: 100%;
  list-style: none;
  padding-left: 0px;
  border: 0.5px solid black;
  border-radius: 0.5rem;
  padding: 5px 0px;
  margin: 0;
  background-color: #fff;
`;

const MultiSelectContainer = styled.div`
  margin: 0 1px;
  position: relative;
  &:hover ${OptionList} {
    display: block;
    width: 100%;
    position: absolute;
  }
`;

const SelectPlaceholder = styled.div`
  border: 0.5px solid black;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  color: #423e3e;
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  background-color: #fff;
  ${(p) =>
    p.$isSelected === true &&
    css`
      background-color: var(--color-green-300);
      font-weight: bold;
      border: 1px solid black;
    `};
`;

const Options = styled.li`
  display: flex;
  align-items: center;
  padding: 0.8px 2.5px;
  cursor: pointer;
  font-size: 0.7rem;
  &:hover,
  :focus,
  :focus:hover {
    background-color: var(--color-green-300);
  }
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
  return (
    <MultiSelectContainer tabIndex="0">
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
      <OptionList>
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <>
              <Options
                onClick={() => toggleOption(category, option)}
                tabIndex="0"
                onKeyDown={(event) =>
                  event.key === "Enter" || event.key === " "
                    ? toggleOption(category, option)
                    : null
                }
              >
                <Checkbox type="checkbox" checked={isSelected}></Checkbox>
                <span>{option}</span>
              </Options>
            </>
          );
        })}
      </OptionList>
    </MultiSelectContainer>
  );
}
