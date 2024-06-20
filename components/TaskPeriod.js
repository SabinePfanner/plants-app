import { useState, useEffect } from "react";
import styled from "styled-components";
import SvgIcon from "@/components/StyledElements/SvgIcon";


const months = [
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
];

// Function to get cartesian product of multiple arrays
// See https://stackoverflow.com/questions/4331092/finding-all-combinations-cartesian-product-of-javascript-array-values
function* cartesian(head, ...tail) {
  let remainder = tail.length ? cartesian(...tail) : [[]];
  for (let r of remainder) for (let h of head) yield [h, ...r];
}

// Get cartesian of months and within-months periods
const intervals = [...cartesian(["early", "mid", "late"], months)].map((key) =>
  key.join(" ")
);

const StyledPeriodGrid = styled.div`
  display: grid;
  grid-template-columns: 40px repeat(36, 1fr);
  grid-column-gap: 0px;
  row-gap: 0.2rem;
  min-width: 500px;
  margin: 0rem 0rem 0.5rem 0rem;
`;

const StyledMonth = styled.div`
  display: flex;
  grid-column: span 3;
  justify-content: center;
  background-color: ${(props) =>
    props.$alternateBackground
      ? "var(--primary-light)"
      : "var(--primary-dark)"};
  color: var(--primary-contrast);
  font-size: 1rem;
  border-right: 0.05rem solid white;
`;

const StyledInterval = styled.div`
  display: flex;
  height: 100%;
  background-color: ${(props) =>
    props.$highlighted ? props.$color : "#E0E0E0"};
  
  justify-content: center;
  color: ${(props) => (props.$highlighted ? "#79af6e" : "lightgrey")};
  border-right: 0.05rem solid white;
  font-size: 0rem;
  min-height: 25px;
  cursor: default;

  ${(props) => props.$isCurrentInterval && `filter: brightness(85%);`};

  border-radius: ${(props) =>
    props.$isPeriodStart
      ? "0.5rem 0 0 0.5rem"
      : props.$isPeriodEnd
      ? "0 0.5rem 0.5rem 0"
      : "none"};

  ${(props) =>
    props.$active &&
    `&:hover {
    cursor: pointer;
  }`}

  ${(props) =>
    props.$precedesPeriodStart &&
    `&:after {
    height: 100%;
    width: 100%;
    border-radius:0.5rem 0 0 0.5rem;
    background-color:#FFF;    
    display:inline-block;
    vertical-align: right;
    margin-left: 75%;
    content: '';
  }`}

  ${(props) =>
    props.$followsPeriodEnd &&
    `&:before {
    height: 100%;
    width: 100%;
    border-radius:0 0.4rem 0.4rem 0;
    background-color:#FFF;    
    display:inline-block;
    vertical-align: left;
    margin-right: 75%;
    content: '';
  }`}
`;

const StyledSvgIcon = styled(SvgIcon)`
  min-height: 25px;
`;

