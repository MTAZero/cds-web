import {useAppSelector, useAppDispatch} from "../../hooks";
import {incNumber, decNumber} from "../../redux/global/global.slice";

export const ContactPage = () => {
  const number = useAppSelector(state => state.global.number);
  const dispatch = useAppDispatch();

  const handleInc = () => {
    dispatch(incNumber());
  };

  const handleDec = () => {
    dispatch(decNumber());
  };

  return (
    <div>
      <h1>Contact page</h1>
      <button onClick={handleDec}>-</button>
      {number}
      <button onClick={handleInc}>+</button>
    </div>
  );
};
