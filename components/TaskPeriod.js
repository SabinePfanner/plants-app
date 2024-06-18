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
  margin: 0rem 0 0.5rem 0;
`;

const StyledMonth = styled.div`
  display: flex;
  grid-column: span 3;
  justify-content: center;
  background-color: ${(props) =>
    props.$alternateBackground ? "#657383" : "#97A5B5"};
  color: white;
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
}) {
  // Task periods (seed etc.)
  const [period, setPeriod] = useState(task); // eg { seed: { start: null, end: null } }

  // Index of interval cell currently hovered
  const [hoverIndex, setHoverIndex] = useState();

  // Set period start/end when interval is clicked:
  // - on first click on any interval, start is set
  // - further click start resets if no end selected yet
  // - when start is selected and other interval clicked, it is set as period end
  function handleSetPeriod(interval) {
    if (!period.start) {
      setPeriod({ start: interval, end: null });
    } else if (period.start === interval && !(period.start && period.end)) {
      setPeriod({ start: null, end: null });
    } else if (!period.end) {
      setPeriod({ start: period.start, end: interval });
    }
  }

  function handleResetPeriod() {
    setPeriod({ start: null, end: null });
  }

  useEffect(() => {
    if (edit) onSetPeriod(taskName, period);
  }, [period, taskName, edit]);

  const periodIndices = {
    start: period.start
      ? intervals.findIndex((interval) => interval === period.start)
      : null,
    end: period.end
      ? intervals.findIndex((interval) => interval === period.end)
      : null,
  };

  if (edit || period.end) {
    return (
      <div key={taskName + "topFragment"}>
        <StyledPeriodGrid key={taskName + "Grid"}>
          {showHeader && <StyledDummySection key={taskName + "Dummy"} />}
          {showHeader &&
            months.map((month) => (
              <>
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
              </>
            ))}

          {edit ? (
            <StyledResetButton
              key={taskName + "ResetButton"}
              type="button"
              onClick={handleResetPeriod}
              onKeyDown={(event) =>
                event.key === "Enter" || event.key === " "
                  ? handleResetPeriod() && setHoverIndex(-1)
                  : null
              }
            >
              <StyledSvgIcon
                variant="reload"
                color="grey"
                size="25"
                key={taskName + "ResetSvg"}
              />
            </StyledResetButton>
          ) : (
            <StyledDummySection key={taskName + "Icon"}>
              <StyledSvgIcon
                variant={taskName}
                color="grey"
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
                  edit && handleSetPeriod(interval);
                }}
                onKeyDown={(event) => {
                  const extraIndex = event.shiftKey ? -1 : 1;
                  event.key === "Enter" || event.key === " "
                    ? handleSetPeriod(interval)
                    : event.key === "Tab" && !(period.start && period.end)
                    ? setHoverIndex(
                        intervals.findIndex(
                          (intervalIntern) => interval === intervalIntern
                        ) + extraIndex // needs extra index with tab-navigation
                      )
                    : null;
                }}
                onMouseOver={() => {
                  !(period.start && period.end) &&
                    setHoverIndex(
                      intervals.findIndex(
                        (intervalIntern) => interval === intervalIntern
                      )
                    );
                }}
                $highlighted={
                  // highlight intervals if period start is set & interval >= start & hovered/within set interval
                  (index === hoverIndex &&
                    !period.start &&
                    hoverIndex !== -1) ||
                  interval === period.start ||
                  (period.start &&
                    index > periodIndices.start &&
                    (index <= hoverIndex || index <= periodIndices.end))
                }
                $isPeriodStart={interval === period.start}
                $isPeriodEnd={period.start && interval === period.end}
                $precedesPeriodStart={index === periodIndices.start - 1}
                $followsPeriodEnd={
                  period.start &&
                  period.end &&
                  index === periodIndices.end + 1 &&
                  (!edit || index === hoverIndex + 1)
                }
                $active={!(period.start && period.end)}
                $color={color}
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