const StyledDummySection = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  min-height: 25px;
`;

const StyledResetButton = styled.button`
  display: flex;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  min-height: 25px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default function TaskPeriod({
  task,
  taskName,
  onSetPeriod,
  edit = false,
  showHeader = true,
  color,
  currentInterval,
}) {
  // Task periods (seed etc.)
  // const [localPeriod, setLocalPeriod] = useState(task); // eg { seed: { start: null, end: null } }
  const [localPeriodStart, setLocalPeriodStart] = useState(task.start);
  const [localPeriodEnd, setLocalPeriodEnd] = useState(task.end);

  // Index of interval cell currently hovered
  const [hoverIndex, setHoverIndex] = useState();

  // Set period start/end when interval is clicked:
  // - on first click on any interval, start is set
  // - further click start resets if no end selected yet
  // - when start is selected and other interval clicked, it is set as period end
  function handlesetLocalPeriod(interval) {
    if (!localPeriodStart) {
      setLocalPeriodStart(interval);
    } else if (
      localPeriodStart === interval &&
      !(localPeriodStart && localPeriodEnd)
    ) {
      setLocalPeriodStart(null);
      setLocalPeriodEnd(null);
    } else if (!localPeriodEnd && hoverIndex > periodIndices.start) {
      setLocalPeriodEnd(interval);
    }
  }

  function handleResetLocalPeriod() {
    setLocalPeriodStart(null);
    setLocalPeriodEnd(null);
  }

  useEffect(() => {
    if (edit) onSetPeriod({ start: localPeriodStart, end: localPeriodEnd });
  }, [localPeriodStart, localPeriodEnd, taskName, edit, onSetPeriod]);

  const periodIndices = {
    start: localPeriodStart
      ? intervals.findIndex((interval) => interval === localPeriodStart)
      : null,
    end: localPeriodEnd
      ? intervals.findIndex((interval) => interval === localPeriodEnd)
      : null,
  };

  if (edit || localPeriodEnd) {
    return (
      <div key={taskName + "topFragment"}>
        <StyledPeriodGrid key={taskName + "Grid"}>
          {showHeader && <StyledDummySection key={taskName + "Dummy"} />}
          {showHeader &&
            months.map((month) => (
              <StyledMonth
                key={taskName + month}
                $alternateBackground={[
                  "December",
                  "January",
                  "February",
                  "June",
                  "July",
                  "August",
                ].includes(month)}
              >
                {month.substring(0, 3)}
              </StyledMonth>
            ))}

          {edit ? (
            <StyledResetButton
              key={taskName + "ResetButton"}
              type="button"
              onClick={handleResetLocalPeriod}
              onKeyDown={(event) =>
                event.key === "Enter" || event.key === " "
                  ? handleResetLocalPeriod() && setHoverIndex(-1)
                  : null
              }
            >
              <StyledSvgIcon
                variant="reload"
                color="#1D0B07"
                size="25"
                key={taskName + "ResetSvg"}
              />
            </StyledResetButton>
          ) : (
            <StyledDummySection key={taskName + "Icon"}>
              <StyledSvgIcon
                variant={taskName}
                color="#1D0B07"
                size="25"
                key={taskName + "IconSvg"}
              />
            </StyledDummySection>
          )}
          {intervals.map((interval, index) => {
            return (
              <StyledInterval
                key={taskName + interval + index}
                onClick={() => {
                  edit && handlesetLocalPeriod(interval);
                }}
                onKeyDown={(event) => {
                  const extraIndex = event.shiftKey ? -1 : 1;
                  event.key === "Enter" || event.key === " "
                    ? handlesetLocalPeriod(interval)
                    : event.key === "Tab" &&
                      !(localPeriodStart && localPeriodEnd)
                    ? setHoverIndex(
                        intervals.findIndex(
                          (intervalIntern) => interval === intervalIntern
                        ) + extraIndex // needs extra index with tab-navigation
                      )
                    : null;
                }}
                onMouseOver={() => {
                  !(localPeriodStart && localPeriodEnd) &&
                    setHoverIndex(
                      intervals.findIndex(
                        (intervalIntern) => interval === intervalIntern
                      )
                    );
                }}
                $highlighted={
                  // highlight intervals if period start is set & interval >= start & hovered/within set interval
                  (index === hoverIndex &&
                    !localPeriodStart &&
                    hoverIndex !== -1) ||
                  interval === localPeriodStart ||
                  (localPeriodStart &&
                    index > periodIndices.start &&
                    (index <= hoverIndex || index <= periodIndices.end))
                }
                $isPeriodStart={interval === localPeriodStart}
                $isPeriodEnd={localPeriodStart && interval === localPeriodEnd}
                $precedesPeriodStart={index === periodIndices.start - 1}
                $followsPeriodEnd={
                  localPeriodStart &&
                  localPeriodEnd &&
                  index === periodIndices.end + 1 &&
                  (!edit || index === hoverIndex + 1)
                }
                $active={!(localPeriodStart && localPeriodEnd)}
                $color={color}
                $isCurrentInterval={!edit && interval === currentInterval}
                tabIndex="0"
              >
                &nbsp;
              </StyledInterval>
            );
          })}
        </StyledPeriodGrid>
      </div>
    );
  }
}
