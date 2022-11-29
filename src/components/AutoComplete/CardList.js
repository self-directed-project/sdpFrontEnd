import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

function Card({ card: { text, id }, onDelete }) {
  return (
    <CardDiv>
      <span>{text} </span>
      <DeleteBtn type="button" onClick={() => onDelete(id)}>
        <ClearRoundedIcon
          sx={{ color: '#979797', width: '7.2px', height: '7.2px' }}
        />
      </DeleteBtn>
    </CardDiv>
  );
}

function CardList({ cardList, onDelete }) {
  return (
    <div>
      {cardList.map((card) => (
        <Card card={card} key={card.id} onDelete={onDelete} />
      ))}
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.objectOf().isRequired,
  onDelete: PropTypes.func.isRequired
};
CardList.propTypes = {
  cardList: PropTypes.arrayOf().isRequired,
  onDelete: PropTypes.func.isRequired
};

const CardDiv = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 2px 16.52px 2px 16.52px;
  margin-bottom: 2px;
  background-color: #f9fdff;
  border-radius: 8.26087px;
  font-weight: 400;
  font-size: 11.5652px;
`;

const DeleteBtn = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
`;
export default CardList;
