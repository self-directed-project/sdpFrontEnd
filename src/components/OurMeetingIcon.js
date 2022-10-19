import styled from 'styled-components';

const Icon = styled.div`
  display: flex;
  margin-right: 7px;
`;
const Circle = styled.div`
  width: 10px;
  height: 10px;
  background: ${(props) => props.color};
  border-radius: 50%;
`;
function OurMeetingIcon() {
  return (
    <Icon>
      <span>
        <Circle color="#17C2E0" />
        <Circle color="#08EB9A" />
      </span>
      <span>
        <Circle color="#F96144" />
        <Circle color="#5F44EA" />
      </span>
    </Icon>
  );
}

export default OurMeetingIcon;
