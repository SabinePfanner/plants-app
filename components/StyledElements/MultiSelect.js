import styled from "styled-components";

export default function MultiSelectDropdown({
  options,
  selected,
  toggleOption,
}) {
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
    width: 125px;

    &:hover ${OptionList} {
      display: block;
    }
  `;

  const SelectPlaceholder = styled.div`
    border: 0.5px solid black;
    border-radius: 0.5rem;
    font-size: 0.7rem;
    color: #423e3e;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    background-color: #fff;
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

  return (
    <MultiSelectContainer tabIndex="0">
      <SelectPlaceholder>
        <label>{selected.length} Filter Selected ↓</label>
      </SelectPlaceholder>
      <OptionList>
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <>
              <Options
                onClick={() => toggleOption({ title: option })}
                tabIndex="0"
                onKeyDown={(event) =>
                  event.key === "Enter" || event.key === " "
                    ? toggleOption({ title: option })
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
