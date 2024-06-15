import { useState, useEffect } from "react";
import styled from "styled-components";
import SvgIcon from "@/components/StyledElements/SvgIcon";
import {
  StyledTooltipContainer,
  StyledTooltipText,
} from "@/components/StyledElements/HoverTooltip";

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
const intervals = [...cartesian(["early ", "mid ", "late "], months)].map(
  (key) => key.join("")
);

const StyledPeriodContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
`;

const StyledPeriodGrid = styled.div`
  display: grid;
  grid-template-columns: 40px repeat(36, 1fr);
  grid-column-gap: 0px;
  row-gap: 0.2rem;
  justify-content: center;
  align-content: center;
  align-items: center;
  min-width: 600px;
  margin: 1rem 0 0.5rem 0;
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
  /* position: relative; */
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.$highlighted ? "#79af6e" : "#E0E0E0")};
  justify-content: center;
  color: ${(props) => (props.$highlighted ? "#79af6e" : "lightgrey")};
  border-radius: ${(props) =>
    props.$isPeriodStart
      ? "0.5rem 0 0 0.5rem"
      : props.$isPeriodEnd
      ? "0 0.5rem 0.5rem 0"
      : "none"};
  border-right: 0.05rem solid white;
  font-size: 0rem;
  cursor: default;
  min-height: 25px;

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
  /* align-items: center; */
  grid-column: span 1;
  min-height: 25px;
`;

const StyledResetButton = styled.button`
  display: flex;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  min-height: 25px;
`;

const StyledNote = styled.p`
  margin: 0 1.5rem;
  font-style: italic;
`;

const StyledH4 = styled.h4`
  margin: 0 1.5rem;
`;

export default function TaskPeriod({
  task,
  taskName,
  edit = false,
  onSeedPeriod,
}) {
  // Task periods (seed etc.)
  const [period, setPeriod] = useState(task); // { seed: { start: null, end: null } }

  // Index of interval cell currently hovered
  const [hoverIndex, setHoverIndex] = useState();

  // Set period start/end when interval is clicked:
  // - on first click on any interval, start is set
  // - further click start resets if no end selected yet
  // - when start is selected and other interval clicked, it is set as period end
  function handleSetPeriod(interval) {
    if (!period[taskName].start) {
      setPeriod({ [taskName]: { start: interval, end: null } });
    } else if (
      period[taskName].start === interval &&
      !(period[taskName].start && period[taskName].end)
    ) {
      setPeriod({ [taskName]: { start: null, end: null } });
    } else if (!period[taskName].end) {
      setPeriod({
        [taskName]: { start: period[taskName].start, end: interval },
      });
    }
  }

  function handleResetPeriod() {
    setPeriod({ [taskName]: { start: null, end: null } });
  }

  useEffect(() => {
    if (edit) onSeedPeriod(period);
  }, [period, edit, onSeedPeriod]);

  const periodIndices = {
    start: period[taskName].start
      ? intervals.findIndex((interval) => interval === period[taskName].start)
      : null,
    end: period[taskName].end
      ? intervals.findIndex((interval) => interval === period[taskName].end)
      : null,
  };

  if (edit || period[taskName].end) {
    return (
      <>
        {!edit && (
          <StyledH4>
            {taskName[0].toUpperCase() + taskName.slice(1)} period
          </StyledH4>
        )}
        <StyledPeriodContainer
          onMouseLeave={() =>
            !(period[taskName].start && period[taskName].end) &&
            (setHoverIndex(-1) || handleResetPeriod())
          }
        >
          <StyledPeriodGrid>
            <StyledDummySection />
            {months.map((month, index) => (
              <>
                <StyledMonth
                  key={month}
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
                type="button"
                onClick={handleResetPeriod}
                onKeyDown={(event) =>
                  event.key === "Enter" || event.key === " "
                    ? handleResetPeriod() && setHoverIndex(-1)
                    : null
                }
              >
                <StyledSvgIcon variant="reload" color="grey" size="25" />
              </StyledResetButton>
            ) : (
              <StyledDummySection>
                <StyledSvgIcon variant={taskName} color="grey" size="25" />
              </StyledDummySection>
            )}
            {intervals.map((interval, index) => {
              return (
                <StyledInterval
                  key={interval}
                  onClick={() => {
                    edit && handleSetPeriod(interval);
                  }}
                  onKeyDown={(event) => {
                    const extraIndex = event.shiftKey ? -1 : 1;
                    event.key === "Enter" || event.key === " "
                      ? handleSetPeriod(interval)
                      : event.key === "Tab" &&
                        !(period[taskName].start && period[taskName].end)
                      ? setHoverIndex(
                          intervals.findIndex(
                            (intervalIntern) => interval === intervalIntern
                          ) + extraIndex // needs extra index with tab-navigation
                        )
                      : null;
                  }}
                  onMouseOver={() => {
                    !(period[taskName].start && period[taskName].end) &&
                      setHoverIndex(
                        intervals.findIndex(
                          (intervalIntern) => interval === intervalIntern
                        )
                      );
                  }}
                  $highlighted={
                    // highlight intervals if period start is set & interval >= start & hovered/within set interval
                    (index === hoverIndex &&
                      !period[taskName].start &&
                      hoverIndex !== -1) ||
                    interval === period[taskName].start ||
                    (period[taskName].start &&
                      index > periodIndices.start &&
                      (index <= hoverIndex || index <= periodIndices.end))
                  }
                  $isPeriodStart={interval === period[taskName].start}
                  $isPeriodEnd={
                    period[taskName].start && interval === period[taskName].end
                  }
                  $precedesPeriodStart={index === periodIndices.start - 1}
                  $followsPeriodEnd={
                    period[taskName].start &&
                    period[taskName].end &&
                    index === periodIndices.end + 1 &&
                    (!edit || index === hoverIndex + 1)
                  }
                  $active={!(period[taskName].start && period[taskName].end)}
                  tabIndex="0"
                >
                  &nbsp;
                  {!edit &&
                    index >= periodIndices.start &&
                    index <= periodIndices.end && (
                      <StyledTooltipContainer>
                        <StyledTooltipText>
                          {taskName[0].toUpperCase() + taskName.slice(1)}{" "}
                          period: {period[taskName].start}-
                          {period[taskName].end}
                        </StyledTooltipText>
                      </StyledTooltipContainer>
                    )}
                </StyledInterval>
              );
            })}
          </StyledPeriodGrid>
        </StyledPeriodContainer>
      </>
    );
  } else {
    return <StyledNote>No seed period defined yet.</StyledNote>;
  }
}
