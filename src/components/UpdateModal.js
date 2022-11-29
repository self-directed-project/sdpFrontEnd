import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const Div = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  padding: 25px;
  padding-top: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
`;

// eslint-disable-next-line react/prop-types
function UpdateModal({ setUpdateModalOpen }) {
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setUpdateModalOpen(false);
    }
  };
  return (
    <MainDiv onClick={onCloseModal}>
      <Div>Heelo</Div>
    </MainDiv>
  );
}
export default UpdateModal;
